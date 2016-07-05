/**
 * Created by Luke on 10/25/2015.
 */
module.exports = function (User) {
    var express = require("express");
    var router = express.Router();
    var userQueries = require("../db_queries/user_queries")(User);
    var compileJade = require("../custom_modules/compileJadeFile");

    router.get("/getEmployees", function (request, response, next) {
        userQueries.getAllUsersWithNameAndId()
            .then(function(allUsers){
                //console.log(allUsers);
                var html  = compileJade.withArray("views/table.jade", {allUser:allUsers});
                response.send(html);
            })
    });





    return router;
};