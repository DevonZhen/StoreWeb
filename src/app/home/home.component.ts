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

  constructor(
    private api: DataService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildCustomerForm();
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
      for (var d in data) {
        console.log("Loop: " + JSON.stringify(data[d]));
        this.loadCustomerForm(data[d]);
      }
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
      orders: this.buildOrderForm(),
    });
  }

  //Build Order Form
  buildOrderForm() {
    var orderFormArray = this.formBuilder.array([]);
    orderFormArray.push(
      this.formBuilder.group({
        id: [""],
        orderId: [""],
        orderStatus: [""],
        orderDate: [""],
        storeId: [""],
        customerId: [""],
        orderItems: this.buildOrderItemsForm(),
      })
    );
    return orderFormArray;
  }

  //Build Order Items Form
  buildOrderItemsForm() {
    var orderItemsArray = this.formBuilder.array([]);
    orderItemsArray.push(
      this.formBuilder.group({
        id: [""], //Sequence-based
        ordersItemsId: [""],
        item: [""],
        quantity: [""],
        price: [""],
        orderId: [""],
      })
    );
    return orderItemsArray;
  }

  //Load Customer Data
  loadCustomerForm(data: any) {
    console.log("Loading Customer Data...");
    this.customerForm.patchValue({
      id: data.id,
      customerId: data.customerId,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      street: data.street,
      zip: data.zip,
    });

    //Orders Array
    console.log("Orders: " + JSON.stringify(data.orders));
    data.orders.forEach((element) => {
      console.log("Inside Orders..." + JSON.stringify(element));
      const order = this.formBuilder.group({
        id: element.id,
        orderId: element.orderId,
        orderStatus: element.orderStatus,
        orderDate: formatDate(element.orderDate, "yyyy-MM-dd", "en-US"),
        storeId: element.storeId,
        customerId: element.customerId,
      });
      this.orders.push(order);

      //Order Items Array
      console.log("Itemz: " + JSON.stringify(element.orderItems));
      // element.orderItems.forEach((i) => {
      //   const item = this.formBuilder.group({
      //     id: i.id,
      //     orderItemsId: i.orderItemsId,
      //     item: i.item,
      //     quantity: i.quantity,
      //     price: i.price,
      //     orderId: i.orderId,
      //   });
      //   this.orderItems.push(item);
      // });
    });
  }

  //Load Order Data
  loadOrderForm(data: any) {
    // this.orderForm.patchValue({
    //   id: data.id,
    //   orderId: data.orderId,
    //   orderStatus: data.orderStatus,
    //   orderDate: formatDate(data.orderDate, "yyyy-MM-dd", "en-US"),
    //   storeId: data.storeId,
    //   customerId: data.customerId,
    // });
    //Order Items Array
    // data.orders.forEach((element) => {
    //   const items = this.formBuilder.group({
    //     item: element.item,
    //     quantity: element.quantity,
    //     price: element.price,
    //     orderId: element.orderId,
    //   });
    //   this.orders.push(items);
    // });
  }

  //Load Items Data
  loadOrderItemsForm(data: any) {
    // this.orderItems
  }

  get orders() {
    return this.customerForm.get("orders") as FormArray;
  }

  get orderItems() {
    return this.customerForm.get("orderItems") as FormArray;
  }

  addOrder() {
    console.log("Add Order...");
    const order = this.formBuilder.group({
      id: [],
      orderId: [],
      orderStatus: [],
      orderDate: [],
      storeId: [],
      customerId: [],
    });
    this.orders.push(order);
  }

  deleteOrder(i: any) {
    console.log("Delete Order...");
    this.orders.removeAt(i);
  }

  addItem() {
    console.log("Add Item...");
    const item = this.formBuilder.group({
      id: [],
      orderItemsId: [],
      item: [],
      quantity: [],
      price: [],
      orderId: [],
    });
    this.orderItems.push(item);
  }

  deleteItem(x: any) {
    console.log("Delete Item...");
    this.orderItems.removeAt(x);
  }
}
