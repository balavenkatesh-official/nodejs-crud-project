pipeline {
    agent any

    stages {
        stage('Prepare Workspace') {
            steps {
                // Ensure proper permissions for the workspace
                sh 'ls -ll'
            }
        }

    stages {
        stage('Deploy') {
            steps {
                // Use ssh-agent to provide the SSH key for the rsync command
                sshagent(['server-credentials']) {
                    sh '''
                    rsync -avzh --delete $WORKSPACE/ ubuntu@54.197.181.85:/home/ubuntu
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
    }

    post {
        success {
            echo 'Deployment and application start successful!'
        }
        failure {
            echo 'Deployment or application start failed.'
        }
    }
}
