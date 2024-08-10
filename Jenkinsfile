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
                echo "Docker Hub Username: ${DOCKERHUB_CREDENTIALS_USR}"
                echo "Docker Image Name: ${DOCKER_IMAGE_NAME}"
                
                sh '''
                echo "Docker Hub Username from shell: $DOCKERHUB_CREDENTIALS_USR"
                echo "Docker Image Name from shell: $DOCKER_IMAGE_NAME"
                '''
            }
        }

        stage('source code moving') {
            steps {
                // Use ssh-agent to provide the SSH key for the rsync and ssh commands
                sshagent(['server-credentials']) {
                    withCredentials([sshUserPrivateKey(credentialsId: 'server-credentials', keyFileVariable: 'SSH_KEY', usernameVariable: 'SSH_USER')]) {
                        sh '''
                        # Sync the source code to the remote server using rsync
                        rsync -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" -avzh $WORKSPACE/frontend $SSH_USER@100.27.231.86:/home/ubuntu/
                        '''
                    }
                }
            }
        }

        // stage('Build Docker Image') {
        //     steps {
        //         script {
        //             sh '''
        //             # Build the Docker image
        //             docker build -t $DOCKER_IMAGE_NAME:$BUILD_NUMBER .
        //             '''
        //         }
        //     }
        // }

        // stage('Push Docker Image to Docker Hub') {
        //     steps {
        //         script {
        //             sh '''
        //             # Login to Docker Hub
        //             echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                    
        //             # Tag the Docker image
        //             docker tag $DOCKER_IMAGE_NAME:$BUILD_NUMBER $DOCKER_IMAGE_NAME:latest
                    
        //             # Push the Docker image to Docker Hub
        //             docker push $DOCKER_IMAGE_NAME:$BUILD_NUMBER
        //             docker push $DOCKER_IMAGE_NAME:latest
        //             '''
        //         }
        //     }
        // }

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
