/**
 * Created by Luke on 9/15/2015.
 */
/*jslint node: true, mocha: true */
"use strict";
var assert = require("chai").assert;
var http   = require("http");

// Test server connection
it("should return a 200 response", function (done) {
    http.get("http://localhost:8080", function (res) {
        assert.equal(res.statusCode, 200);
        done();
    });
});