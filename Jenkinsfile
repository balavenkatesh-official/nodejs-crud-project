pipeline {
    agent any

    stages {
        stage('Prepare Workspace') {
            steps {
                // Ensure proper permissions for the workspace
                sh 'ls -ll'
            }
        }
        stage('Deploy') {
            steps {
                // Use ssh-agent to provide the SSH key for the rsync and ssh commands
                sshagent(['server-credentials']) {
                    withCredentials([sshUserPrivateKey(credentialsId: 'server-credentials', keyFileVariable: 'SSH_KEY', usernameVariable: 'SSH_USER')]) {
                        sh '''
                        # Add the remote server's SSH key to the known_hosts file
                        # ssh-keyscan -H 3.82.51.115 >> ~/.ssh/known_hosts

                        # Sync the source code to the remote server using rsync
                        rsync -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" -avzh $WORKSPACE/ $SSH_USER@34.195.110.21:/home/ubuntu/

                        # Restart the application and check pm2 status
                        ssh -i $SSH_KEY -o StrictHostKeyChecking=no $SSH_USER@34.195.110.21 << 'EOF'
                        pm2 start 0
                        pm2 list
                        pm2 log 0
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
