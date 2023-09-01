pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                nodejs(nodeJSInstallationName:'LTS') {
                        sh 'npm install'
                        sh 'npx nuxi generate'
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                nodejs(nodeJSInstallationName:'LTS') {
                    withCredentials([string(credentialsId: '2c1e51e1-f360-4e21-95d2-bf710722b8c6', variable: 'APITOKEN')]) {
                        sh 'CLOUDFLARE_API_TOKEN=$APITOKEN wrangler pages deploy .output/public --project-name notiobs'
                    }
                }
            }
        }
    }
}
