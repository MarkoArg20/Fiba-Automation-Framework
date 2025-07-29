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


