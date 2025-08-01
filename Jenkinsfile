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
                sh 'npx playwright test --reporter=html'
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
    def safeJobName = env.JOB_NAME.replaceAll(' ', '_')
    def reportFolder = "/JenkinsReports/${safeJobName}/${env.BUILD_NUMBER}"

    def megaLink = sh(
        script: """
            set -e
            mega-logout || true
            mega-login "\$MEGA_USER" "\$MEGA_PASS"
            mega-put -c playwright-report/index.html "${reportFolder}"
            mega-export -a "${reportFolder}"
            mega-export | grep "${reportFolder}" | grep 'https://mega.nz' | tail -1
        """,
        returnStdout: true
    ).trim()

                        echo "MEGA report link is: ${megaLink}"

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
    } // Close stages

    post {
        success {
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
       //     script {
         //       if (isUnix()) {
          //          sh 'zip -r playwright-report.zip playwright-report/index.html playwright-report/data'
          //      } else {
          //          bat 'powershell Compress-Archive -Path playwright-report\\index.html,playwright-report\\data -DestinationPath playwright-report.zip'
         //       }
           // }
         //   archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
       //     archiveArtifacts artifacts: 'playwright-report.zip', fingerprint: true

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
                )
            }
        }
    }
} // Close pipeline


