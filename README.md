# [OBS AI VALIDATOR](https://github.com/Bridgeconn/oce_2024_obs_ai_validator)

This service enables the QA (content) team to use AI to assist them in checking the content of Oral Bible Stories. All Indian gateway languages are supported by this service. There is currently only support for MD files; support for USFM files will be added in the future.
 
<h3> Workflow </h3>

- Upload the .md file that you want to check 
- Select the language you submitted
- To do a machine translation, click the translate button
- Use the validate button to compare the uploaded and machine-translated files
<p>
<p>
<p>

This repository contains two services,i.e, API and Web Services.


<h3>API Service</h3>

This Project is a backend for the OBS AI Validator. It is built using Python, Fast API.
It serves the UI with APIs to validate the uploaded MD file.

See the api app folder [README](/api/README.md) for more details on how to deploy the API Service.

<h3>Web Service</h3>

This is a web service made using React JS to provide a user interface for OBS AI VALIDATOR.
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
<!-- Demo - https://usfm-grammar-revant.netlify.app/ -->

See the ui app folder [README](/ui/README.md) for more details on how to deploy the web service.