$(document).ready(loadAllCustomers);

function allCustomer() {

    var ajaxConfig ={
        method:"get",
        url: "http://localhost:8080/api/v1/Customer",
        async:true
    };
    $.ajax(ajaxConfig).done(function (response) {
        response.forEach(function (customer) {
            var html="<tr>"+
                "<td>"+ customer.id+"</td>"+
                "<td>"+customer.name + "</td>"+
                "<td>"+customer.address+"</td>"+
                '<td class="reclebin"><i class="fa fa-2x fa-trash"></i></td>'+
                '<td class="edit"><i class="fa fa-2x fa-edit"></i></td>'+"</tr>"


                var customerID = ($(this).parent().find("td:first-child").text());

            if(confirm("are you sure want to delete")){
                $.ajax({
                    method:"DELETE",
                    url:"http://8080/api/v1/customer"+customerID,
                    async: true,
                }).done(function () {
                    alert("customer has been deleted")
                    $("#tblCustomers tbody tr").remove();
                })
            }

            
        })
        
    })


}





function saveCustomer() {

    var date = {
        "id": $("#txtCustomerID").val(),
        "name":$("#txtCustomerName").val(),
        "address":$("#txtCustomerAddress").val(),

    };
    $.ajax({
        method: "post",
        url: "http://localhost:8080/api/v1/customer" /+ $("#txtCustomerID").val(),
        contentType: "application/json",
        data: JSON.stringify(date),
    }).done(function () {
        alert("user save");
    }).fail(function () {
        alert("not save")
    })


 function updateCustomer() {

        var date= {
            "id": $("#txtCustomerID").val(),
            "name": $("#txtCustomerName").val(),
            "address": $("#txtCustomerAddress").val(),
        };
        $.ajax({
            method:"get",
            url:"http://localhost:8080/api/v1/customer"/+$("#txtCustomerID").val(),
            contentType: "application/json",
            date:JSON.stringify(date),
        }).done(function () {
            alert("save customer")

        }).fail(function () {
            alert("not save")

        })


     }






    
}