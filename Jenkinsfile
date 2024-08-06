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
                // Use ssh-agent to provide the SSH key for the rsync command
                sshagent(['server-credentials']) {
                    sh '''
                    # Add the remote server's SSH key to the known_hosts file
                    # ssh-keyscan -H 3.82.51.115 >> ~/.ssh/known_hosts
                    
                    # Sync the source code to the remote server using rsync
                    rsync -e "ssh -o StrictHostKeyChecking=no" -avzh  $WORKSPACE/ ubuntu@3.82.51.115:/home/ubuntu/
                    '''
                }
            }
        }
    }

        // stage('Start Application') {
        //     steps {
        //         withCredentials([usernamePassword(credentialsId: 'my-server-credentials', usernameVariable: 'SSH_USER', passwordVariable: 'SSH_PASS')]) {
        //             // Navigate to the deployment directory and start the application using pm2
        //             sh '''
        //             ssh $SSH_USER@yourserver << 'EOF'
        //             cd /path/to/deploy
        //             pm2 start server.js --name "my-app" --watch
        //             EOF
        //             '''
        //         }
        //     }
        // }
    //}

    post {
        success {
            echo 'Deployment and application start successful!'
        }
        failure {
            echo 'Deployment or application start failed.'
        }
    }
}
