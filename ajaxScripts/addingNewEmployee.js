/**
 * Created by alice_000 on 14/10/2015.
 */
$(document).ready(function(){
    console.log("in ajax script");
    $("#addNew").click(function(){
        console.log("button pressed");
        console.log(document.body);
        var data = {firstName:document.getElementsByName("firstName")[0].value,
            lastName:document.getElementsByName("lastName")[0].value,
            email:document.getElementsByName("email")[0].value};
        console.log(data);
        $.ajax({
            url: "/users/addNewUser",
            context: document.body,
            data:data,
            async: true,
            method: "POST",
            dataType: 'json'
        }).done(function(response) {
            console.log(response);
            console.log("done function");
            window.location.href = "http://localhost:8080/pages/index.html";
        }).fail(function(jqxhr, textStatus, errorThrown){
            console.log(jqxhr)
            console.log(textStatus)
            console.log(errorThrown)
        });
    });
});