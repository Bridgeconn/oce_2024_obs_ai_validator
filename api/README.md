# OBS AI Validator Backend

This Project is a backend for the OBS AI Validator. It is built using Python, Fast API.
It serves the UI with APIs to validate the uploaded MD file.

<!-- Add some more lines about nllb and bleu score used for comparison and share some more tech specs used and options  -->

## Pre-requisites

1. Python3.8 or later
2. VS Code
3. Terminal
4. pip or pip3
5. 10 GB of system space
6. Ram 12 GB
7. i5 11th Gen

## Steps to install

Run the following in the terminal to install the project

### Linux

1. Create Virtual Environment, replace with the virtual environmet you want to use. `python -m venv [virtual_env_name]`. Example:

```
python -m venv venv
```

2. Activate Environment

```
source venv/bin/activate
```

3. Install the requirements

```
pip install transformers
pip install fastapi
pip install "uvicorn[standard]"
```

Note: Below the last requirement for Linux computers without GPU, use the documentation for other computers like Mac or Windows or with a GPU- https://pytorch.org/get-started/locally/

```
pip install torch --index-url https://download.pytorch.org/whl/cpu
```

## To run

Run the following from the project folder in the terminal

```
uvicorn main:app --reload
```

The Fast API server is not running on your local machine on the default port 8000 ie. http://127.0.0.1:8000. To view the swagger docs open [http://127.0.0.1:8000/docs#/](http://127.0.0.1:8000/docs#/) in a browser
