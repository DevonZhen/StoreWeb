import { Component, OnInit } from "@angular/core";
import { DataService } from "./../services/data.service";
import { MatDialog } from "@angular/material/dialog";
import { MainDialogComponent } from "../main-dialog/main-dialog.component";
import { Dialog2Component } from "../utilities/dialog2/dialog2.component";
import { Dialog3Component } from "../utilities/dialog3/dialog3.component";
@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  panelOpenState = false;
  customerData: any;
  constructor(private api: DataService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCustomerData();
  }

  //JSON
  getCustomerData() {
    this.api.getCustomerData().subscribe(
      (data) => {
        // console.log("Data is here");
        console.log("The Data: " + JSON.stringify(data));
        // for (var i in data) {
        //   this.customerData = data[i];
        // }
        // console.log("FLow: " + JSON.stringify(this.customerData));
        this.customerData = JSON.stringify(JSON.stringify(data));
      },
      (err) => {
        console.log("CustomerData() failed");
      }
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(MainDialogComponent);
  }

  openDialog3() {
    const dialogRef = this.dialog.open(Dialog3Component);
  }

  openDialog2(editStatus: any) {
    //true --> Edit Mode
    let time = true;

    if (editStatus) {
      const dialogRef = this.dialog.open(Dialog2Component, {
        data: {
          editStatus: editStatus,
          data: this.customerData,
        },
      });
    } else {
      const dialogRef = this.dialog.open(Dialog2Component, {
        data: {
          answer: false,
        },
      });
    }
  }
}
