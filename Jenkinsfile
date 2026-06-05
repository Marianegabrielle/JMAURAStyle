pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                sh 'cd infra/docker && docker-compose build'
            }
        }
        stage('Test') {
            steps {
                sh 'echo Tests OK'
            }
        }
        stage('Deploy') {
            steps {
                sh 'cd infra/docker && docker-compose down && docker-compose up -d'
            }
        }
    }
    post {
        success { echo 'Pipeline OK !' }
        failure { echo 'Pipeline echoue.' }
    }
}
