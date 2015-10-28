# CityHome
CityHome Project Code and Code Instructions
Created by: Dennis Garcia
Date: 15 May 2015
Email: dagarcia@mit.edu

## Setting Everything Up
In order to be able to run the application successfully, one must download and install the following: Node.js, MongoDB, and npm. 

Next, once the CityHome folder has been downloaded and all the necessary things have been installed, the dependencies for the application have to be installed. This can be done by navigating to the CityHome folder through the terminal and once there can run 'npm install'. This command installs everything stated in the package.json file. 

## Running the Application 
In order to run the application, open one terminal shell and type 'mongod --port PORT_NUMBER' where PORT_NUMBER is the number specified in the connection_string variable in the app.js file. This sets up a mongod instance that listens for connections. Then, open up a second terminal shell and navigate to the CityHome folder and type and run the command 'npm start'. Once this is running, open a browser and type the address "http://localhost:PORT_NUMBER" where PORT_NUMBER by default is 3000, but can be set to a different port in the 'www' file located in the 'bin' folder within the CityHome folder. Currently, the port is set to 3001. 

## Checking the Database
To check the status of the database, open a different terminal shell and type 'mongo --port PORT_NUMBER' where PORT_NUMBER is the same port number as mentioned in launching the mongod shell in the "Running the Application" section. Then, type 'show dbs' to see which dbs there are and locate the one that says cityhome or something of the sort. Then, type 'use cityhome' to switch to this database. Then, type 'show collections' to see what kinds of collections there are in the database. Now, to check a specific collection, do the following. Say there is a collection called 'objects'. Type 'db.objects.find().pretty()' to show you all of the documents stored under that collection. There are different querying methods that can be found in the mongodb documentation online that can narrow down what document you are searching for.

## Hardcoding the User in the Database
In order to add user functionality, the steps mentioned in the "Checking the database" section to get to the database you want. Then type "db.users.insert({'username': 'cityhome', 'password': 'cityhome'})" in order to hard code a user into the database. This, in combination with the Response.restrict parameters in the http requests will make it so that one has to start a session, then login to be able to use any of the http requests. To test this session/login functionality, use the Python Requests library to start a session, login, and make calls to the server. 