export class PlaceOrderModel{
    constructor(customer_id,item_description,unit_price,qty) {
        this.customerId = customer_id
        this.itemDescription = item_description;
        this.unitPrice = unit_price;
        this.qtyOrder = qty;
    }

}
