import { Component } from '@angular/core';
import { MiroService } from '../services/miro.service';
import { NgIf } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { RedDotService } from '../services/red-dot.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [NgIf, ModalComponent]
})
export class MenuComponent {
  hideTimeout: any;

  constructor(public miroService: MiroService, private redDotService: RedDotService) {}

  showDropdown(): void {
    this.redDotService.showRedDot(); // Show the red dot
    clearTimeout(this.hideTimeout);
    this.miroService.isDropdownVisible = true;
  }

  startHideTimeout(): void {
    this.redDotService.hideRedDot(); // Hide the red dot
    this.hideTimeout = setTimeout(() => {
      this.miroService.isDropdownVisible = false;
    }, 200);
  }

  showModalMenu(): void {
    this.miroService.isModalVisible = true;
  }
}
