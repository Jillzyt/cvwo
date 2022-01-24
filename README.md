# CVWO Todo application

## Description
This is a todo application that is used to fulfil the requirements for the todo-app. 

## Installation and set up for Ruby on Rails app

* Ruby version
Ruby 3.0.3

### 1. Install database tools
1. Installing PostgreSQL
2. Set up a database named todo-app with the username: postgres (or you may need to modify the configurations in the database.yml file) 

### 2. Database set up
1. Run ```rails db:migrate```
2. Edit the file in database.yml in the _config folder_ with your updated database credentials for development env

These are the default configuration:

```
development:
  <<: *default
  database: todo-app
  username: postgres
  password: 
  host: localhost
  port: 5432
```

### 3. Install dependencies
1. Run ```bundle``` command to install all the gems dependencies

### 4. Migrate database
1. Run ```rails db:migrate``` command


### 5. Start server
1. Run ```rails server -p {port}``` with port being the port number you want to host the server with

### 6. Postman collection
The [postman collection](https://drive.google.com/file/d/1-_iVWlbOb4GjWMtRCrYq9NmVcbAvpAwk/view?usp=sharing) can be also installed and used to test the api routes.


## Installation and set up for React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### 1. Install npm
1. Make sure you have node package manager installed to run the application

In the project directory, you can run:

### 2. Install application's dependencies
1. Run the command ```npm install``` to install the application dependencies

### 3. Start the server
1. Run the command ```npm start``` to run the server in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.