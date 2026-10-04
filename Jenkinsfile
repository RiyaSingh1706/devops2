pipeline {
    agent any
    tools { nodejs 'node18' }
    environment {
        IMAGE     = 'student-app'
        CONTAINER = 'student-app-container'
        DOCKER    =  C:\\Users\\riyas\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe
    }
    triggers { pollSCM('H/2 * * * *') }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Install') {
            steps { bat 'npm ci' }
        }
        stage('Test') {
            steps { bat 'npm test' }
            post { always { junit 'reports/junit.xml' } }
        }
        stage('Build Image') {
            steps { bat 'docker build -t %IMAGE%:%BUILD_NUMBER% -t %IMAGE%:latest .' }
        }
        stage('Deploy') {
            steps {
                bat 'docker rm -f %CONTAINER%'
                bat 'docker run -d --name %CONTAINER% -p 3000:3000 %IMAGE%:latest'
            }
        }
        stage('Verify') {
            steps {
                bat 'ping -n 6 127.0.0.1 >nul'
                bat 'curl -f http://localhost:3000'
            }
        }
    }
    post {
        success { echo "Deployment successful: build #${env.BUILD_NUMBER}" }
        failure { echo 'Pipeline FAILED - check console output' }
        always  { archiveArtifacts artifacts: 'package.json', fingerprint: true }
    }
}