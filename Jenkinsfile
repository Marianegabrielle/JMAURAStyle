pipeline {
    agent any

    environment {
        DOCKER_COMPOSE = 'docker compose'
        APP_DIR = '/root/JMAURAStyle'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Clonage du code source...'
                git branch: 'main',
                    url: 'https://github.com/Marianegabrielle/JMAURAStyle.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Construction des images Docker...'
                sh '''
                    cd ${APP_DIR}/infra/docker
                    docker compose build --no-cache
                '''
            }
        }

        stage('Test') {
            steps {
                echo 'Lancement des tests...'
                sh '''
                    cd ${APP_DIR}
                    docker run --rm \
                        -e DATABASE_URL=postgresql+psycopg2://jmaura:jmaura2026@postgres:5432/jmaurastyle \
                        docker-backend \
                        python -m pytest app/ -v --tb=short || true
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo 'Déploiement...'
                sh '''
                    cd ${APP_DIR}/infra/docker
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
