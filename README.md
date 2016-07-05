#Client-Server Repo #

This is the repository for the Vault101 payroll system for the client and server. The project is running on Node.JS and is currently in version 0.0.1 (preparation for alpha release).

## Key aspects ##
* Running on NodeJS.
* Uses the express framework for creating the server.
* Uses Mocha for unit testing.
* MongoDB for persistent data storage.

## How do I get set up? ##
If the project has no run configurations when you try and open it up in webstorm:
1. Open up the project in webstorm
2. Create the run configuration to run the server, the javascript file to run the server is index.js
3. Create the Mocha testing run configuration to run the unit tests, point the run configuration to the "test" directory.

## Exploration of the project structure##
Let's explore the project structure and look at the important parts of the project.

### Index.js ###
index.js is the main Javascript file of the NodeJS server. It is here were the server instance is spun up and initialized (so in the run configuration, point to this file). 
NOTE: As you can see I have already created a Mongo database, this database is already running in the cloud at MongoLabs, so we're all running off the same database.

### client-side ###
This folder will contain all the client-side files (i.e. javascript, css). Note that there is a folder called "html_files". The files in this folder will only be used in the development stage. The reason why it exists is because we can separate our html and jade files which makes life a lot easier.

### custom_modules ###
The custom_modules folder will contain all the custom modules (good naming convention hey?) that is used in the project. Whenever you want to create something that's not a; route or schema, place it in a file in here. The alternative is to use the index.js file for all additional functionality, then pass it in wherever you needed. As you might tell, this can get messy.

Make sure when you write a module, you export it:

```
#!NodeJS

module.exports = function(foo){
...
...
}
```

### node_modules ###
This is where all the npm installs go, to make sure that your project is up today with it's dependencies, check this folder.

### routes ###
Place all the routes here. When making a route, keep in mind that we want the same functionality in both the mobile and browser-based clients. 
So when creating some functionality, follow these steps:
1. Create a normal Javascript function that fulfills the requirements of whatever you're trying to do. Make this function return values in JSON format.
2. Create two REST (i.e. GET, PUT, POST, HEAD...) methods (one for mobile and one for website). Name the mobile with the suffix "m". For example, if I've made a route to get all users:

```
#!NodeJS
function getAllUsers(request, next){
//All your stuff here
    return allUsers
}

router.get("/getAllUsers", function(request, response, next){
    ...
})

router.get("/mGetAllUsers", function(request, response, next){
    ...
})
```
This way, we keep the code consistent. Also, if one people is creating DB queries for the website and another is creating queries for android, we may end up creating the same query twice...

ALSO! the beauty of having individual functions without actually implementing the HTTP methods (GET, PUT, POST...) is that we can unit test each individual query without having a working client.

### schemas ###
This folder will contain all the schemas for our models. Although we may only need one schema (User), if we decide that we want to now break it up, we can.

### test ###
The "test" folder is where all the unit testing is going to happen. When you first start the program, if there isn't a unit testing run configuration yet, create a "Mocha" unit test and point it to this directory.

### views ###
The view folder will contain all the "jade" files for our project. Make sure that only jade exist in here. By default, when you want to compile a specified Jade file into HTML, it will look in this folder. So you don't need to specify it, unless you make another custom folder location... but why would you want to do that?

## Quick note about unit testing ##
The unit testing we're going to be using is "Mocha", mainly because it is the most well supported TDD library for NodeJS. However it can be a pain to work with. Make sure, when you run your tests, that you have the server; running, listening and connecting to the database before you run the tests, otherwise they may fail (well, at least I've written a failing test). 
