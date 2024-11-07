import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component'; // Import MenuComponent
import { ModalComponent } from './modal/modal.component'; // Import ModalComponent

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,  // Declare MenuComponent
    ModalComponent  // Declare ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule  // Import FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
