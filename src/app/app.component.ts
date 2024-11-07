import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  template: '<app-menu></app-menu>',
  standalone: true,
  imports: [MenuComponent]
})
export class AppComponent {}
