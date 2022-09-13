# Indie Web APP

## Indie Lisboa
This is the front-end application for the Indie Lisboa annual event.
It uses mostly Typescript, React for JavaScript and Patternly

## Development Process

This application is being built first on storybook. Each Component is created and a test case is added to storybook.
Whenever deemed appropriate, the component will be added to the main application.


## Quick-start
If you have the environment variable "PORT" defined, then define "PORT_WHEN_RUNING_LOCAL_API" = 9000

Must Install [NPM](https://www.npmjs.com/) version "8.1.0" which is guaranteed to be compatible with the version of Patternfly used. We have noticed that other versions have issues when installing the dependencies.

It is recommended to Install [Node.JS](https://nodejs.org/en/) version 16.13.0 which is compatible.


Install all dependencies by running
```bash
npm install
```

Run the project locally
```bash
npm run start:dev
```

Run the storybook
```bash
npm run storybook
```

## Running with local Back-end
Environment variables:
INDIE_WEBAPI_URL = http://localhost:8080/v1/
PORT = 8080 // used by the api
ORIGINS = http://localhost:9000
PORT_WHEN_RUNING_LOCAL_API = 9000 // used by the app


npm run start:dev


## Deploy: (currently [deployed with Heroku here](https://indielx-pf.herokuapp.com/))

Heroku uses package.json to decide which node and npm version to install.
For this reason, package.json should have 
```
"engines": {
    "npm": "8.1.0"
  },
```
To make sure that the correct versions are run.


### Steps to deploy at heroku for the first time:

Create an [Heroku](https://www.heroku.com/) account
```bash
npm run build
```
install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
create a new app at heroku dashboard on the website
```bash
 heroku git:remote -a <name of app>
```
```bash
 git push heroku master
```

### Steps to update the app once deployed:
```bash
npm run build
```
```bash
 git push heroku master
```

[More details](./docs/info.md)