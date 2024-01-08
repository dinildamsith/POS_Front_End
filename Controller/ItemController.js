
//Save Item
$("#item_save_btn").on('click', ()=>{
    var item_id = $("#item_id_txt").val();
    var item_description = $("#item_name_txt").val().trim();
    var item_unitPrice = $("#item_price_txt").val().trim();
    var item_qty = $("#item_qty_txt").val().trim();


    if (validate(item_id,'Item Id') && validate(item_description,'Item Description') && validate(item_unitPrice,'Item Unit Price') && validate(item_qty,'Item Qty')){
        let item_detail_object = new ItemModel(item_id,item_description,item_unitPrice,item_qty)
        item_db.push(item_detail_object)
        Swal.fire(
            'Success!',
            'Item Saved Successfully!',
            'success'
        )

        LoadItemTable();

        $("#item_reset_btn").click();
    }


    //Order Form Item select field set items
    const selectElement = document.getElementById("item_description_select");

    // An array of item names
    var index = 0;
    const itemNames = [];
    itemNames[index] = item_description;
    index++;


    // Loop through the item names and create an option for each one
    itemNames.forEach(itemName => {
        const option = document.createElement("option");
        option.text = itemName;
        // If you want to assign a value to each option, you can do so using option.value
        // option.value = itemName;
        selectElement.appendChild(option);
    });

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

//update Item
$("#item_update_btn").on('click', ()=>{
    var item_id = $("#item_id_txt").val();
    var item_description = $("#item_name_txt").val().trim();
    var item_price = $("#item_price_txt").val().trim();
    var item_qty = $("#item_qty_txt").val().trim()


    if (validate(item_id,'Item Id') && validate(item_description,'Item Description') && validate(item_price,'Item Price')
        && validate(item_qty,'Item Qty')){

        let item_detail_object = new ItemModel(item_id,item_description,item_price,item_qty)

        let update_item_index = item_db.findIndex(item => item.item_Id === item_id);
        item_db[update_item_index] = item_detail_object;
        Swal.fire(
            'Success!',
            'Item Update Successfully!',
            'success'
        )

      

        LoadItemTable();
        $("#item_reset_btn").click();
    }

});

//Delete Item
$("#item_delete_btn").on('click',()=>{
    let item_id = $("#item_id_txt").val();


    let delete_item_index = item_db.findIndex(item => item.item_Id === item_id);
    item_db.splice(delete_item_index ,1);
    Swal.fire(
        'Success!',
        'Item Delete Successfully!',
        'success'
    )



    LoadItemTable();
    $("#item_reset_btn").click();
});


//Search Item...
$('#item_search_btn').on('click', () =>{
    var itemId = $('#item_search_Txt').val();

    let search_Item_Index = item_db.findIndex(item => item.item_Id === itemId);

    $('#item_table').empty();

    var newRow = "<tr><th scope='row'>" + item_db[search_Item_Index].item_Id + "</th><td>" + item_db[search_Item_Index].item_Description + "</td><td>" + item_db[search_Item_Index].item_UnitPrice + "</td><td>" + item_db[search_Item_Index].item_Qty +  "</td></tr>";
    $('#item_table').append(newRow);
})

$('#item_search_Txt').on('click', () =>{
    LoadItemTable();
})



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


