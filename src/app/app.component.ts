import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClickHandlerService } from './services/click-handler.service'; // Import the service
import { MenuComponent } from './menu/menu.component'; // Import the MenuComponent
import { RedDotService } from './services/red-dot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [MenuComponent, RouterOutlet] // Add RouterOutlet here
})
export class AppComponent {
  constructor(private clickHandlerService: ClickHandlerService, public redDotService: RedDotService) {
    // Injecting ClickHandlerService initializes it
  }
}
