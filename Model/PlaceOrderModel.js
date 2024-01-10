export class PlaceOrderModel{
    constructor(customerId,order_id,date,item_description,qty,total) {
        this.customer_Id = customerId;
        this.order_Id = order_id;
        this.date = date;
        this.item_Name = item_description;
        this.qty = qty;
        this.total = total;

    }

}
