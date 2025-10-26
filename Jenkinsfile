pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-22'  // Use the name you configured in Jenkins
    }
    
    environment {
        // Update these if your ports are different
        FRONTEND_PORT = '3001'
        BACKEND_PORT = '3000'
    }
    
    stages {
        stage('Cleanup Workspace') {
            steps {
                echo '=== Cleaning workspace ==='
                deleteDir()
            }
        }
        
        stage('Checkout Code') {
            steps {
                echo '=== Checking out code ==='
                checkout scm
            }
        }
        
        stage('Verify Project Structure') {
            steps {
                echo '=== Verifying project structure ==='
                bat '''
                    echo Listing project files:
                    dir
                    echo.
                    echo Backend files:
                    dir backend
                    echo.
                    echo Frontend files:
                    dir frontend
                '''
            }
        }
        
        stage('Install Backend Dependencies') {
            steps {
                dir('server') {
                    echo '=== Installing backend dependencies ==='
                    bat 'npm i'
                }
            }
        }
        
        stage('Install Frontend Dependencies') {
            steps {
                dir('client') {
                    echo '=== Installing frontend dependencies ==='
                    bat 'npm i'
                }
            }
        }
        
        stage('Build Client') {
            steps {
                dir('client') {
                    echo '=== Building frontend ==='
                    bat 'npm run build'
                }
            }
        }
        
        stage('Kill Existing Processes') {
            steps {
                echo '=== Clearing ports ==='
                bat '''
                    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do taskkill /F /PID %%a 2>nul
                    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173 ^| findstr LISTENING') do taskkill /F /PID %%a 2>nul
                    echo Ports cleared
                '''
            }
        }
        
        stage('Start Applications') {
            steps {
                echo '=== Starting applications ==='
                script {
                    // Start backend
                    dir('backend') {
                        bat 'start /B cmd /c "npm run dev > ../backend.log 2>&1"'
                    }
                    
                    sleep(time: 5, unit: 'SECONDS')
                    
                    // Start frontend
                    dir('frontend') {
                        bat 'start /B cmd /c "npm run dev > ../frontend.log 2>&1"'
                    }
                    
                    sleep(time: 5, unit: 'SECONDS')
                }
            }
        }
        
        stage('Health Check') {
            steps {
                echo '=== Checking application status ==='
                bat '''
                    echo.
                    echo ==========================================
                    netstat -ano | findstr :3001 | findstr LISTENING > nul
                    if %errorlevel% equ 0 (
                        echo [OK] Backend is running on port 3000
                    ) else (
                        echo [ERROR] Backend is NOT running
                    )
                    
                    netstat -ano | findstr :5173 | findstr LISTENING > nul
                    if %errorlevel% equ 0 (
                        echo [OK] Frontend is running on port 5173
                    ) else (
                        echo [ERROR] Frontend is NOT running
                    )
                    echo ==========================================
                    echo.
                    echo Frontend: http://localhost:5173
                    echo Backend:  http://localhost:3000
                    echo ==========================================
                '''
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs above.'
        }
    }
}