import {OrderDetailsModel} from "../Model/OrderDetailsModel.js";

function getCustomerIds(){
    fetch('http://localhost:8080/pos_back_end_war_exploded/order')
        .then(response => response.json())
        .then(customerIds => {
            customerIdsOptionSetIds(customerIds);
        })
        .catch(error => console.error('Error fetching data:', error));
}


function getItemIds(){
    fetch('http://localhost:8080/pos_back_end_war_exploded/order')
        .then(response => response.json())
        .then(ItemIds => {
            console.log(ItemIds)
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
        option.text =  item.item_Id; // Get All Item Details Item Ids Only Set Option
        select_element.appendChild(option)

    });
}






document.addEventListener('DOMContentLoaded', function() {
   getCustomerIds();
getAllItems();
});
