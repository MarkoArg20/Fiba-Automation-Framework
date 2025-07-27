pipeline {
    agent any
    
     //triggers {
     //  cron('* * * * *')
   // }

    tools {
        nodejs 'NodeJS_18' // Use the NodeJS name from your Jenkins config
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/MarkoArg20/FIBA-.git'
            }
        }

        // tuka novoto
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
  // tuka novoto
        
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
      emailext (
        subject: "Playwright Test Failed - Screenshot Attached - this is a test e-mail for PW project",
        body: "Test failed. See attached screenshot.",
        to: "markoargirovski07@gmail.com, argivan243@gmail.com",
        from: "markoargirovski07@gmail.com",
          replyTo: "markoargirovski07@gmail.com",
        attachmentsPattern: "playwright-report/data/*.png"
      )
    }
  }
}
