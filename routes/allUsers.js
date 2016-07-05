/**
 * Created by alice_000 on 8/10/2015.
 */

module.exports = function (User) {

    var express = require("express");
    var router = express.Router();
    var userQueries = require("../db_queries/user_queries")(User);
    var mongoose = require("mongoose");
    var compileJade = require("../custom_modules/compileJadeFile");


    router.get("/", function (request, response, next) {
        response.render('home.jade');
    });


    router.post("/addNewUser", function (request, response, next) {
        console.log(request.body);

        var employeeDetails = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            payType: request.body.optionsRadios

            //payment: [{payType: request.body.optionsRadios}]
        };

        console.log(request.body.optionsRadios)
        console.log(employeeDetails.firstName);
        userQueries.insertSingleUser(employeeDetails)
            .then(function (result) {
                console.log("new user added");
                response.send({message: "send"});
                next();
            });

    });

    router.get("/allUser", function (request, response, next) {
        console.log("finding all users");
        User.find({}, function (err, users) {
            if (err) {
                console.log(err + "");
            }
            response.send(users + "");
        })
    });

    router.post("/firstName", function (request, response, next) {
        var firstName = request.body.firstName; // This will be changed to be retrived from a HTML page
        console.log("First name is ");
        console.log(firstName);
        var user
        userQueries.getUsersByFirstName(firstName)
            .then(function (users) {
                for (var i = 0; i < users.length; ++i) {
                    user = users[i];


                }
                console.log(user)
                html = compileJade.withArray("views/aUser.jade", {item: user});
                response.send({message:html});


            });
    });


    router.post("/deleteById", function (request, response, next) {
        console.log(request.body)
        userQueries.deleteUserById(request.body.employeeID)

            .then(function (result) {
                response.send("successful");
            });
    });

    router.get("/getPaymentById", function (request, response, next) {
        var id = "5615077b55cdb1b82b3a852f";
        userQueries.getPaymentById(id)
            .then(function (userPayment) {
                console.log(userPayment);
                response.send(userPayment)
            })
    });

    router.get("/updatePayment", function (request, response, next) {
        var id = "56150ab7de136a5424b111f1";    // will need to change
        var payObject = {payMethod: "Post", payRate: 45.8};    // will need to change
        userQueries.updatePaymentById(id, payObject)
            .then(function (result) {
                response.send("update has happened")
            })
            .catch();
    });

    router.get("/addToPayHistory", function (request, response, next) {
        var id = "5620754631ad24441816abb8";
        var latestPay = {
            date: new Date(),
            payRate: 22.3,
            hours: 24,
            totalAmount: 223,
            reimburse: 50,
            deductions: 25,
            netAmount: 248
        };
        userQueries.addToPayHistory(id, latestPay)
            .then(function (result) {
                response.send("added to pay history");
            })
    });
    // get all pay history for the user
    router.post("/getUser", function(request, response, next) {
        var id = request.body.id;
        console.log(request.body.id);
        userQueries.getUserById(id).then(function(result){
            console.log(result);
            response.send(result);
            next();
        });
    });

    //serverside getting users from database
    router.get("/nameAndId", function (request, response, next) {
        userQueries.getAllUsersWithNameAndId()
            .then(function (allUsers) {
                var allUser = allUsers;
                // response.send(allUser);

                var jade = require('jade'), //gives abilities to use the file
                    fs = require('fs');
                fs.readFile(__dirname + '/../client-side/startbootstrap/pages/viewAllEmployee.jade', 'utf8', function (err, data) {
                    if (err) throw err;
                    var fn = jade.compile(data);
                    var html = fn({allUser: allUser}); //whenever we see "allUser" in jade file we replace it with allUser from the database
                    console.log(html);
                    response.send(html);
                });

            })
    });


    router.get("/addEmployee", function (request, response, next) {
        html = compileJade.withObject("views/addEmployee.jade", {});
        response.send(html);
    });

    router.get("/deleteEmployee", function (request, response, next) {
        html = compileJade.withObject("views/deleteEmployee.jade", {});
        response.send(html);
    });

    router.get("/postATimeCard", function (request, response, next) {
        html = compileJade.withObject("views/postATimeCard.jade", {});
        response.send(html);
    });

    router.get("/viewReimbursement", function (request, response, next) {
        var item = {id: "kdlfj", firsName: 'Alice', lastName:'Donnet'};
        html = compileJade.withArray("views/aUserTest.jade", {item: item});
        response.send(html);
    });

    router.get("/addReimbursement", function (request, response, next) {
        html = compileJade.withObject("views/addReimbursement.jade", {});
        response.send(html);
    });

    router.post("/userPostATimeCard", function (request, response, next) {
        console.log("in postATime card route")

        var firstName = request.body.firstName; // This will be changed to be retrived from a HTML page
        console.log(firstName);
        var payObject = {
            hoursWorked: parseInt(request.body.hoursWorked),
            details: request.body.details};

        console.log(payObject)
        userQueries.postTimeCard(firstName, payObject)
            .then(function (result) {
                console.log("compile html")
                html = compileJade.withObject("views/postATimeCard.jade", {});
                response.send({message:html})
            })
    });



    router.post("/addingReimbursement", function (request, response, next) {
        var firstName = request.body.firstName; // This will be changed to be retrived from a HTML page
        var payObject = {reimbursementType: request.body.reimbursementType , amount: request.body.dollarAmount, details: request.body.details};
        console.log(payObject.reimbursementType);
        userQueries.reimbursement(firstName, payObject)
            .then(function (result) {
                html = compileJade.withObject("views/addReimbursement.jade", {});
                response.send({message:html});
            })
    });


    router.get("/current/:id", function (request, response, next) {

        //var id = "56151163f9b4aa9433ce41e6"; // this needs to be replaced (just an arbitary value at the moment
        var id = request.params.id;
        console.log(id);
        var retrievedUser;

        userQueries.getUserById(id)
            .then(function (user) {
                retrievedUser = user;
                html = compileJade.withArray("views/aUser.jade", {item: retrievedUser});
                response.send(html);

            })
    });



    router.post("/mSubmitReimbursement", function (request, response, next) {
        console.log("recieved a request to submit reimbursement");
        var id = request.body.idNumber;
        var reimbursementAmount = request.body.amount;
        userQueries.addToCurrentReimbursement(id, reimbursementAmount)
            .then(function (result) {
                console.log("success or fail: " + result);
            });
        response.send({message: "Reimbursement Recieved"});
        next();
    });

    return router;
};
