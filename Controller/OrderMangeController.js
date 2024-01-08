

$("#mange_order_table").on("click", "tr", function () {
    let id = $(this).find("th");
    let data = $(this).find("td");

    $("#order_id option:selected").text(id.eq(0).text()); // Set the selected option's text
    $("#customer_id_mangeOrder").val(data.eq(0).text()); // Set the input field's value
    $("#date").text(data.eq(1).text()); // Set the text content of the h3 element
});


$("#oderMangeDeleteBtn").on('click', () => {
    let orderId = $("#order_id").val();



    let delete_order_index = mange_order_db.findIndex(item => item.ordr_Id === orderId);
    mange_order_db.splice(delete_order_index)
    Swal.fire(
        'Success!',
        'Order Details Delete Successfully!',
        'success'
    )
    $('#mange_order_table').empty();
    clear_fields();
});

 function clear_fields() {
     $('#order_id').val("");
    $('#customer_id_mangeOrder').val('');
    $("#date").text("00-00-0000")
 }

