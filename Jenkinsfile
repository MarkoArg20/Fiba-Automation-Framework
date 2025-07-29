pipeline {
    agent any
    environment {
    MEGA_USER = credentials('markoargirovski07@gmail.com')  // Your Jenkins MEGA username credential ID
    MEGA_PASS = credentials('Baterija@11kabel@11')  // Your Jenkins MEGA password credential ID
  }

    tools {
        nodejs 'NodeJS_18'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/MarkoArg20/FIBA-.git'
            }
        }

        stage('Create .env file') {
            steps {
                withCredentials([string(credentialsId: 'dot-env-content', variable: 'DOT_ENV')]) {
                    script {
                        def fixedEnv = DOT_ENV.replaceAll('\\\\n', '\n')
                        writeFile file: '.env', text: fixedEnv
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright install'
                sh 'npx playwright test --trace on --reporter=html'
            }
        }
        stage('Upload Report to MEGA and Email Link') {
      steps {
        script {
          // Login to MEGA (make sure 'mega-cmd' is installed on agent)
          sh """
            mega-login ${env.MEGA_USER} ${env.MEGA_PASS}
          """

          // Upload the zipped report with unique path per build
          sh """
            mega-put playwright-report.zip /JenkinsReports/${env.JOB_NAME}/${env.BUILD_NUMBER}/
          """

          // Get the publicly shareable public link for the file
          def megaLink = sh(
            script: "mega-export /JenkinsReports/${env.JOB_NAME}/${env.BUILD_NUMBER}/playwright-report.zip",
            returnStdout: true
          ).trim()

          echo "MEGA report link is: ${megaLink}"

          // Email the link to your recipients without any attachment
          emailext(
            subject: "Playwright Test Report Uploaded to MEGA - Build #${env.BUILD_NUMBER}",
            body: """Hello,

Your Playwright test report for build #${env.BUILD_NUMBER} has completed successfully and has been uploaded to MEGA.

You can download and view the report here:
${megaLink}

Best regards,
Jenkins CI Server
""",
            to: 'markoargirovski07@gmail.com',
            from: 'jenkins@yourdomain.com',
            replyTo: 'jenkins@yourdomain.com'
          )
        }
      }
    }
  }

  post {
    always {
      script {
        // Optional: Log out from MEGA to clean session
        sh 'mega-logout || true'
      }
    }
  }
    }

 post {
  success {
    // Send screenshots email on success (if any)
    emailext(
      subject: "Playwright Test Passed",
      body: "Test passed. Here are some screenshots.",
      to: "markoargirovski07@gmail.com",
      from: "markoargirovski07@gmail.com",
      replyTo: "markoargirovski07@gmail.com",
      attachmentsPattern: "playwright-report/data/*.png"
    )
  }

  always {
    // Zip the report folder for retention as a Jenkins artifact (but not emailing it!)
    script {
      if (isUnix()) {
        sh 'zip -r playwright-report.zip playwright-report/index.html playwright-report/data'
      } else {
        bat 'powershell Compress-Archive -Path playwright-report\\index.html,playwright-report\\data -DestinationPath playwright-report.zip'
      }
    }

    // Archive the report so it's accessible in Jenkins build's Artifacts section
    archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true

    // (Optional) Archive the ZIP file for easy download
    archiveArtifacts artifacts: 'playwright-report.zip', fingerprint: true

    // Build and email the Jenkins artifact link to the HTML report
    script {
      def reportUrl = "${env.BUILD_URL}artifact/playwright-report/index.html"
        echo "MY_LOCATION_OF_BUILDURL is ${env.BUILD_URL}"
      emailext(
        subject: "Playwright Test Report - HTML",
        body: """The Playwright test report is available here:

${reportUrl}

You can view the test report directly by clicking the link above.
""",
        to: "markoargirovski07@gmail.com",
        from: "markoargirovski07@gmail.com",
        replyTo: "markoargirovski07@gmail.com"
        // No attachmentsPattern here!
      )
    }
  }
}



