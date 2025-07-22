pipeline {
    agent any
    
     triggers {
        cron('H/20 * * * *')
    }

    tools {
        nodejs 'NodeJS_18' // Use the NodeJS name from your Jenkins config
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/MarkoArg20/FIBA-.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright install' // just in case
                sh 'npx playwright test'
            }
        }

        stage('Archive Results') {
            steps {
                junit '**/playwright-report/*.xml' // optional, if using JUnit reports
            }
        }
    }
}
