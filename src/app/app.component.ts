import { Component } from '@angular/core';
import { ClickHandlerService } from './click-handler.service'; // Import the service
import { MenuComponent } from './menu/menu.component'; // Import the MenuComponent

@Component({
  selector: 'app-root',
  template: '<app-menu></app-menu>',
  standalone: true,
  imports: [MenuComponent] // Import MenuComponent here
})
export class AppComponent {
  constructor(private clickHandlerService: ClickHandlerService) {
    // Injecting ClickHandlerService initializes it
  }
}
