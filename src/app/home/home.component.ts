import { Component, OnInit } from "@angular/core";
import { DataService } from "./../services/data.service";
import { MatDialog } from "@angular/material/dialog";
import {
  FormGroup,
  FormBuilder,
  Validators,
  Form,
  FormArray,
} from "@angular/forms";
import { formatDate } from "@angular/common";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  customerForm: FormGroup;
  orderForm: FormGroup;

  constructor(private api: DataService,
              public dialog: MatDialog,
              private formBuilder: FormBuilder) 
  {
    this.buildCustomerForm();
  }

  ngOnInit(): void {

    this.customerData();

  }

  onSubmit() {
    console.log("Hello");
    //Display Reactive Form's JSON Values
    console.log("Form Data: " + JSON.stringify(this.customerForm.value));
  }

  //Display JSON Data
  customerData() {
    this.api.getCustomerData().subscribe((data) => {
      console.log("FULL CUSTOMER DATA: " + JSON.stringify(data));   
      data.forEach(customer => {
        //console.log("Loop order: " + JSON.stringify(customer.orders));
        customer.orders.forEach(order => {
          //console.log("Loop order: " + JSON.stringify(customer.orders));
          this.addOrder(order);
        });
      });

    });
  }

  //Build Customer Form
  buildCustomerForm() {
    this.customerForm = this.formBuilder.group({
      id: [""],
      customerId: [""],
      firstName: [""],
      lastName: [""],
      phone: [""],
      email: [""],
      street: [""],
      zip: [""],
      //Order Array
      orders: this.formBuilder.array([]), //this.buildOrderForm(),
    });
  }

  get orders() {
    return this.customerForm.get("orders") as FormArray;
  }

  addOrder(order?: any) {
    console.log("Add Order...");
    const orderr = this.formBuilder.group({
      id: [order?order.id:''],
      orderId: [order?order.orderId:''],
      orderStatus: [order?order.orderStatus:''],
      orderDate: [order?order.orderDate:''],
      storeId: [order?order.storeId:''],
      customerId: [order?order.customerId:''],
      items: this.formBuilder.array([]),
    });
    this.orders.push(orderr);

    let orderIndex = this.orders.length-1;
    if (!order)
        this.addItem(orderIndex);
    else {
        if (!order.orderItems)  //undefined is true (i.e, no items)
            console.log("==== Order # "+JSON.stringify(order.id)+" No Items")
        else 
            order.orderItems.forEach(item => {
              this.addItem(orderIndex, item);
            });
    }
 }

  deleteOrder(i: any) {
    this.orders.removeAt(i);
  }

  addItem(orderIndex: number, item?: any) {
    console.log("Add Item..."+JSON.stringify(item));
    const itemm = this.formBuilder.group({
      id: [item?item.id:''],
      orderItemsId: [item?item.orderItemsId:''],
      item: [item?item.item:''],
      quantity: [item?item.quantity:''],
      price: [item?item.price:''],
      orderId: [item?item.orderId:''],
    });

    (<FormArray>(<FormGroup>(<FormArray>this.orders)
      .controls[orderIndex]).controls['items']).push(itemm)
  }

  delItem(orderIndex: number, index: number) {
    (<FormArray>(<FormGroup>(<FormArray>this.orders)
      .controls[orderIndex]).controls['items']).removeAt(index);
  }

}
