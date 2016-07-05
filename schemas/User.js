"use strict";
/*jslint node: true */
module.exports = function (mongoose) {
    var userSchema = mongoose.Schema({
        username: {type: String, default: ""},
        password: {type: String, default: ""},
        firstName: {type: String},
        lastName: {type: String},
        title: {type: String, default: "N/A"},
        gender: {type: String, default: "N/A"},
        dateOfBirth: {type: Date, default: new Date(0)},
        contactNumber: {type: String, default: "N/A"},
        mineSite: {type: String, default: "Castle Hill"},
        email: {type: String, default: "N/A"},
        residentialAddress: {type: String, default: "N/A"},
        postalAddress: {type: String, default: "N/A"},
        payType: {type: String, default: "salary"},
        payment: {

            payRate: {type: Number, default: 0},
            payMethod: {type: String, default: "electronic"}
        },
        timeCard: {hoursWorked: {type: Number, default: 0},
            details: {type: String, default:"N/A"}
        },
        reimbursements: {reimbursementType: {type: String, default: "transport"},
            amount: {type: Number, default: 0},
            details: {type: String, default:"N/A"}
        },
        totalReimburse: {type: Number, default: 0},
        payHistory: [{
            date: {type: Date, default: Date(0)},
            payRate: {type: Number, default: 0},
            hours: {type: Number, default: 0},
            totalAmount: {type: Number, default: 0},
            reimburse: {type: Number, default: 0},
            deductions: {type: Number, default: 0},
            netAmount: {type: Number, default: 0}
        }],
        totalPay: {type: Number, default: 0},
        union: {
            name: {type: String, default: "n/a"},
            contribution: {type: Number, default: 0}
        },
        nextPay: {type: Date, default: Date(0)}
    });
    return mongoose.model("User", userSchema);
};