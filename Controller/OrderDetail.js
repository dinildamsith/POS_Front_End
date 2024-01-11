
//All Customer Data Get
import {PlaceOrderModel} from "../Model/PlaceOrderModel.js";

function customerDataGet() {
    fetch('http://localhost:8080/pos_back_end_war_exploded/customer')
        .then(response => response.json())
        .then(data => {
            // Call the function to load customer data into the table
            customerIdsOptionSetIds(data)


        })
        .catch(error => console.error('Error fetching data:', error));
}

function customerIdsOptionSetIds(data){

    data.forEach(customer => {

        var select_element = document.getElementById("customerOrder_Id")
        var option = document.createElement("option");
        option.text =  customer.customer_Id; // Get All Item Details Item Ids Only Set Option
        select_element.appendChild(option)

    });

}

//Get All Items After call SetItemOptionSetIds Function
function getAllItems(){
    fetch('http://localhost:8080/pos_back_end_war_exploded/item')
        .then(response => response.json())
        .then(data => {

            setItemIdOptionIds(data) // Get All Item Details Send Function

        })
        .catch(error => console.error('Error fetching data:', error));
}


const setItemIdOptionIds = (data) => {
    data.forEach(item => {
        var select_element = document.getElementById("item_description_select")
        var option = document.createElement("option");
        option.text =  item.item_Name; // Get All Item Details Item Ids Only Set Option
        select_element.appendChild(option)

    });
}



// Select Item After Values set in Text Fields
$("#item_description_select").change(function () {
    var item_description = $("#item_description_select").val();


    fetch('http://localhost:8080/pos_back_end_war_exploded/item')
        .then(response => response.json())
        .then(data => {
            let foundMatch = false;

            data.forEach(item => {
                if (item_description === item.item_Name) {
                    $("#qtyOnHand").val(item.item_Qty);
                    $("#unit_price").val(item.item_Price);
                    foundMatch = true;
                }
            });

            // If no match is found, clear the text fields
            if (!foundMatch) {
                $("#qtyOnHand").val("");
                $("#unit_price").val("");
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});



/// Order Details Manage




function allOrdersSetTable(){
    fetch('http://localhost:8080/pos_back_end_war_exploded/order')
        .then(response => response.json())
        .then(data => {

            data.forEach(orderDetails => {
                    $('#mange_order_table').empty();// Customer Table Clean
                        var newRow = "<tr><th scope='row'>" + orderDetails.order_Id + "</th><td>" + orderDetails.customer_Id + "</td><td>" + orderDetails.date+ "</td></tr>";
                        $("#mange_order_table").append(newRow)
            });

        })
        .catch(error => console.error('Error fetching data:', error));
}


$("#mange_order_table").on("click", "tr", function () {
    let id = $(this).find("th");
    let data = $(this).find("td");

    $("#order_id option:selected").text(id.eq(0).text()); // Set the selected option's text
    $("#customer_id_mangeOrder").val(data.eq(0).text()); // Set the input field's value
    $("#date").text(data.eq(1).text()); // Set the text content of the h3 element
});


//Order Details Delete

$("#oderMangeDeleteBtn").on('click', () => {
    let orderId = $("#order_id").val();

    let delete_order_id_Obj = new PlaceOrderModel("", orderId);

    let deleteOrderIdJson = JSON.stringify(delete_order_id_Obj);

    const sendAJAX = (deleteItem) => {
        const http = new XMLHttpRequest();
        http.onreadystatechange = () =>{
            //Validation
            if (http.readyState == 4 && http.status == 200) {
                alert("Sucess")
            }else{
                alert("Faild")
            }
        }
        http.open("DELETE","http://localhost:8080/pos_back_end_war_exploded/order",true);
        http.setRequestHeader("Content-Type","application/json");
        http.send(deleteItem)
    }

    sendAJAX(deleteOrderIdJson)

    Swal.fire(
        'Success!',
        'Order Details Delete Successfully!',
        'success'
    )
    $('#mange_order_table').empty();

});






document.addEventListener('DOMContentLoaded', function() {
    customerDataGet();
    getAllItems();
    allOrdersSetTable();

});
