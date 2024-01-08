import {CustomerModel} from "../Model/CustomerModel.js";

// Save Customer
$("#custSaveBtn").on('click', () => {
    var customerId = $("#customerId").val();
    var customerName = $("#customer_name").val();
    var customerMail = $("#customer_mail").val();
    var customerAddress = $("#customer_Address").val();
    const genderSelect = document.getElementById('customer_Gender');
    const selectedValue = genderSelect.value;


    if (validate(customerId,'Customer Id') && validate(customerName,"Customer Name") && validate(customerMail,'Customer Mail')
        && validate(customerAddress,'Customer Address') && validate(selectedValue,"Gender")){

        let customer_Details_Object = new CustomerModel(customerId,customerName,customerMail,customerAddress,selectedValue)   //Constructor Through Data Send
        let customer_Object_Json = JSON.stringify(customer_Details_Object)

        const sendAJAX = (customerObjectJson) => {
            const http = new XMLHttpRequest();
            http.onreadystatechange = () =>{
                //Validation
                if (http.readyState == 4 && http.status == 200) {
                    alert("Sucess")
                }else{
                    alert("Faild")
                }
            }
            http.open("POST","http://localhost:8080/pos_back_end_war_exploded/customer",true);
            http.setRequestHeader("Content-Type","application/json");
            http.send(customerObjectJson)
        }

        sendAJAX(customer_Object_Json)

        Swal.fire(
            'Success!',
            'Customer Saved Successfully!',
            'success'
        )

        // reset button auto click save after
        $("#reset_btn").click();

    }
});


// Update Customer
$("#custUpdateBtn").on('click', ()=>{
    let customer_Id = $("#customerId").val();
    let customer_name = $("#customer_name").val().trim();
    let customer_mail = $('#customer_mail').val().trim();
    let customer_adress = $('#customer_Address').val().trim();
    let customer_gender = $('#customer_Gender').val().trim();


    if (validate(customer_Id,'Customer Id') && validate(customer_name,'Customer Name') && validate(customer_mail,'Customer Mail')
        && validate(customer_adress,'Customer Address') && validate(customer_gender,'Customer Gender')){
   
        let customer_Details_Object = new CustomerModel(customer_Id,customer_name,customer_mail,customer_adress,customer_gender)
        let customer_Obj_Json = JSON.stringify(customer_Details_Object);


        const sendAJAX = (customerObjectJson) => {
            const http = new XMLHttpRequest();
            http.onreadystatechange = () =>{
                //Validation
                if (http.readyState == 4 && http.status == 200) {
                    alert("Sucess")
                }else{
                    alert("Faild")
                }
            }
            http.open("PUT","http://localhost:8080/pos_back_end_war_exploded/customer",true);
            http.setRequestHeader("Content-Type","application/json");
            http.send(customerObjectJson)
        }
        sendAJAX(customer_Obj_Json)

        Swal.fire(
            'Success!',
            'Customer Update Successfully!',
            'success'
        )
    }
});


// Delete Customer
$("#custdeleteBtn").on('click',()=>{
    let customerId = $("#customerId").val();

    let customer_delet_id = {
        customer_Id : customerId
    }

    let customer_delete_json = JSON.stringify(customer_delet_id);

    const sendAJAX = (customerDeleteJson) => {
        const http = new XMLHttpRequest();
        http.onreadystatechange = () =>{
            //Validation
            if (http.readyState == 4 && http.status == 200) {
                alert("Sucess")
            }else{
                alert("Faild")
            }
        }
        http.open("DELETE","http://localhost:8080/pos_back_end_war_exploded/customer",true);
        http.setRequestHeader("Content-Type","application/json");
        http.send(customerDeleteJson)
    }
    sendAJAX(customer_delete_json)

    Swal.fire(
        'Success!',
        'Customer Delete Successfully!',
        'success'
    )


});


//All Customer Data Get
function customerDataGet() {
    fetch('http://localhost:8080/pos_back_end_war_exploded/customer')
        .then(response => response.json())
        .then(data => {
            // Call the function to load customer data into the table
            LoadCustomerData(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Get All Data Set Table
const LoadCustomerData = (data) => {
    $('#customer_Table').empty(); // Customer Table Clean

    data.forEach(customer => {

        var newRow = "<tr><th scope='row'>" + customer.customer_Id + "</th><td>" + customer.customer_Name + "</td><td>" + customer.customer_Mail + "</td><td>" + customer.customer_Address + "</td><td>" + customer.customer_Gender + "</td></tr>";
        $("#customer_Table").append(newRow);
    });
}



//row click and get values text fields
$("#customer_Table").on("click","tr", function (){
    let id = $(this).find("th");
    let data = $(this).find("td");


    $("#customerId").val(id.eq(0).text());
    $("#customer_name").val(data.eq(0).text());
    $("#customer_mail").val(data.eq(1).text());
    $("#customer_Address").val(data.eq(2).text());
    $("#customer_Gender").val(data.eq(3).text());
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



document.addEventListener('DOMContentLoaded', function() {
    customerDataGet();
});




$("#customer_Table").on("click", "tr", function() {
    $('#custSaveBtn').css('display', 'none');
    $('#custdeleteBtn').css('display','block');
    $('#custUpdateBtn').css('display','block');
});

$("#custdeleteBtn").on("click", function() {
    $('#custSaveBtn').css('display', 'block');
    $('#custdeleteBtn').css('display', 'none');
    $('#custUpdateBtn').css('display', 'none');
});
