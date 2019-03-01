# Table of Contents
* Installation and Setup
* Running the Frontend Angular 7 app
* Production-Ready Build
* Questions, Comments and Other Feedback

## Installation and Setup 
The RumiLMS backend is built with Python using the  [Django framework](https://docs.djangoproject.com).

The frontend is built on Angular 7 and Angular Material.

## Clone the Project
From your terminal/commandline:
`git clone` this repository into a directory of your choice on your local machine.


## Setup the Virtualenv 
To setup the backend properly:
- Create a virtual environment thus:
```bash
virtualenv -p python3 env 
```

# Activate the Virtualenv
```bash
    source env/bin/activate
```

Install the Django-related packages in the requirements/common.txt file.

## Install the Django Dependencies
cd into the root `rumilms` dir (where you find the `manage.py` file) and run:

```bash 
pip install -r requirements/common.txt
```

Barring any hiccups, this should successfully install:

- [`django`](https://djangoproject.com)

- [`djangorestframework`](https://django-rest-framework.org)   and 

- [`django-cors-headers`](https://github.com/ottoyiu/django-cors-headers/blob/master/README.rst)

The __django-cors-headers__ is needed to configure CORS since, during development at least, your (Angular) frontend app and the Django-based backend app will be running on different ports. So, essentially, they don't exist on the same website.

For detailed instructions about the setup of the backend, please see the detailed docs on: 
- [Django Framework](https://docs.djangoproject.com)
- [django-rest-framework](https://django-rest-framework.org)
- [Django CORS Headers](https://github.com/ottoyiu/django-cors-headers/blob/master/README.rst) 

## Start the Django Project

To start the django app and load the live API:
```bash
python3 manage.py runserver
```

To view the Django Admin Site (where you can add, update and delete Classes and Students), 
- Got to `localhost:8000/admin` and login 

To see the live browsable API:
* Go to `localhost:8000/api/`

## Running the Frontend Angular 7 App
From the root `rumilms` directory, run:
```bash 
    cd lms/static/rumiLMS
```

This is where the Angular-based frontend app, `rumiLMS` lives. Most of the codebase that you will be interacting with will be in the `app` subdirectory.

### Install Angular 7 and its  Dependencies
This is assuming that you already have NodeJS and NPM installed on your system. If not, please, see the [Installation Instructions](https://nodejs.org/en/download/) at the NodeJS.org website.

Once you have NodeJS and NPM installed:
1. Install the NPM dependencies for this Angular  by running
```bash
    npm install -g 
```

2. Start the Angular dev server 
```bash
    ng serve -o
```

The above command starts the Angular dev server that launches the RumiLMS app and opens the app in a new tab/window on `localhost:4200`.

Play around with the app in the browser here to see how it works.

## Running RumiLMS app Test Suites
Anywhere with the `rumiLMS` directory (or sub-directories thereof), enter:
```bash
    ng test
```

This will start the test serve and open a new window at `localhost:9876`

## Production-Ready Build
> There is a `dist` folder at the root of the `rumiLMS` directory (where the Angular app resides).

This `dist` folder is production-ready and can be integrated into the main Django (or any other framework's) backend to run the RumiLMS app in production.

If you change the codebase of the app, be sure to run `ng build` to get a fresh and up-to-date `dist` folder to use.

## Questions, Comments and Other Feedback
Please, feel free to reach out with your feedback regarding this project.
> This project is provided as-is with no guaranty whatsoever. Please,use with discretion.

> Best way to reach me: 
* My email (if you have it)
* [Muhammad Jalloh](https://www.linkedin.com/in/muhammadjalloh/ "Muhammad Jalloh on LinkedIn")

```python
    print("Thank you for reading! :)")
```

and please, 
```javascript
  let message:string = "Excuse any unforgivable grammatical blunders herein."