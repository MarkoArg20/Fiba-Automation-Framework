pipeline {
    agent any
   

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
        withCredentials([usernamePassword(
            credentialsId: 'mega-credentials',
            usernameVariable: 'MEGA_USER',
            passwordVariable: 'MEGA_PASS'
        )]) {
            script {
                def megaLink = sh (
            script: """
                mega-logout || true
                mega-login "$MEGA_USER" "$MEGA_PASS"
                mega-put -c playwright-report /JenkinsReports/${env.JOB_NAME}/${env.BUILD_NUMBER}/
                mega-export "/JenkinsReports/${env.JOB_NAME}/${env.BUILD_NUMBER}/playwright-report"
            """,
                    returnStdout: true
                    ).trim()
                echo "MEGA report link is: ${megaLink}"
            // Get public link
            script {
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
    archiveArtifacts artifacts: 'playwright-report', fingerprint: true

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
}



