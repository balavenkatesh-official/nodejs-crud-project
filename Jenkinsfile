pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker-hub-credentials')
        DOCKER_IMAGE_NAME = 'balavenkateshhub/frontend'
    }

    stages {
        stage('Prepare Workspace') {
            steps {
                sh 'ls -ll'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh '''
                    # Build the Docker image
                    docker build -t $DOCKER_IMAGE_NAME:$BUILD_NUMBER .
                    '''
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    sh '''
                    # Login to Docker Hub
                    echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                    
                    # Tag the Docker image
                    docker tag $DOCKER_IMAGE_NAME:$BUILD_NUMBER $DOCKER_IMAGE_NAME:latest
                    
                    # Push the Docker image to Docker Hub
                    docker push $DOCKER_IMAGE_NAME:$BUILD_NUMBER
                    docker push $DOCKER_IMAGE_NAME:latest
                    '''
                }
            }
        }

        // Additional stages for source code moving and deploy
    }

    post {
        success {
            echo 'Docker image pushed successfully!'
        }
        failure {
            echo 'Docker image push failed.'
        }
    }
}
