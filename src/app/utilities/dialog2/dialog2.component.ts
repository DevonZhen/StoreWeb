import { Component, OnInit, Inject } from "@angular/core";
import { DataService } from "./../../services/data.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  FormGroup,
  FormBuilder,
  Validators,
  Form,
  FormArray,
} from "@angular/forms";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-dialog2",
  templateUrl: "./dialog2.component.html",
  styleUrls: ["./dialog2.component.css"],
})
export class Dialog2Component implements OnInit {
  orderForm: FormGroup;
  customer: any;
  editState: any = this.data.editStatus;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: DataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // console.log("Customer: " + this.data.data);
    this.buildOrderForm();
    this.passOrder();
  }

  onSubmit() {
    console.log("Form: " + JSON.stringify(this.orderForm.value));
    if (this.data.data) {
      //update Order
      console.log("Update");
    } else {
      //New Order
      console.log("New");
    }
  }

  passOrder() {
    this.api.getSpecificOrder().subscribe(
      (data) => {
        // console.log("Data is here");
        this.customer = data;
        console.log("Order: " + JSON.stringify(this.customer));
        //Load Order from Customer's tab
        if (this.editState) {
          this.loadOrderForm(this.customer);
        }
      },
      (err) => {
        console.log("CustomerData() failed");
      }
    );
  }

  //Build Order Form
  buildOrderForm() {
    this.orderForm = this.formBuilder.group({
      id: [""],
      orderId: [""],
      orderStatus: [""],
      orderDate: [""],
      storeId: this.formBuilder.group({
        storeId: [''],
        street: [''],
        city: [''],
        state: [''],
        zip: [''],
      }),
      //Item Array
      orderItems: this.buildOrderItemsArray(),
    });
  }

  //Build Order Items Form
  buildOrderItemsArray() {
    var formArray = this.formBuilder.array([]);
    formArray.push(
      this.formBuilder.group({
        id: [""], //Sequence-based
        ordersItemsId: [""],
        item: [""],
        quantity: [""],
        price: [""],
        orderId: [""],
      })
    );
    return formArray;
  }

  get orderItems() {
    return this.orderForm.get("orderItems") as FormArray;
  }

  //Add Order
  addOrderItem() {
    const orderItem = this.formBuilder.group({
      item: [""],
      quantity: [""],
      price: [""],
    });
    this.orderItems.push(orderItem);
  }

  //Delete Order
  deleteOrderItem(i: any) {
    this.orderItems.removeAt(i);
  }

  //Load Data to UI
  loadOrderForm(data: any) {
    this.orderForm.patchValue({
      orderId: data.orderId,
      orderStatus: data.orderStatus,
      orderDate: formatDate(data.orderDate, "yyyy-MM-dd", "en-US"),
    });

    //Order Items Array
    data.orderItems.forEach((element) => {
      const items = this.formBuilder.group({
        item: element.item,
        quantity: element.quantity,
        price: element.price,
        orderId: element.orderId,
      });
      this.orderItems.push(items);
    });
  }

  newOrder() {
    console.log("New Order...");
  }

  updateOrder() {}
}
