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
      subject: "Playwright Test Passed - No Screenshots",
      body: "Test passed. No screenshots required.",
      to: "markoargirovski07@gmail.com",
      from: "markoargirovski07@gmail.com",
      replyTo: "markoargirovski07@gmail.com",
      attachmentsPattern: "playwright-report/data/*.png"
    )
  }
  
  always {
    // Zip the report folder
    script {
      if (isUnix()) {
        sh 'zip -r playwright-report.zip playwright-report/index.html playwright-report/data'
      } else {
        bat 'powershell Compress-Archive -Path playwright-report\\index.html,playwright-report\\data -DestinationPath playwright-report.zip'
      }
    }
    
    // Optional: List zip file info in console to confirm
    script {
      if (isUnix()) {
        sh 'ls -lh playwright-report.zip || echo "ZIP file not found!"'
      } else {
        bat 'dir playwright-report.zip || echo ZIP file not found!'
      }
    }
    
    // Archive the report so it's accessible as a Jenkins artifact
    archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
    
    // Build URL link to the report index.html
    script {
      def reportUrl = "${env.BUILD_URL}artifact/playwright-report/index.html"
      emailext(
        subject: "Playwright Test Report - HTML",
        body: """The Playwright test report is available here:
${reportUrl}

You can also download the attached ZIP file to view it locally.""",
        to: "markoargirovski07@gmail.com",
        from: "markoargirovski07@gmail.com",
        replyTo: "markoargirovski07@gmail.com",
        attachmentsPattern: "playwright-report.zip"
      )
    }
  }
}
}


