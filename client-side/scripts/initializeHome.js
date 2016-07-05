(function () {
    window.onload = function () {
        var viewAllEmployeeNavButton = document.getElementById("viewAllEmployees");

        var addEmployeeNavBarItem = document.getElementById("addEmployee");
        var addEmployeeDashBoardItem = document.getElementById("addEmployeeDashBoardItem");

        var deleteEmployeeNavBarItem = document.getElementById("deleteEmployee");
        var deleteEmployeeDashBoardItem = document.getElementById("deleteEmployeeDashBoardItem");

        var viewEmployeeButton = document.getElementById("viewEmployee");
        var viewAllEmployeeDashBoardItem = document.getElementById("viewAllEmployeeDashBoardItem");

        var pageWrapper = document.getElementById("page-wrapper");
        var addReimbursementButton = document.getElementById("addReimbursement");

        var postATimeCardNavBarItem = document.getElementById("postATimeCard");
        var postATimeCardDashboardItem = document.getElementById("postATimeCardDashboardItem");

        var viewReimbursementButton = document.getElementById("viewReimbursement");



        //navbar onClick listener
        addEmployeeNavBarItem.onclick = function () {
            console.log("Clicked on the nav item");
            var request = new XMLHttpRequest();
            request.open("GET", "/users/addEmployee");
            request.onload = function () {
                var data = request.responseText;
                pageWrapper.innerHTML = data;

                $("#datepicker").datepicker();
                console.log("should be loaded");
                var addNewEmployeeButton = document.getElementById("addNewEmployeeButton");
                addNewEmployeeButton.onclick = function () {

                    alert("Are you sure");
                    collectAndSendData("addEmployee", "/users/addNewUser");
                };
            };
            request.send();
        };


        //Dashboard onClick listener
        addEmployeeDashBoardItem.onclick = function () {
            console.log("Clicked on the nav item");
            var request = new XMLHttpRequest();
            request.open("GET", "/users/addEmployee");
            request.onload = function () {
                var data = request.responseText;
                pageWrapper.innerHTML = data;
                $("#datepicker").datepicker();
                console.log("should be loaded");
                var addNewEmployeeButton = document.getElementById("addNewEmployeeButton");
                addNewEmployeeButton.onclick = function () {
                    alert("Are you sure");
                    collectAndSendData("addEmployee", "/users/addNewUser");
                };
            };
            request.send();
        };


        //Button listeners
        deleteEmployeeNavBarItem.onclick = function () {
            console.log("Clicked on the deleteEmployee nav item");
            console.log("Clicked on the deleteEmployee nav item");
            var request = new XMLHttpRequest();
            request.open("GET", "/users/deleteEmployee");
            request.onload = function () {
                var data = request.responseText;
                pageWrapper.innerHTML = data;
                var deleteEmployeeButton = document.getElementById("deleteEmployeeButton");
                deleteEmployeeButton.onclick = function () {
                    alert("Are you sure");
                    collectAndSendData("employeeID", "/users/deleteById");
                };
            };
            request.send()
        };

        //Button listeners
        deleteEmployeeDashBoardItem.onclick = function () {
            console.log("Clicked on the deleteEmployee nav item");
            console.log("Clicked on the deleteEmployee nav item");
            var request = new XMLHttpRequest();
            request.open("GET", "/users/deleteEmployee");
            request.onload = function () {
                var data = request.responseText;
                pageWrapper.innerHTML = data;
                var deleteEmployeeButton = document.getElementById("deleteEmployeeButton");
                deleteEmployeeButton.onclick = function () {
                    alert("Are you sure");
                    collectAndSendData("employeeID", "/users/deleteById");
                };
            };
            request.send()
        };

        //navbar listener
        postATimeCardNavBarItem.onclick = function () {
            console.log("clicked on navBar item");
            var request = new XMLHttpRequest();
            console.log("about to go to route");
            request.open("GET", "/users/postATimeCard");
            request.onload = function () {
                var data = request.responseText;
                pageWrapper.innerHTML = data;
                console.log("should be loaded");
                var postingTimeCardButton = document.getElementById("postingATimeCard");
                postingTimeCardButton.onclick = function () {
                    alert("Are you sure");
                    collectAndSendData("postATimeCard", "/users/userPostATimeCard");
                };
            };
            request.send()
        };

        //Dashboard listener
        postATimeCardDashboardItem.onclick = function () {
            console.log("clicked on navBar item");
            var request = new XMLHttpRequest();
            console.log("about to go to route");
            request.open("GET", "/users/postATimeCard");
            request.onload = function () {
                var data = request.responseText;
                pageWrapper.innerHTML = data;
                console.log("should be loaded");
                var postingTimeCardButton = document.getElementById("postingATimeCard");
                postingTimeCardButton.onclick = function () {
                    alert("Are you sure");
                    collectAndSendData("postATimeCard", "/users/userPostATimeCard");
                };
            };
            request.send()
        };


        //nav bar listener
        viewAllEmployeeNavButton.onclick = function () {
            var request = new XMLHttpRequest();
            request.open("GET", "/getEmployees");
            request.onload = function () {
                var data = request.responseText;
                pageWrapper.innerHTML = data;
                console.log("should be loaded");
                var findAndViewButton = document.getElementById("findAndView");
                findAndViewButton.onclick = function () {
                    console.log("find button pressed");
                    alert("Are you sure");
                    collectAndSendData("viewAndFind", "/users/firstName");
                    alert("Are you sure");
                    console.log("view from list")

                };
            };
            request.send()
        };

        //dashboard listener
        viewAllEmployeeDashBoardItem.onclick = function () {
            var request = new XMLHttpRequest();
            request.open("GET", "/getEmployees");
            request.onload = function () {
                var data = request.responseText;
                pageWrapper.innerHTML = data;
                console.log("should be loaded");
                var findAndViewButton = document.getElementById("findAndView");
                findAndViewButton.onclick = function () {
                    console.log("find button pressed");
                    alert("Are you sure");
                    collectAndSendData("viewAndFind", "/users/firstName");
                    alert("Are you sure");
                    console.log("view from list")

                };
            };
            request.send()
        };


        //Button listeners
        addReimbursementButton.onclick = function () {
            var request = new XMLHttpRequest();
            request.open("GET", "/users/addReimbursement");
            request.onload = function () {
                var data = request.responseText;
                pageWrapper.innerHTML = data;
                console.log("should be loaded");
                var reimburseButton = document.getElementById("reimburse");
                reimburseButton.onclick = function () {

                    collectAndSendData("reimburse", "/users/addingReimbursement");
                };
            };
            request.send()
        };


        //Button listeners
     /*   deleteEmployeeButton.onclick = function () {
            var request = new XMLHttpRequest();
            request.open("GET", "/users/deleteEmployee");
            request.onload = function () {
                var data = request.responseText;
                pageWrapper.innerHTML = data;
            };
            request.send()
        };*/

        //Button listeners
        viewEmployeeButton.onclick = function () {
            console.log("seeing table")
            var request = new XMLHttpRequest();
            request.open("GET", "/users/viewEmployee");
            request.onload = function () {
                var data = request.responseText;
                pageWrapper.innerHTML = data;
            };
            request.send()
        }





        //Button listeners
        viewReimbursementButton.onclick = function () {
            var request = new XMLHttpRequest();
            request.open("GET", "/users/viewReimbursement");

            request.onload = function () {
                var data = request.responseText;
                pageWrapper.innerHTML = data;
            };
            request.send()
        }

    }
})();