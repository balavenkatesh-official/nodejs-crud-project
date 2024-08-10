pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker-hub-credentials')
        DOCKER_IMAGE_NAME = 'balavenkateshhub/backend'
    }

    stages {
        stage('Prepare Workspace') {
            steps {
                sh 'ls -ll'
                echo "Docker Hub Username: ${DOCKERHUB_CREDENTIALS_USR}"
                echo "Docker Image Name: ${DOCKER_IMAGE_NAME}"

   //             sh '''
   //             echo "Docker Hub Username from shell: $DOCKERHUB_CREDENTIALS_USR"
   //             echo "Docker Image Name from shell: $DOCKER_IMAGE_NAME"
   //             '''
            }
        }

         stage('front-end-source code uploading') {
             steps {
                 sshagent(['server-credentials']) {
                     withCredentials([sshUserPrivateKey(credentialsId: 'server-credentials', keyFileVariable: 'SSH_KEY', usernameVariable: 'SSH_USER')]) {
                         sh '''
                         rsync -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" -avzh $WORKSPACE/frontend $SSH_USER@54.87.28.247:/var/www/html
                         '''
                     }
                 }
             }
         }

         stage('Build Backend Docker Image') {
             steps {
                 script {
                     sh '''
                     cd backend
                     sudo docker build -t $DOCKER_IMAGE_NAME:$BUILD_NUMBER .
                     '''
                 }
             }
         }

    //     stage('Push Docker Image to Docker Hub') {
    //         steps {
    //             script {
    //                 sh '''
    //                 sudo echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
    //                 sudo docker tag $DOCKER_IMAGE_NAME:$BUILD_NUMBER $DOCKER_IMAGE_NAME:latest
    //                 sudo docker push $DOCKER_IMAGE_NAME:$BUILD_NUMBER
    //                 sudo docker push $DOCKER_IMAGE_NAME:latest
    //                 '''
    //             }
    //         }
    //     }

        stage('Deploy Docker Image') {
            steps {
                script {
                    sshagent(['server-credentials']) {
                        withCredentials([sshUserPrivateKey(credentialsId: 'server-credentials', keyFileVariable: 'SSH_KEY', usernameVariable: 'SSH_USER')]) {
                            sh '''
                        # Restart the application and check pm2 status
                        ssh -i $SSH_KEY -o StrictHostKeyChecking=no $SSH_USER@54.87.28.247 << 'EOF'
cd /var/www/html
ls -ll
EOF
                        '''
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Docker image pushed and deployed successfully!'
        }
        failure {
            echo 'Docker image push or deployment failed.'
        }
    }
}
