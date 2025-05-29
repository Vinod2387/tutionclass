pipeline {
    agent any

    tools {
        nodejs 'Nodejs'  // Replace with your configured NodeJS tool name in Jenkins
        dockerTool 'docker' // Replace with your configured Docker tool name in Jenkins
    }

    environment {
        SONARQUBE_ENV = credentials('sonar-token')  // Jenkins credentials ID
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Vinod2387/tutionclass.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint Changed Files') {
            steps {
                // Add node_modules/.bin to PATH so eslint (installed locally) can run
                sh '''
                    export PATH=$PWD/node_modules/.bin:$PATH
                    git fetch origin main
                    git diff --name-only origin/main...HEAD | grep '\\.js$' | xargs eslint || true
                '''
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool name: 'sonar-scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                    withSonarQubeEnv('sonar-server') {
                        sh """
                            ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=my-project \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=http://172.17.0.2:9000 \
                            -Dsonar.login=${SONARQUBE_ENV}
                        """
                    }
                }
            }
        }

        stage('Code Coverage') {
            steps {
                sh 'npm run coverage'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-cred', toolName: 'docker') {

                        sh "docker build -t tutionclass:latest ."
                    }
                }
            }
        } 

        stage('Tag & Push Docker Image') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-cred', toolName: 'docker') {

                        sh "docker tag tutionclass:latest vinod2387/tutionclass:latest"
                        sh "docker push vinod2387/tutionclass:latest"
                    }
                }
            }
        }        
        
        stage('Deploy Application') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-cred', toolName: 'docker') {

                        sh "docker run -d -p 3000:3000 vinod2387/tutionclass:latest"
                    }
                }
            }    
        }
    }
}