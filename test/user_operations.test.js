/**
 * Created by Luke on 10/1/2015.
 */
/*jslint node: true, mocha: true */
"use strict";
var assert = require("chai").assert;
var should = require("should");
var mongoose = require("mongoose");
mongoose.connect("mongodb://hello_world:catinahat_1@ds049898.mongolab.com:49898/payroll_db");
var UserModel = require("../schemas/User")(mongoose);
var userQueriesTest;

beforeEach(function() {
    userQueriesTest = require("../db_queries/user_queries")(UserModel);
});

describe("#insertSingleUser", function(){
    this.timeout(30000);
    it("should create a new User", function(done){
        var mockUser = {
            firstName: "Long",
            lastName: "schlong",
            contactNumber: "2323934",
            email: "ayebalawannem@yoloswaq.edu.au"
        };
        userQueriesTest.insertSingleUser(mockUser)
            .then(function(result){
                assert.strictEqual(result, "s", " s = success");
                done();
            })
            .catch(done);
    });
});

describe("#getUserById", function (){
    this.timeout(10000);
    it("should get a user by ID", function(done){
        var id = "5615077b55cdb1b82b3a852f";
        var retrievedUser;
        userQueriesTest.getUserById(id)
            .then(function(user){
                retrievedUser = user;
                console.log(id + " === " + retrievedUser.id);
                retrievedUser.id.should.equal(id);
                done();
            })
            .catch(done);
    });
});

describe("#getUsersByFirstName", function(){
    this.timeout(10000);
    it("should get all the users with the specified firstName", function(done){
        var firstName = "Charlie";
        userQueriesTest.getUsersByFirstName(firstName)
            .then(function(users){
                for(var i = 0; i < users.length; ++i){
                    var user = users[i];
                    user.firstName.should.equal(firstName);
                }
                done();
            });

    });
});

describe("#deleteUserById", function(){
    this.timeout(30000);
    it("should delete a user based on the produced ID", function(done){
        var id = "560ba1fd0e9a8a18335fcc7d";
        userQueriesTest.deleteUserById(id)
            .then(function(result){
                assert.strictEqual(result, "s", "Returns true if successful");
                done();
            });
    });
});

describe("#getPaymentById", function(){
    this.timeout(2000);
    it("should only return a payment object of a specified user and the relevent fields", function(done){
        var id = "5615077b55cdb1b82b3a852f";
        userQueriesTest.getPaymentById(id)
            .then(function(userPayment){
                console.log(userPayment);
                should(userPayment.payment).have.property("payRate");
                should(userPayment.payment).have.property("payType");
                should(userPayment.payment).have.property("payMethod");
                done();
            })
            .catch(done);
    });
});

describe("#updatePaymentById", function(){
    this.timeout(2000);
    it("should update the fields for the payment for the week", function(done){
        var id = "56150ab7de136a5424b111f1";
        var payObject = {payMethod : "Post", payRate: 45.8};
        userQueriesTest.updatePaymentById(id, payObject)
            .then(function(result){
                assert.strictEqual(result, "s", " s = success");
                done();
            })
            .catch();
    });
});

describe("#addToPayHistory", function(){
    this.timeout(2000);
    it("should add to an existing array of a user's pay history", function(done){
        var id = "5615077b55cdb1b82b3a852f";
        var latestPay = {date: new Date(),
        payRate: 22.3,
        hours: 10,
        totalAmount: 223,
        reimburse: 50,
        deductions: 25,
        netAmount: 248};
        userQueriesTest.addToPayHistory(id, latestPay)
            .then(function(result){
                assert.strictEqual(result, "s", "s = success");
                done();
            })
            .catch(done);
    });
});

describe("#getAllUsersWithNameAndId", function(){
    this.timeout(10000);
    it("Should return all users with only the ID, first and last name:", function(done){
        userQueriesTest.getAllUsersWithNameAndId()
            .then(function(allUsers){
                var singleUser = allUsers[0];
                singleUser.should.have.property("id");
                singleUser.should.have.property("firstName");
                singleUser.should.have.property("lastName");
                should.not.exist(singleUser.contactNumber);
                done();
            })
            .catch(done);
    });
});