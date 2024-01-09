


const LoadMangeOrderData = () =>{
    $('#mange_order_table').empty();// Customer Table Clean
    mange_order_db.map((item,index) =>{
        var newRow = "<tr><th scope='row'>" + item.ordr_Id + "</th><td>" + item.customer_Id + "</td><td>" + item.date + "</td></tr>";
        $("#mange_order_table").append(newRow)
    })
}
const LoadItemTable = () =>{
    $('#item_table').empty();
    item_db.map((item,index) =>{
        var newRow = "<tr><th scope='row'>" + item.item_Id + "</th><td>" + item.item_Description + "</td><td>" + item.item_UnitPrice + "</td><td>" + item.item_Qty +  "</td></tr>";
        $("#item_table").append(newRow)
    })
}
function clearItemSection() {
    $("#item_description_select").val('select the item');
    $("#qtyOnHand").val('');
    $("#qty").val('');
    $("#unit_price").val('');

}



// Define total in a broader scope
// Initialize the total as a number
var total = 0;



$("#cart_btn").on('click', () => {

    var item_description = $("#item_description_select").val();
    var unit_price = parseFloat($("#unit_price").val());
    var qty = parseInt($("#qty").val());


    if (validate(item_description,'Item Description') && validate(unit_price,'Unit Price') && validate(qty,'Qty')){
        var newRow = "<tr><th scope='row'>" + item_description + "</th><td>" + unit_price + "</td><td>" + qty + "</td></tr>";
        $("#cart_table").append(newRow);
        clearItemSection();
    }

    // Update the total
    total += unit_price * qty;
    document.getElementById("order_total").textContent = total; // Update the content of the "order_total" element


    // Cart Add item After Item Table Qty Update
    let updateItemQtyIndex = item_db.findIndex(item => item.item_Description === item_description);
    let qtyOnHand = item_db[updateItemQtyIndex].item_Qty
    var updatedItemQty = qtyOnHand - qty;

    item_db[updateItemQtyIndex].item_Qty = updatedItemQty;
    LoadItemTable();




});



var cashInput = document.getElementById("cash");// Get the input element with the id "cash"


cashInput.addEventListener("input", (event) => {// Add an input event listener to the input element
    let cash = parseFloat($("#cash").val()); // Parse the cash value as a float

    let balance = cash - total;
    console.log(balance);

    // Update the content of the "balance" element
    $("#balance").val(balance);
});



$("#place_order_btn").on('click', () => {

    // Order Mange Table set Data
    var order_id = document.getElementById("orderId").textContent
    var customer_id = $("#customerOrder_Id").val();
    var order_date = document.getElementById("order_Date").textContent


    if (validate(customer_id,'Customer Id')){
        let orderMange_details = new OrderDetailsModel(order_id,customer_id,order_date);

        mange_order_db.push(orderMange_details);
        LoadMangeOrderData();
        Swal.fire(
            'Success!',
            'Order Place Successfully!',
            'success'
        )
        $("#cart_table").empty();
        clear_fields();
    }



    ///////////////////////// Order Id Generated /////////////////////////////

    // Get the current order ID
    var currentOrderId = $("#orderId").text();

    // Convert the current order ID to a number
    var currentOrderNumber = parseInt(currentOrderId, 10);

    // Increment the number
    var newOrderNumber = currentOrderNumber + 1;

    // Convert it back to a string with leading zeros (e.g., 001)
    var newOrderId = String(newOrderNumber).padStart(currentOrderId.length, '0');

    $("#orderId").text(newOrderId);

});



//  Item Select After Values set in Text Fields

// $("#item_description_select").change(function() {
//     var item_description = $("#item_description_select").val();
//
//     let find_item = item_db.findIndex(item => item.item_Description === item_description);
//
//     if (find_item !== -1) {
//         $("#qtyOnHand").val(item_db[find_item].item_Qty);
//         $("#unit_price").val(item_db[find_item].item_UnitPrice);
//     } else {
//         // Handle the case where the item is not found
//         // For example, clear the input fields or display an error message.
//         $("#qtyOnHand").val("");
//         $("#unit_price").val("");
//     }
// });


// Current Date Set

var currentDate = new Date();
var year = currentDate.getFullYear();
var month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
var day = currentDate.getDate();

$("#order_Date").text(year + "-" + month + "-" + day + " ")




function validate(value, field_name){
    if (!value){
        Swal.fire({
            icon: 'warning',
            title: `Please enter the ${field_name}!`
        });
        return false;
    }
    return true;
}

function clear_fields() {
    $('#customerOrder_Id').val("");
    $('#cash').val('');
    $("#balance").val("")
}
















