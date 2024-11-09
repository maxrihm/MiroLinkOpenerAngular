import { Component, HostListener, OnDestroy } from '@angular/core';
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
export class ModalComponent implements OnDestroy {
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

  @HostListener('document:keydown.enter', ['$event'])
  onEnterPress(event: KeyboardEvent): void {
    // Trigger only if modal is visible
    if (this.miroService.isModalVisible) {
      event.preventDefault(); // Prevent default behavior
      this.handleSubmit();    // Call handleSubmit on Enter
    }
  }

  ngOnDestroy(): void {
    // Cleanup any additional listeners or subscriptions if needed
  }
}
