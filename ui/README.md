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

### Test Automation using Playwright

1. Install playwright extension in the UI , using this command
   `npm init playwright`
2. Choose the language to do the script
   `TypeScript / JavaScript`
3. Choose the directory to write your tests
   by default playwright suggests `tests`
4. Choose `yes` to github workflow
5. Choose `yes` to install playwright browsers
6. Choose `yes` to install playwright operating system dependencies
7. Create test files under `tests` directory, save your testfile with extension
   `yourFileName.spec.js`
8. To run a particular test , using the command
   `npx playwright test your_file.spec.ts`
9. To run all test together
   `npx playwright test`
10. After running the tests , to view the HTML report
    `npx playwright show-report`
