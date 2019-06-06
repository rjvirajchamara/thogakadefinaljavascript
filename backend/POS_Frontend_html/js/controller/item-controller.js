//$(document).ready(loadAllItems);
$(document).ready(loadAllItems);

function loadAllItems() {
    console.log("Function : loadAllItems");
    $("#btnUpdateItem").prop("disabled",true);
    var ajaxConfig = {
        method: "GET",
        url: "http://localhost:8080/api/v1/items",
        async: true
    };

    $.ajax(ajaxConfig).done(function (response) {
        response.forEach(function (item) {
            var html = "<tr>" +
                "<td>" + item.itemCode + "</td>" +
                "<td>" + item.itemName + "</td>" +
                "<td>" + item.qty + "</td>" +
                "<td>" + item.unitPrice + "</td>" +
                '<td class="recycle"><i class="fa fa-2x fa-trash"></i></td>' +
                '<td class="edit"><i class="fa fa-2x fa-edit"></i></td>' +
                "</tr>";

            $("#tblItems tbody").append(html);

            $(".recycle").off();
            $(".edit").off();
            $(".recycle").click(function () {

                var itemCode = ($(this).parents("tr").find("td:first-child").text());

                if (confirm("Are you sure that you want to delete?")) {

                    $.ajax({
                        method: "DELETE",
                        url: "http://localhost:8080/api/v1/items/" + itemCode,
                        async: true
                    }).done(function (response) {
                        alert("Item has been successfully deleted");
                        $("#tblItems tbody tr").remove();
                        loadAllItems();
                    });

                }

            });

            $(".edit").click(function () {
                    var itemCode = ($(this).parents("tr").find("td:first-child+td").text()) ;
              //  var itemCode = ($(this).parents("tr").find("td:first-child").text());
                var itemName = ($(this).parents("tr").find("td:first-child + td").text());
                var qty = ($(this).parents("tr").find("td:first-child + td + td").text());
                var unitPrice = ($(this).parents("tr").find("td:first-child + td + td + td").text());
                $("#txtItemCode").val(itemCode);
                $("#txtDescription").val(itemName);
                $("#txtQuantity").val(qty);
                $("#txtUnitPrice").val(unitPrice);
                $("#btnUpdateItem").prop("disabled",false);
            });
        });
    });
}

$("#btnAddItem").click(function () {
    if(validateTextFields()){
        saveNewItemDetails();
    }else{
        alert("Please fill all text fields..!");
    }

});

$("#btnUpdateItem").click(function () {
    if(validateTextFields()){
        updateItemDetails();
    }else{
        alert("Please fill all text fields..!");
    }
});

$("#btnCancel").click(function () {
    clearAllTextFields()
});


function saveNewItemDetails() {

    var data = {
        "id": $("#txtItemCode").val(),
        "description": $("#txtDescription").val(),
        "qty": $("#txtQuantity").val(),
        "unitPrice": $("#txtUnitPrice").val()
    };

    console.log("Function : saveNewItemDetails");
    console.log("Function : saveNewItemDetails12");
    $.ajax({
        method: "POST",
        url: "http://localhost:8080/api/v1/items/" + $("#txtItemCode").val(),
        contentType: "application/json",
        data: JSON.stringify(data),
    }).done(function () {
        alert("Item details successfully registered");
        $("#tblItems tbody tr").remove();
        loadAllItems();
        clearAllTextFields()
    }).fail(function () {
        alert("Something went to wrong. Please try again.");
    });
}

function updateItemDetails() {
    var data = {
        "itemCode": $("#txtItemCode").val(),
        "itemName": $("#txtDescription").val(),
        "qty": $("#txtQuantity").val(),
        "unitPrice": $("#txtUnitPrice").val()
    };

    console.log("Function : updateItemDetails");
    $.ajax({
        method: "POST",
        url: "http://localhost:8080/api/v1/items/" + $("#txtItemCode").val(),
        contentType: "application/json",
        data: JSON.stringify(data),
    }).done(function () {
        alert("Item details successfully updated");
        $("#tblItems tbody tr").remove();
        loadAllItems();
        clearAllTextFields()
    }).fail(function () {
        alert("Something went to wrong. Please try again.");
    });
}

function clearAllTextFields() {
    document.getElementById('txtItemCode').value = '';
    document.getElementById('txtDescription').value = '';
    document.getElementById('txtQuantity').value = '';
    document.getElementById('txtUnitPrice').value = '';
}

function validateTextFields() {
    var itemCodeText = document.getElementById("txtItemCode").value;
    var descriptionText = document.getElementById("txtDescription").value;
    var qtyText = document.getElementById("txtQuantity").value;
    var unitPrice = document.getElementById("txtUnitPrice").value;

    return !(itemCodeText.trim() === '' || descriptionText.trim() === '' || qtyText.trim() === '' || unitPrice.trim() === '');
}