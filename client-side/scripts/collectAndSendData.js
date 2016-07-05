collectAndSendData = function(className, route){
    var newEmployeeInputs = document.getElementsByClassName(className);
    console.log(newEmployeeInputs);

    var employeeArray = Array.prototype.slice.call(newEmployeeInputs);

    var dataBaseObject = {};

    employeeArray.forEach(function (employee) {
        console.log(employee.getAttribute('name'));
        console.log(employee.value);

        dataBaseObject[employee.getAttribute('name')] = employee.value
    });

    console.log(dataBaseObject);

    $.ajax({
        url: route,
        context: document.body,
        data: dataBaseObject,
        async: true,
        method: "POST",
        dataType: 'json'
    }).done(function (response) {
        console.log(response);
        console.log("done function");
        alert("Are you sure");
        window.location.replace("/");
    }).fail(function (jqxhr, textStatus, errorThrown) {
        console.log(jqxhr);
        console.log(textStatus);
        console.log(errorThrown);
    });
};