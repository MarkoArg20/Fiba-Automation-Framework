pipeline {
    agent any

    tools {
        nodejs 'NodeJS_18'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/MarkoArg20/Fiba-Automation-Framework'
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
                sh 'npm install playwright-mail-reporter'
            }
        }

        stage('Run Playwright Tests') {
            steps {
              sh 'npx playwright install'
                sh 'npx playwright test'
            }
        }
    }
} 




