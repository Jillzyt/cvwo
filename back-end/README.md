# Installation and set up for Ruby on Rails app

* Ruby version
Ruby 3.0.3

## Install database tools
1. Installing PostgreSQL
2. Set up a database named todo-app with the username: postgres (or you may need to modify the configurations in the database.yml file) 

## Database set up
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

## Install dependencies
1. Run ```bundle``` command to install all the gems dependencies

## Migrate database
1. Run ```rails db:migrate``` command


## Start server
1. Run ```rails server -p {port}``` with port being the port number you want to host the server with

## Postman collection
The [postman collection](https://drive.google.com/file/d/1-_iVWlbOb4GjWMtRCrYq9NmVcbAvpAwk/view?usp=sharing) can be also installed and used to test the api routes.