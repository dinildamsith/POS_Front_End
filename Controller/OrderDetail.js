import {OrderDetailsModel} from "../Model/OrderDetailsModel.js";

function getCustomerIds(){
    fetch('http://localhost:8080/pos_back_end_war_exploded/order')
        .then(response => response.json())
        .then(customerIds => {
            customerIdsOptionSetIds(customerIds);
        })
        .catch(error => console.error('Error fetching data:', error));
}


function customerIdsOptionSetIds(customerIds){
    // place order form customer Id option set ids with customers
    var select_element = document.getElementById("customerOrder_Id");

    for (let i = 0; i < customerIds.length; i++) {
        var option = document.createElement("option");
        option.text = customerIds[i];
        select_element.appendChild(option)
    }
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

// Get All Data Set Table
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



document.addEventListener('DOMContentLoaded', function() {
   getCustomerIds();
    getAllItems();

});
