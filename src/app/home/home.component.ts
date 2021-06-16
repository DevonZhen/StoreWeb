import { Component, OnInit } from "@angular/core";
import { DataService } from "./../services/data.service";
import { MatDialog } from "@angular/material/dialog";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {

  customerForm: FormGroup;
  orderForm: FormGroup;

  customers: any[] = [];

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
      this.customers = data;
      data.forEach(customer => {
        console.log("EACH CUSTOMER DATA: " + JSON.stringify(customer));
        //Customer Info
        this.customerForm.patchValue({
          'id': customer.id,
          'customerId': customer.id,
          'firstName': customer.firstName,
          'lastName': customer.lastName,
          'phone': customer.phone,
          'email': customer.email,
          'street': customer.street,
          'zip': customer.zip,
        });   
        //Order Info
        customer.orders.forEach(order => {
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

  addOrder(order?: any) 
  {
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
    if (!order)                 //undefined is true (i.e, no order)
        this.addItem(orderIndex);
    else {
        if (!order.orderItems)  //undefined is true (i.e, no item)
            this.addItem(orderIndex);          
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
