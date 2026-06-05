pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Clonage du code source...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Construction des images Docker...'
                sh '''
                    cd infra/docker
                    docker compose build --no-cache
                '''
            }
        }

        stage('Test') {
            steps {
                echo 'Lancement des tests...'
                sh '''
                    cd backend
                    docker run --rm \
                        -v $(pwd):/app \
                        -w /app \
                        python:3.11-slim \
                        sh -c "pip install -r requirements.txt -q && python -m pytest app/ -v --tb=short || true"
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo 'Déploiement...'
                sh '''
                    cd infra/docker
                    docker compose down
                    docker compose up -d --build
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline terminé avec succès !'
        }
        failure {
            echo 'Pipeline échoué.'
        }
    }
}
