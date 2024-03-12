# OBS AI Validator Backend

This Project is a backend for the OBS AI Validator. It is built using Python, Fast API.
It serves the UI with APIs to validate the uploaded MD file.

<!-- Add some more lines about nllb and bleu score used for comparison and share some more tech specs used and options  -->

## Pre-requisites

1. Python3.8 or later
2. VS Code
3. Terminal
4. pip or pip3
5. 10 GB of disk space
6. Ram 12 GB
7. i5 11th Gen
8. Internet connection to download 10GB data

## Steps to install

Run the following in the terminal to install the project

### Linux

1. Create a Python virtual environment, replace with the virtual environmet you want to use. `python -m venv [virtual_env_name]`. Example:

```
python -m venv venv
```

2. Activate the virtual environment

Linux

```
source venv/bin/activate
```

Windows

```
venv\Scripts\activate
```

3. Install the requirements

```
pip install transformers
pip install fastapi
pip install "uvicorn[standard]"
pip install sqlalchemy
pip install nltk
```

Note: The last command below installs the torch package without GPU, use this pytorch documentation Link [https://pytorch.org/get-started/locally](https://pytorch.org/get-started/locally) for MAC o GPU computers configurations.

Linux CPU

```
pip install torch --index-url https://download.pytorch.org/whl/cpu
```

Windows CPU

```
pip install torch
```

## To run

Run the following from the project folder in the terminal

1. Activate Virtual Environment if not active from the folder that you installed the virtual environment in

Linux

```
source venv/bin/activate
```

Windows

```
venv\Scripts\activate
```

2. Start the Fast API server

```
uvicorn main:app --reload
```

The Fast API server is now running on your local machine on the default port 8000 i.e. http://127.0.0.1:8000.

The swagger docs for the API are available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

3. Initialize the DB

Run this url (http://127.0.0.1:8000/initialize_obs) in the browser after starting the Fast API server to initialize the database. This populates the database with english open bible stories.
