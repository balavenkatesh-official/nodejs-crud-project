pipeline {
    agent any

    stages {
        stage('Prepare Workspace') {
            steps {
                // Ensure proper permissions for the workspace
                sh 'ls -ll'
            }
        }

        // stage('Deploy') {
        //     steps {
        //         withCredentials([usernamePassword(credentialsId: 'my-server-credentials', usernameVariable: 'SSH_USER', passwordVariable: 'SSH_PASS')]) {
        //             // Sync the source code to the remote server using rsync
        //             sh '''
        //             rsync -avzh --delete $WORKSPACE/ $SSH_USER@yourserver:/path/to/deploy
        //             '''
        //         }
        //     }
        // }

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
