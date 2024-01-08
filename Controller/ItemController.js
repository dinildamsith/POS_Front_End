import {ItemModel} from "../Model/ItemModel.js";

//Save Item
$("#item_save_btn").on('click', ()=>{
    var item_Id = $("#item_id_txt").val();
    var item_Name = $("#item_name_txt").val().trim();
    var item_Price = $("#item_price_txt").val().trim();
    var item_Qty = $("#item_qty_txt").val().trim();



    if (validate(item_Id,'Item Id') && validate(item_Name,'Item Description') && validate(item_Price,'Item Unit Price') && validate(item_Qty,'Item Qty')){
        let item_detail_object = new ItemModel(item_Id,item_Name,item_Price,item_Qty)

        let item_detail_Json = JSON.stringify(item_detail_object);

        const sendAJAX = (itemObjectJson) => {
            const http = new XMLHttpRequest();
            http.onreadystatechange = () =>{
                //Validation
                if (http.readyState == 4 && http.status == 200) {
                    alert("Sucess")
                }else{
                    alert("Faild")
                }
            }
            http.open("POST","http://localhost:8080/pos_back_end_war_exploded/item",true);
            http.setRequestHeader("Content-Type","application/json");
            http.send(itemObjectJson)
        }

        sendAJAX(item_detail_Json)


        Swal.fire(
            'Success!',
            'Item Saved Successfully!',
            'success'
        )
        $("#item_reset_btn").click();
    }
});



//Save Item
$("#item_update_btn").on('click', ()=>{
    var item_Id = $("#item_id_txt").val();
    var item_Name = $("#item_name_txt").val().trim();
    var item_Price = $("#item_price_txt").val().trim();
    var item_Qty = $("#item_qty_txt").val().trim();



    if (validate(item_Id,'Item Id') && validate(item_Name,'Item Description') && validate(item_Price,'Item Unit Price') && validate(item_Qty,'Item Qty')){
        let item_detail_object = new ItemModel(item_Id,item_Name,item_Price,item_Qty)

        let item_detail_Json = JSON.stringify(item_detail_object);

        const sendAJAX = (itemObjectJson) => {
            const http = new XMLHttpRequest();
            http.onreadystatechange = () =>{
                //Validation
                if (http.readyState == 4 && http.status == 200) {
                    alert("Sucess")
                }else{
                    alert("Faild")
                }
            }
            http.open("PUT","http://localhost:8080/pos_back_end_war_exploded/item",true);
            http.setRequestHeader("Content-Type","application/json");
            http.send(itemObjectJson)
        }

        sendAJAX(item_detail_Json)


        Swal.fire(
            'Success!',
            'Item Update Successfully!',
            'success'
        )
        $("#item_reset_btn").click();
    }
});


//Save Item
$("#item_delete_btn").on('click', ()=>{
    var item_Id = $("#item_id_txt").val();


    if (validate(item_Id,'Item Id')){
        let item_detail_object = new ItemModel(item_Id)

        let item_detail_Json = JSON.stringify(item_detail_object);

        const sendAJAX = (itemObjectJson) => {
            const http = new XMLHttpRequest();
            http.onreadystatechange = () =>{
                //Validation
                if (http.readyState == 4 && http.status == 200) {
                    alert("Sucess")
                }else{
                    alert("Faild")
                }
            }
            http.open("DELETE","http://localhost:8080/pos_back_end_war_exploded/item",true);
            http.setRequestHeader("Content-Type","application/json");
            http.send(itemObjectJson)
        }

        sendAJAX(item_detail_Json)


        Swal.fire(
            'Success!',
            'Item Delete Successfully!',
            'success'
        )
        $("#item_reset_btn").click();
    }
});

$("#item_table").on("click", "tr", function() {
    $('#item_save_btn').css('display', 'none');
    $('#item_delete_btn').css('display','block');
    $('#item_update_btn').css('display','block');
});


//row click and get values text fields
$("#item_table").on("click","tr",function (){
    let id = $(this).find("th");
    let data = $(this).find("td");

    $("#item_id_txt").val(id.eq(0).text());
    $("#item_name_txt").val(data.eq(0).text());
    $("#item_price_txt").val(data.eq(1).text());
    $("#item_qty_txt").val(data.eq(2).text());
})




//Get All Items
function getAllItems(){
    fetch('http://localhost:8080/pos_back_end_war_exploded/item')
        .then(response => response.json())
        .then(data => {
            // Call the function to load customer data into the table
            LoadItemData(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Get All Data Set Table
const LoadItemData = (data) => {
    $('#item_table').empty(); // Customer Table Clean

    data.forEach(item => {

        var newRow = "<tr><th scope='row'>" + item.item_Id + "</th><td>" + item.item_Name+ "</td><td>" + item.item_Price + "</td><td>" + item.item_Qty + "</td></tr>";
        $("#item_table").append(newRow);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    getAllItems();
});






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