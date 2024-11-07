import { Component } from '@angular/core';
import { MiroService } from '../miro.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  hideTimeout: any;

  constructor(public miroService: MiroService) {}

  showDropdown(): void {
    clearTimeout(this.hideTimeout);
    this.miroService.isDropdownVisible = true;
  }

  startHideTimeout(): void {
    this.hideTimeout = setTimeout(() => {
      this.miroService.isDropdownVisible = false;
    }, 200);
  }

  showModalMenu(): void {
    this.miroService.isModalVisible = true;
  }
}
