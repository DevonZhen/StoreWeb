import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatDividerModule} from '@angular/material/divider'; 
import {MatSliderModule} from '@angular/material/slider'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatRadioModule} from '@angular/material/radio'; 

//Modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,BrowserAnimationsModule,MatFormFieldModule,MatInputModule,
    MatCardModule,MatPaginatorModule,MatSliderModule,MatRadioModule,MatDividerModule,MatTabsModule,
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
