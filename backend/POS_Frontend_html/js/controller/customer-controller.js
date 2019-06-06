$(document).ready(loadAllCustomers);

function loadAllCustomers() {
    console.log("Function : loadAllCustomers");
    $("#btnUpdateCustomer").prop("disabled",true);
    var ajaxConfig = {
        method: "GET",
        url: "http://localhost:8080/api/v2/customer/",
        async: true
    };

    $.ajax(ajaxConfig).done(function (response) {
        response.forEach(function (customer) {
            var html = "<tr>" +
                "<td>" + customer.id + "</td>" +
                "<td>" + customer.name + "</td>" +
                "<td>" + customer.address + "</td>" +
                '<td class="recycle"><i class="fa fa-2x fa-trash"></i></td>' +
                '<td class="edit"><i class="fa fa-2x fa-edit"></i></td>' +
                "</tr>";

            $("#tblCustomers tbody").append(html);

            $(".recycle").off();
            $(".edit").off();
            $(".recycle").click(function () {

                var customerID = ($(this).parents("tr").find("td:first-child").text());

                if (confirm("Are you sure that you want to delete?")) {

                    $.ajax({
                        method: "DELETE",
                        url: "http://localhost:8080/api/v2/customer/" + customerID,
                        async: true
                    }).done(function (response) {
                        alert("Customer has been successfully deleted");
                        $("#tblCustomers tbody tr").remove();
                        loadAllCustomers();
                    });

                }

            });

            $(".edit").click(function () {

                var customerID = ($(this).parents("tr").find("td:first-child").text());
                var customerName = ($(this).parents("tr").find("td:first-child + td").text());
                var address = ($(this).parents("tr").find("td:first-child + td + td").text());
                $("#txtCustomerID").val(customerID);
                $("#txtCustomerName").val(customerName);
                $("#txtCustomerAddress").val(address);
                $("#btnUpdateCustomer").prop("disabled",false);
            });
        });
    });
}

$("#btnAddCustomer").click(function () {
    if(validateTextFields()){
        saveNewCustomerDetails();
    }else{
        alert("Please fill all text fields..!");
    }

});

$("#btnUpdateCustomer").click(function () {
    if(validateTextFields()){
        updateCustomerDetails();
    }else{
        alert("Please fill all text fields..!");
    }
});

$("#btnCancel").click(function () {
   clearAllTextFields()
});


function saveNewCustomerDetails() {
   // alert("save ");
   // alert("save ");
    alert("save ");
    console.log("Function 1: saveNewCustomerDetails");
    console.log("Function 2: id"+$("#txtCustomerID").val());
    var data = {
        "id": $("#txtCustomerID").val(),
        "name": $("#txtCustomerName").val(),
        "address": $("#txtCustomerAddress").val()
    };

    console.log("Function : fuck");
    console.log("Function : id"+$("#txtCustomerID").val());
    console.log("Function : name"+$("#txtCustomerName").val());
    $.ajax({
        method: "POST",
        url: "http://localhost:8080/api/v2/customer" + $("#txtCustomerID").val(),
        contentType: "application/json",
        data: JSON.stringify(data),
    }).done(function () {
        alert("Customer details successfully registered");
        $("#tblCustomers tbody tr").remove();
        loadAllCustomers();
        clearAllTextFields()
    }).fail(function () {
        alert("Something went to wrong. Please try again.");
    });
}

/*function updateCustomerDetails() {
    var data = {
        "id": $("#txtCustomerID").val(),
        "name": $("#txtCustomerName").val(),
        "address": $("#txtCustomerAddress").val()
    };

    console.log("Function : updateCustomerDetails");
    $.ajax({
        method: "POST",
        url: "http://localhost:8080/api/v1/customers11/" + $("#txtCustomerID").val(),
        contentType: "application/json",
        data: JSON.stringify(data),
    }).done(function () {
        alert("Customer details successfully updated");
        $("#tblCustomers tbody tr").remove();
        loadAllCustomers();
        clearAllTextFields()
    }).fail(function () {
        alert("Something went to wrong. Please try again.");
    });
}*/

        function updateCustomerDetails() {
            var data ={
                "id": $("#txtCustomerID").val(),
                "name": $("#txtCustomerName").val(),
                "address":$("#txtCustomerAddress").val(),
            };
            $.ajax({
                method: "POST",
                url: "http://localhost:8080/api/v2/customer/" / +$("#txtCustomerID").val(),
                contentType: "application/json",
                data: JSON.stringify(data),
            }).done(function () {
                alert("Customer update successfully")
                $("#tblCustomers tbody tr").remove();
                loadAllCustomers();
                clearAllTextFields();
            }).fail(function () {
                alert("please try again");

            });




        }


function clearAllTextFields() {
    document.getElementById('txtCustomerID').value = '';
    document.getElementById('txtCustomerName').value = '';
    document.getElementById('txtCustomerAddress').value = '';
}

function validateTextFields() {
    var customerIdText = document.getElementById("txtCustomerID").value;
    var customerNanmeText = document.getElementById("txtCustomerName").value;
    var customerAddressText = document.getElementById("txtCustomerAddress").value;

    return !(customerIdText.trim() === '' || customerNanmeText.trim() === '' || customerAddressText.trim() === '');
}