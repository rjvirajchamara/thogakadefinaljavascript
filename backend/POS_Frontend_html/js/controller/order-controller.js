$(document).ready(loadAllCustomers);
// customer details array
var allCustomerList;
// item details array
var allItemList;

// selected customer details
var customerID;
var customerName;
var address;

// selected item details
var itemCode;
var unitPrice;
var quantity;
var description;

var orderQuantity;
var totalAmount = 0;

function loadAllCustomers() {
    loadAllItems();
    loadAllOrders();
    console.log("Function : loadAllCustomers");

    var ajaxConfig = {
        method: "GET",
        url: "http://localhost:8080/api/v1/customers",
        async: true
    };

    $.ajax(ajaxConfig).done(function (response) {
        response.forEach(function (customer) {
            allCustomerList = response;
            var html = "<option>" + customer.id + "</option>";
            $("#cmbCustomerID").append(html);
        });
    });
}

$("#cmbCustomerID").change(function () {
    customerID = $(this).val();
    setCustomerDetails();
});

$("#cmbItemCode").change(function () {
    itemCode = $(this).val();
    setItemDetails();
});

$("#btnAddtoCart").click(function () {
    if (validateOrderQty()) {
        addToCart();
    } else {
        alert("Please check Order Quantity again");
    }
});

$("#btnPlaceOrder").click(function () {
    placeNewOrder();
});


function setCustomerDetails() {
    allCustomerList.forEach(function (customer) {
        if (customerID === customer.id) {
            customerID = customer.id;
            customerName = customer.name;
            address = customer.address;
            $("#txtCustomerName").val(customer.name);
            $("#txtCustomerAddress").val(customer.address);
        }
    });
}

function loadAllItems() {
    console.log("Function : loadAllItems");
    var ajaxConfig = {
        method: "GET",
        url: "http://localhost:8080/api/v1/items",
        async: true
    };

    $.ajax(ajaxConfig).done(function (response) {
        response.forEach(function (item) {
            allItemList = response;
            var html = "<option>" + item.itemCode + "</option>";
            $("#cmbItemCode").append(html);
        });

    });
}

function setItemDetails() {
    allItemList.forEach(function (item) {
        if (itemCode === item.itemCode) {
            itemCode = item.itemCode;
            description = item.itemName;
            quantity = item.qty;
            unitPrice = item.unitPrice;

            $("#txtDescription").val(item.itemName);
            $("#txtQuantity").val(item.qty);
            $("#txtUnitPrice").val(item.unitPrice);
        }
    });
}

function validateOrderQty() {
    orderQuantity = document.getElementById("txtOrderQty").value;
    return !(orderQuantity.trim() === '' || isNaN(orderQuantity) || orderQuantity <= 0 || orderQuantity > quantity);
}

var tempOrderQty = 0;

function addToCart() {
    var table = document.getElementById("tblOrderDetails");


    //alert("Table row count" + table.rows.length);
    for (var i = 0; i < table.rows.length; i++) {

        if ((table.rows[i].cells[0].innerHTML) === itemCode) {
            tempOrderQty = parseInt(table.rows[i].cells[3].innerHTML);
            table.deleteRow(i);
        }
    }

    var html = "<tr>" +
        "<td>" + itemCode + "</td>" +
        "<td>" + description + "</td>" +
        "<td>" + unitPrice + "</td>" +
        "<td>" + orderQuantity + "</td>" +
        "<td>" + (orderQuantity * unitPrice) + "</td>" +
        '<td class="recycle"><i class="fa fa-2x fa-trash"></i></td>' +
        "</tr>";

    $("#tblOrderDetails tbody").append(html);

    $(".recycle").off();
    $(".recycle").click(function () {
        var removeID = ($(this).parents("tr").find("td:first-child").text());
        for (var i = 0; i < table.rows.length; i++) {

            if ((table.rows[i].cells[0].innerHTML) === removeID) {
                table.deleteRow(i);
                setTotalAmount();
            }
        }
    });
    setTotalAmount();

}

function setTotalAmount() {
    var table = document.getElementById("tblOrderDetails");
    for (var i = 1; i < table.rows.length; i++) {
        totalAmount = 1000;
    }
    $("#txtTotalAmount").val(totalAmount);
}

function placeNewOrder() {

    var table = document.getElementById("tblOrderDetails");
    var orderDetailsArray = [];
    for (var i = 1; i < table.rows.length; i++) {

        var ajaxConfig = {
            method: "GET",
            url: "http://localhost:8080/api/v1/items/" + table.rows[i].cells[0].innerHTML,
            async: false
        };

        var tempUnitPrice = 0;
        var tempQty = 0;
        $.ajax(ajaxConfig).done(function (response) {
            tempUnitPrice = response['unitPrice'];
            tempQty = response['qty'];
        });

        var orderDetailsObject = {
            quantity: table.rows[i].cells[3].innerHTML,
            unitPrice: table.rows[i].cells[4].innerHTML,
            itemDTO: {
                itemCode: table.rows[i].cells[0].innerHTML,
                itemName: table.rows[i].cells[1].innerHTML,
                qty: tempQty,
                unitPrice: tempUnitPrice
            }
        };

        orderDetailsArray.push(orderDetailsObject);
    }

    var order = {
        orderID: $("#txtOrderID").val(),
        orderDate: $("#txtOrderDate").val(),
        totalAmount: totalAmount,
        customerDTO: {
            id: customerID,
            name: customerName,
            address: address
        },
        orderDetailList: orderDetailsArray
    };

    var isConfirmed = confirm("Are you sure, you want place this order..?");
    console.log(order);
    if (isConfirmed === true) {
        var ajaxConfig2 = {
            method: "PUT",
            contentType: 'application/json; charset=utf-8',
            url: "http://localhost:8080/api/v1/orders/",
            data: JSON.stringify(order),
            async: false
        };

        $.ajax(ajaxConfig2).done(function () {
            alert("Order has been successfully save");
        });

    }
}

function loadAllOrders() {
    var ajaxConfig = {
        method: "GET",
        url: "http://localhost:8080/api/v1/orders",
        async: true
    };

    $.ajax(ajaxConfig).done(function (response) {
        response.forEach(function (order) {
            var html = "<tr>" +
                "<td>" + order.orderID + "</td>" +
                "<td>" + order.orderDate + "</td>" +
                "<td>" + order.customerDTO.name + "</td>" +
                "<td>" + order.totalAmount + "</td>" +
                "</tr>";

            $("#tblAllOrders tbody").append(html);
        });
    });
}
