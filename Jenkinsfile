#!groovy​
pipeline {
    environment {
        sqScannerMsBuildHome = tool 'Scanner for MSBuild'
		strProjectName = 'MHR'
    }
    
    agent any
    
    stages {
        stage('Build + SonarQube analysis') {
            steps {
				bat 'C:\\Services\\nuget.exe restore %strProjectName%.sln'
                withSonarQubeEnv('Huckshome SonarQube Server') {
                    bat '"%sqScannerMsBuildHome%\\SonarQube.Scanner.MSBuild.exe" begin /k:%strProjectName% /n:%strProjectName% /v:1.0.0.%BUILD_NUMBER% /d:sonar.host.url=%SONAR_HOST_URL% /d:sonar.login=%SONAR_AUTH_TOKEN%'
                    bat '"C:\\Program Files (x86)\\MSBuild\\14.0\\Bin\\MSBuild.exe" %strProjectName%.sln /t:Build /p:Configuration=Debug'
                    bat '"%sqScannerMsBuildHome%\\SonarQube.Scanner.MSBuild.exe" end'
                }
            }
        }
        
        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
					script {
						def qg = waitForQualityGate()
						if (qg.status != 'OK') {
							error "Pipeline aborted due to quality gate failure: ${qg.status}"
						}
					}
                }
            }
        }
        
        stage('Test') {
            steps {
                echo 'No tests'
            }
        }
        
        stage('Build for Release') {
            steps {
				bat '"C:\\Program Files (x86)\\MSBuild\\14.0\\Bin\\MSBuild" "%strProjectName%/%strProjectName%.csproj" /T:Rebuild /p:Configuration=Release /p:OutputPath="obj\\RELEASE" /p:VisualStudioVersion=14.0'
            }
        }
        
        stage('Deploy') {
            steps {
                bat 'del Z:\\Websites\\%strProjectName%\\**'
                bat 'xcopy "%strProjectName%\\obj\\Release\\_PublishedWebsites\\%strProjectName%\\**" "Z:\\Websites\\%strProjectName%\\" /s /y'
            }
        }
    }
}