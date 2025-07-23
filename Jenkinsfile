pipeline {
    agent any
    
    // triggers {
     //   cron('H/8 * * * *')
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
                    writeFile file: '.env', text: "${DOT_ENV}"
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
                sh 'npx playwright test'
            }
        }

       // stage('Archive Results') {
//     steps {
//         junit '**/playwright-report/*.xml' // optional, if using JUnit reports
//     }
// }
    }
}
