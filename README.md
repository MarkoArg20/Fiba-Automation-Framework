#Framework for testing the FIBA web app


[![Jenkins Build](https://img.shields.io/badge/Jenkins-Build%20Configured-brightgreen?logo=jenkins)](https://github.com/MarkoArg20/Fiba-Automation-Framework/blob/main/Jenkinsfile)
![Test Scope](https://img.shields.io/badge/Scope-Navigation%20Menu%20%26%20Login-blue)
![Coverage](https://img.shields.io/badge/Coverage-UI%20%2B%20Backend-yellow)


This is a small framework made using PlayWright with JavScript and TypeScript. It scopes the navigation menu buttons and login scenarios. It tests both the UI and the backend for them.
It has a CI pipeline configured in Jenkins and written in Groovy. Also when the tests are finished it sends a meil with a test report.


Instalation:
Clone the repository:
- git init; git remote add origin https://github.com/MarkoArg20/Fiba-Automation-Framework; git pull origin main;

Run the tests:
- open the files in Visual studio. Open command prompt and install Plawyright (npx install playwright); then install node.js (npm ci)
- then to run the tests (npx playwright test --headed) 
- to view the report

Create a .env file



