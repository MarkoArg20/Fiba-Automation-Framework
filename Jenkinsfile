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
    emailext(
      subject: "Playwright Test Passed - No Screenshots",
      body: "Test passed. No screenshots required.",
      to: "markoargirovski07@gmail.com, argivan243@gmail.com",
      from: "markoargirovski07@gmail.com",
      replyTo: "markoargirovski07@gmail.com",
      attachmentsPattern: "playwright-report/data/*.png"
    )
    script {
      if (isUnix()) {
        sh 'zip -r playwright-report.zip playwright-report'
      } else {
        bat 'powershell Compress-Archive -Path playwright-report\\* -DestinationPath playwright-report.zip'
      }
    }

      sleep(time: 10, unit: "SECONDS")

      
    emailext(
      subject: "Playwright Test Report - HTML",
      body: "Below you can view the status of the runned test cases. Download and extract the attached ZIP file. Open 'index.html' in your browser to view the report.",
      to: "markoargirovski07@gmail.com,
      from: "markoargirovski07@gmail.com",
      replyTo: "markoargirovski07@gmail.com",
      attachmentsPattern: "playwright-report.zip"
    )
  }
}
}

