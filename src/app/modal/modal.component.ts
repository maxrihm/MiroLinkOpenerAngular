import { Component } from '@angular/core';
import { MiroService } from '../miro.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf]
})
export class ModalComponent {
  enteredName: string = '';
  selectedExtension: string = '.canvas';
  selectedSize: string = 'medium';

  constructor(private miroService: MiroService) {}

  handleSubmit(): void {
    if (this.enteredName) {
      this.miroService.handleSubmit(
        this.enteredName,
        this.selectedExtension,
        this.selectedSize
      );
      this.miroService.isModalVisible = false;
    } else {
      alert('Please enter a name.');
    }
  }

  closeModal(): void {
    this.miroService.isModalVisible = false;
  }
}
