import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  hostURL: string = "http://localhost:8080/Store";

  constructor(private http: HttpClient) {}

  //SELECT ALL CUSTOMERS DATA // 4 Testing
  getCustomerData(): Observable<any> {
    // return this.http.get("assets/fulldata.json");
    return this.http.get(this.hostURL + "/customerAll");
  }

  //SELECT Specific Orders //Not NEEDED, 4 Testing
  getSpecificOrder(): Observable<any> {
    return this.http.get("assets/datatest.json  ");
    // return this.http.get(this.hostURL+"customerOrder/,orderId");
  }

  //INSERT New Order? //Not NEEDED
  newOrder(): Observable<any> {
    return null;
    //return this.http.get(this.hostURL+"newOrder/",formData);
  }

  //INSERT New Customer
  newCustomer(): Observable<any> {
    return null;
    //return this.http.get(this.hostURL+"newCustomer/",formData);
  }

  //UPDATE Order //Not NEEDED
  updateOrder(): Observable<any> {
    return null;
    //return this.http.get(this.hostURL+"updateOrder/", formData);
  }

  //UPDATE Customer
  updateCustomer(formData: any): Observable<any> {
    // return null;
    return this.http.post(this.hostURL + "/updateCustomer", formData);
  }

  //DELETE Order //Not NEEDED
  deleteOrder(): Observable<any> {
    return null;
    //return this.http.get(this.hostURL+"updateOrder/", formData);
  }

  //DELETE Customer
  deleteCustomer(): Observable<any> {
    return null;
    //return this.http.delete(this.hostURL+"updateOrder/", formData);
  }

  //Get Stores
  getStores(): Observable<any> {
    return this.http.get("assets/stores.json");
    // return null;
    //return this.http.get(this.hostURL+"Stores/");
  }
}
