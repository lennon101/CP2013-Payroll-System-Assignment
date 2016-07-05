"use strict";
/*jslint node: true */

//When using this file, make sure to create a new run configuration to run only this script. Comment/uncomment the functions at the bottom of this file to play with the queries/see the results.

var mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://hello_world:catinahat_1@ds049898.mongolab.com:49898/payroll_db");
var db  = mongoose.connection;
db.on("error", function(err) {
    console.log("Error with connection:");
});
db.on("open", function(callback){
    console.log("connection successful");
});

var Users = require("../schemas/User")(mongoose);

function User(username, password, firstName, lastName, title, gender, contactNumber, residentialAddress, payType, payRate, hoursWorked)  {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.title = title;
    this.gender = gender;
    this.contactNumber = contactNumber;
    this.residentialAddress = residentialAddress;
    this.payment = {payType : payType,
        payRate: payRate};
    this.hoursWorked = hoursWorked;
}

var maleNames = ["Drew", "Anton", "Clyde", "Miguel", "Rico"];
var femaleNames = ["Cyrstal", "Kenna", "Tianna", "Angele", "Jada"];
var lastNames = [
    "Orozco",
    "Michael",
    "Davidson",
    "Hanson",
    "Moses",
    "Grimes",
    "Mueller",
    "Charles",
    "Mcgee",
    "Harding",
    "Cole",
    "Spence",
    "Shea",
    "Jackson",
    "Wang",
    "Davila",
    "Austin",
    "Peck",
    "Andersen",
    "Vega",
    "Oliver",
    "Stevenson",
    "Ward",
    "Barker",
    "Galloway",
    "Murray",
    "Brady",
    "Floyd",
    "Craig",
    "Walker"
];
var maleTiltles = ["Dr", "Mr"];
var femaleTitles = ["Dr", "Mrs", "Ms", "Miss"];
var hourlyRates = [15.50, 21.60, 31.40, 45.50, 55.30, 60.30];

var persons = [];

function generateFemales(){
    for (var i = 0; i < 50; ++i){
        console.log("generating female person: count " + i);
        var hours = Math.floor((Math.random() * 37) + 5);
        var randomHourlyRate = hourlyRates[Math.floor((Math.random() * hourlyRates.length))];
        var title = femaleTitles[Math.floor((Math.random() * femaleTitles.length))];
        var firstName = femaleNames[Math.floor((Math.random() * (femaleNames.length - 1)))];
        var lastName = lastNames[Math.floor((Math.random() * (lastNames.length - 1)))];
        var userName = firstName + lastName;
        var password = lastName + firstName;
        var gender = "f";
        var phoneNumber = "";
        for (var j = 0; i < 8; ++i){
            phoneNumber += Math.floor((Math.random() * 10));
        }
        var payType = "h";
        var address = "none";

        persons.push(new User(userName, password, firstName, lastName, title, gender, phoneNumber, address, payType, randomHourlyRate, hours));
    }
}

function generateMales(){
    for (var i = 0; i < 50; ++i){
        console.log("generating male person: count " + i);
        var hours = Math.floor((Math.random() * 37) + 5);
        var randomHourlyRate = hourlyRates[Math.floor((Math.random() * hourlyRates.length))];
        var title = maleTiltles[Math.floor((Math.random() * maleTiltles.length))];
        var firstName = maleNames[Math.floor((Math.random() * (maleNames.length - 1)))];
        var lastName = lastNames[Math.floor((Math.random() * (lastNames.length - 1)))];
        var userName = firstName + lastName;
        var password = lastName + firstName;
        var gender = "m";
        var phoneNumber = "";
        for (var j = 0; j < 8; ++j){
            phoneNumber += Math.floor((Math.random() * 10));
        }
        console.log("generates the all major details");
        var payType = "h";
        var address = "none";

        persons.push(new User(userName, password, firstName, lastName, title, gender, phoneNumber, address, payType, randomHourlyRate, hours));
    }
}

function generateSingleUser(){
        var randomHourlyRate = 23.7;
        var title = "Dr";
        var firstName = "Tony";
        var lastName = "Jarvis";
        var userName = firstName + lastName;
        var password = lastName + firstName;
        var gender = "m";
        var phoneNumber = "";
        for (var j = 0; j < 8; ++j){
            phoneNumber += Math.floor((Math.random() * 10));
        }
        console.log("generates the all major details");
        var payType = "h";
        var address = "none";

        persons.push(new User(userName, password, firstName, lastName, title, gender, phoneNumber, address, payType, randomHourlyRate, hours));
}
//generateFemales();
//generateMales();

function insertUsersToDatabase(){
    for (var i = 0; i < persons.length; ++i){
        var newPerson = Users(persons[i]);
        newPerson.save(function(err){
            if(err) throw err;
            console.log("user added to DB");
        });
    }
}

function insertSingleUser(){
    console.log(persons[0]);
    var singlePerson = Users(persons[0]);
    singlePerson.save(function (err){
        if (err) throw err;
        console.log("The user has been saved:");
    });
}

function getUserByLastName(){
    Users.find({}).
        where("lastName").equals("Michael").
        exec(function(err, user){
            if (err) throw err;
           console.log("users payrate is: " + user[0].payment.payRate);
        });
}

function updatePayRate(){
    Users.findOneAndUpdate({lastName: "Davila"}, {$set : {"payment.payRate" : 31.00, hoursWorked: 30}}, function(err, user){
        if (err) throw err;
        //Note this object which is returned will be before the update (in this case, will have the old pay rate)
        console.log(user);
    });
}

function addToPayHistory(){
    var item = {
        date: new Date(),
        payRate: 30,
        hours: 4,
        totalAmount: 0,
        reimburse: 50,
        deductions: 21,
        netAmount: 0
    };
    item.totalAmount = item.payRate * item.hours;
    item.netAmount = item.totalAmount + item.reimburse - item.deductions;
    Users.findOneAndUpdate({lastName: "Jarvis"}, {$push: {payHistory: item}}, function(err, user){
        if (err) throw err;
        console.log(user);
    });
}

function getAllUsers(){
    Users.findAll().sort({firstName: 1}).exec(function(err, users){
        if (err){
            throw err;
        } else {
            console.log(users);
        }

    })
}

getAllUsers();
//insertSingleUser();
//insertUsersToDatabase();
//getUserByLastName();
//updatePayRate();
addToPayHistory();
