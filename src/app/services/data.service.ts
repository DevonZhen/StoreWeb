import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  hostURL: string = "http://localhost:4200/Store";

  constructor(private http: HttpClient) {}

  //SELECT ALL CUSTOMERS DATA
  getCustomerData(): Observable<any> {
    return this.http.get("assets/fulldata.json");
    // return this.http.get(this.hostURL+"/customerAll");
  }

  //SELECT Specific Orders
  getSpecificOrder(): Observable<any> {
    return this.http.get("assets/datatest.json  ");
    // return this.http.get(this.hostURL+"customerOrder/,orderId");
  }

  //SELECT Specific Customer

  //INSERT New Order?
  newOrder(): Observable<any> {
    return null;
    //return this.http.get(this.hostURL+"newOrder/",formData);
  }

  //INSERT New Customer
  newCustomer(): Observable<any> {
    return null;
    //return this.http.get(this.hostURL+"newCustomer/",formData);
  }

  //UPDATE Order
  updateOrder(): Observable<any> {
    return null;
    //return this.http.get(this.hostURL+"updateOrder/", formData);
  }

  //UPDATE Customer
  updateCustomer(): Observable<any> {
    return null;
    //return this.http.get(this.hostURL+"updateOrder/", formData);
  }

  //DELETE Order
  deleteOrder(): Observable<any> {
    return null;
    //return this.http.get(this.hostURL+"updateOrder/", formData);
  }

  //DELETE Customer
  deleteCustomer(): Observable<any> {
    return null;
    //return this.http.get(this.hostURL+"updateOrder/", formData);
  }

  //Get Stores
  getStores(): Observable<any> {
    return this.http.get("assets/stores.json");
    // return null;
    //return this.http.get(this.hostURL+"Stores/");
  }
}
