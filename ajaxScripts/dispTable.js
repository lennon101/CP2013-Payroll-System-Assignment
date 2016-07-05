/**
 * Created by alice_000 on 13/10/2015.
 */

$(document).ready(function(){

    var viewContainer2 = document.getElementById("otherInformation");

    $("btn1").click(function(){
        console.log("button pressed");
        $.ajax({
            url: "/nameAndId",
            context: document.body
        }).done(function(response) {
            viewContainer2.innerHTML = response.toString();

        });
    });

});
