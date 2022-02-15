pipeline {
    agent any
    stages {
        stage("Build app") {
            steps {
                script {
                    echo "building the application..."
                    sh 'npm install'
                    sh 'quasar build'
                }
            }
        }
        stage("build image") {
            steps {
                script {
                    echo "building image"
                }
            }
        }
        stage("deploy") {
            steps {
                script {
                    echo "deploying"
                }
            }
        }
    }   
}
