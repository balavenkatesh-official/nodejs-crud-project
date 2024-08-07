pipeline {
    agent any

    stages {
        stage('Prepare Workspace') {
            steps {
                // Ensure proper permissions for the workspace
                sh 'ls -ll'
            }
        }
        stage('source code moving') {
            steps {
                // Use ssh-agent to provide the SSH key for the rsync and ssh commands
                sshagent(['server-credentials']) {
                    withCredentials([sshUserPrivateKey(credentialsId: 'server-credentials', keyFileVariable: 'SSH_KEY', usernameVariable: 'SSH_USER')]) {
                        sh '''
                        # Sync the source code to the remote server using rsync
                        rsync -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" -avzh $WORKSPACE/ $SSH_USER@34.195.110.21:/home/ubuntu/
                        '''
                    }
                }
            }
        }


        stage('Deploy') {
            steps {
                // Use ssh-agent to provide the SSH key for the rsync and ssh commands
                sshagent(['server-credentials']) {
                    withCredentials([sshUserPrivateKey(credentialsId: 'server-credentials', keyFileVariable: 'SSH_KEY', usernameVariable: 'SSH_USER')]) {
                        sh '''
                        # Restart the application and check pm2 status
                        ssh -i $SSH_KEY -o StrictHostKeyChecking=no $SSH_USER@34.195.110.21 <<EOF
                        cd /home/ubuntu/backend
                        pm2 start app.js --name backend-demo
                        pm2 list
                        EOF
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment and application restart successful!'
        }
        failure {
            echo 'Deployment or application restart failed.'
        }
    }
}
