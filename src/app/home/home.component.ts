import { Component, OnInit } from "@angular/core";
import { DataService } from "./../services/data.service";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {

  customerForm: FormGroup;

  constructor(private api: DataService,
              private formBuilder: FormBuilder) 
  {
    this.customerForm = this.formBuilder.group({
      'customers': formBuilder.array([]),
    })
  }

  ngOnInit(): void {

    this.initCustomers();

  }

  get customers() {
    return this.customerForm.get("customers") as FormArray;
  }

  initCustomers() : any { 
    this.api.getCustomerData().subscribe((data) => {
      //console.log("FULL CUSTOMER DATA: " + JSON.stringify(data)); 
      if (data) {
          data.forEach(customer => {
            this.addCustomer(customer);
          });         
      } else {
          this.addCustomer();
      }
    });
  }

  addCustomer(customer?: any)
  {
    const cust = this.formBuilder.group({
      id: [customer?customer.id:''],
      customerId: [customer?customer.customerId:''],
      firstName: [customer?customer.firstName:''],
      lastName: [customer?customer.lastName:''],
      phone: [customer?customer.phone:''],
      email: [customer?customer.email:''],
      street: [customer?customer.street:''],
      zip: [customer?customer.zip:''],
      orders: this.formBuilder.array([]), 
    });    
    this.customers.push(cust);

    let custIndex = this.customers.length-1
    if (!customer) {
        this.addOrder(custIndex);
    } else {
        customer.orders.forEach(order => {
          this.addOrder(custIndex, order);
        });
    }
  }

  addOrder(custIndex: number, order?: any) 
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
    (<FormArray>(<FormGroup>(<FormArray>this.customers)
          .controls[custIndex]).controls['orders']).push(orderr);
          
    let orderIndex = (<FormArray>(<FormGroup>(<FormArray>this.customers)
                         .controls[custIndex]).controls['orders']).length-1   
  
    if (!order) {                 //undefined is true (i.e, no order) 
        this.addItem(custIndex, orderIndex);
    } else {
        if (!order.orderItems) {  //undefined is true (i.e, no item) 
            this.addItem(custIndex, orderIndex);
        } else {
            order.orderItems.forEach(order => {
              this.addItem(custIndex, orderIndex, order);
            });
        }
    }
  }
  
  addItem(custIndex: number, orderIndex: number, item?: any) {
    const itemm = this.formBuilder.group({
      id: [item?item.id:''],
      orderItemsId: [item?item.orderItemsId:''],
      item: [item?item.item:''],
      quantity: [item?item.quantity:''],
      price: [item?item.price:''],
      orderId: [item?item.orderId:''],
    });

    (<FormArray>(<FormGroup>(<FormArray>
        (<FormArray>(<FormGroup>(<FormArray>this.customers)    // this orders
                     .controls[custIndex]).controls['orders']) )
        .controls[orderIndex]).controls['items']).push(itemm);
  }

  delOrder(custIndex: number, orderIndex: number) {
    (<FormArray>(<FormGroup>(<FormArray>this.customers)
                     .controls[custIndex]).controls['orders']).removeAt(orderIndex);
  }

  delItem(custIndex: number, orderIndex: number, itemIndex: number) {
    (<FormArray>(<FormGroup>(<FormArray>
        (<FormArray>(<FormGroup>(<FormArray>this.customers)    
                     .controls[custIndex]).controls['orders']) )
        .controls[orderIndex]).controls['items']).removeAt(itemIndex);
  }


  onSubmit() {
    //Display Reactive Form's JSON Values
    console.log("Form Data: " + JSON.stringify(this.customerForm.value));
  }


}
