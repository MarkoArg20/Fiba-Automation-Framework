#Framework for testing the FIBA web app


[![Jenkins Build](https://img.shields.io/badge/Jenkins-Build%20Configured-brightgreen?logo=jenkins)](https://github.com/MarkoArg20/Fiba-Automation-Framework/blob/main/Jenkinsfile)
![Test Scope](https://img.shields.io/badge/Scope-Navigation%20Menu%20%26%20Login-blue)
![Coverage](https://img.shields.io/badge/Coverage-UI%20%2B%20Backend-yellow)


This is a small framework made using PlayWright with JavScript and TypeScript. It scopes the navigation menu buttons and login scenarios. It tests both the UI and the backend for them.
It has a CI pipeline configured in Jenkins and written in Groovy. Also when the tests are finished it sends a meil with a test report.


Instalation:
Clone the repository:
- git init; git remote add origin https://github.com/MarkoArg20/Fiba-Automation-Framework; git pull origin main;

Run the tests: //ova so pogolemi bukvi
- open the files in Visual studio. Open command prompt and install Plawyright (npx install playwright); then install node.js (npm ci)
- after that you need to create a .env file in your project for the endpoints, username and password 

- How to create a .env file?
These are the endpoints that are already set:

BASE_URL=https://www.fiba.basketball/en
GET_GAMES_URL=https://www.fiba.basketball/en/games?_rsc=5hm87
GET_NEWS_URL=https://www.fiba.basketball/en/news?_rsc=1y9sx
GET_EVENTS_URL=https://www.fiba.basketball/en/events/api/game-live-info/125389/light
GET_CALENDAR_URL=https://digital-api.fiba.basketball/hapi/getgdapgamesbetweentwodates?dateFrom=2025-06-01T00:00:00.000Z&dateTo=2025-06-29T00:00:00.000Z
POST_LOGIN_URL=https://auth.fiba.basketball/identity/v1/password/login

then signup here https://www.fiba.basketball/en/register
after that, provide the username and password in this variables in the .env
FIBA_USERNAME=
PASSWORD=

- then to run the tests (npx playwright test --headed) 
- to view the report

