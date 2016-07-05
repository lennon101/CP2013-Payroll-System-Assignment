// Enable jsLint and strict mode for better programming style
/*jslint node: true */
"use strict";

var Promise = require("bluebird");
var userQueries =  {
    insertSingleUser : function(userData){
        var newUser = this.User(userData);
        return new Promise(function(resolve, reject){
            newUser.save(function(err){
                if(err){
                    reject("f");
                } else {
                    resolve("s");
                }
            });
        });
    },
    getUserById : function(id){
        var dbUser = this.User;
        return new Promise(function(resolve, reject){
            dbUser.findById(id, function(err, retrievedUser){
                if (err){
                    console.log(err);
                    reject("f");
                } else {
                    resolve(retrievedUser);
                }

            });
        });
    },
    getUsersByFirstName : function(firstName){
        var dbUser = this.User;
        var queryRefinement = {firstName: firstName};
        return new Promise(function(resolve, reject){
            dbUser.find(queryRefinement, function(err, users){
                if (err){
                    reject("f");
                } else {
                    resolve(users);
                }
            });
        });
    },
    getUserLastName : function(lastName){
        var dbUser = this.User;
        return new Promise(function(resolve, reject){
            dbUser.find(lastName, function(err, retrievedUser){
                if (err){
                    console.log(err);
                    reject("f");
                } else {
                    resolve(retrievedUser);
                }

            });
        });
    },
    deleteUserById : function(id){
        var dbUser = this.User;
        return new Promise(function(resolve, reject){
            dbUser.findById(id).remove(function(err){
                if (err){
                    reject("f");
                } else {
                    resolve("s");
                }
            });
        });
    },
    getPaymentById : function(id){
        var dbUser = this.User;
        return new Promise(function(resolve, reject){
            dbUser.findOne({_id: id}, {payment: 1}, function(err, userPayment){
                if (err){
                    reject("f");
                } else {
                    resolve(userPayment);
                }
            });
        });
    },
    updatePaymentById : function(id, payment){
        var dbUser = this.User;
        var paymentObject = {};
        for (var key in payment){
            if(payment.hasOwnProperty(key)){
                paymentObject["payment."+key] = payment[key];
            }
        }
        return new Promise(function(resolve, reject){
            dbUser.findOneAndUpdate({_id: id}, {$set: paymentObject}, function(err, user){
                if (err){
                    reject("f");
                } else {
                    resolve("s");
                }
            });
        });
    },
    postTimeCard : function(firstName, payment){
        var dbUser = this.User;
        var paymentObject = {};
        for (var key in payment){
            if(payment.hasOwnProperty(key)){
                paymentObject["timeCard."+key] = payment[key];
            }
        }
        return new Promise(function(resolve, reject){
            dbUser.findOneAndUpdate({firstName: firstName}, {$set: paymentObject}, function(err, user){
                if (err){
                    reject("f");
                } else {
                    resolve("s");
                }
            });
        });
    },
    reimbursement : function(firstName, payment){
        var dbUser = this.User;
        var paymentObject = {};
        for (var key in payment){
            if(payment.hasOwnProperty(key)){
                paymentObject["reimbursements."+key] = payment[key];
            }
        }
        return new Promise(function(resolve, reject){
            dbUser.findOneAndUpdate({firstName: firstName}, {$set: paymentObject}, function(err, user){
                if (err){
                    reject("f");
                } else {
                    resolve("s");
                }
            });
        });
    },
    addToPayHistory : function(id, latestPay){
        var dbUser = this.User;
        return new Promise(function(resolve, reject){
            dbUser.findOneAndUpdate({_id: id}, {$push: {payHistory: latestPay}}, function(err, user){
                if (err){
                    reject("f");
                } else {
                    resolve("s");
                }
            });
        });
    },
    getAllUsersWithNameAndId : function(){
        var dbUser = this.User;
        return new Promise(function(resolve, reject){
            dbUser.find({}, {firstName : 1, lastName: 1}, function(err, users){
                if(err){
                    reject("f");
                } else {
                    resolve(users);
                }
            });
        });
    },
    addToCurrentReimbursement : function(id, latestReimbursement){
        var dbUser = this.User;
        return new Promise(function(reject, resolve){
            dbUser.findByIdAndUpdate(id, {$inc: {totalReimburse: latestReimbursement}}, function(err){
                if (err){
                    reject("f")
                } else {
                    resolve("s");
                }
            })
        })
    }
};

module.exports = function(User){
    userQueries.User = User;
    return userQueries;
};