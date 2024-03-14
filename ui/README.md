# OBS AI VALIDATOR

This is a web service made using React JS to provide a user interface for [OBS AI VALIDATOR](https://github.com/Bridgeconn/oce_2024_obs_ai_validator)

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Prerequisites

- [Node JS](https://nodejs.org/en/)
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

  To download the latest version of npm, run the following command:
  `npm install -g npm`

## Get the code

Clone the [git repository](https://github.com/Bridgeconn/oce_2024_obs_ai_validator) or download the zip and extract it

## Local Deployment Steps

1. Open a terminal and go to the web-app folder
2. Install the dependencies

   `npm install`

3. Start the server

   `npm run dev`

4. Go to http://localhost:5173/

<!-- ## Production Deployment Steps

?? -->

## Test Automation using Playwright

We have written some playwright tests to test the application.
To run the tests ensure you run the API and UI code as per the README.md in the 2 folders and follow the steps below.

1. To run all the playwright tests
   `npx playwright test`
2. After running the tests , to view the HTML report
   `npx playwright show-report`
3. To view the testing screenshots open the ui>test-results folder
