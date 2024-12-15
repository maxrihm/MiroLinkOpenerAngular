import { Component, HostListener } from '@angular/core';
import { MiroService } from '../services/miro.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NodeCreationFacadeService } from '../services/node-creation-facade.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf]
})
export class ModalComponent {
  enteredName: string = '';
  fileName: string = '';
  directLink: string = '';
  selectedExtension: string = '.canvas';
  selectedSize: string = 'medium';
  selectedNodeType: string = 'node';

  constructor(
    private miroService: MiroService,
    private nodeCreationFacade: NodeCreationFacadeService
  ) {}

  onNodeNameChange(nodeName: string): void {
    this.fileName = this.miroService.filterFileName(nodeName);
  }

  onFileNameChange(fileName: string): void {
    this.fileName = this.miroService.filterFileName(fileName);
  }

  async handleSubmit(): Promise<void> {
    if (!this.enteredName && !this.directLink) {
      alert('Please enter a name or a direct link.');
      return;
    }

    let fileLink: string;

    if (this.directLink && this.directLink.trim() !== '') {
      fileLink = this.directLink.trim();
    } else {
      if (!this.fileName) {
        alert('Please enter a file name.');
        return;
      }
      fileLink = this.miroService.buildFileLink(this.fileName, this.selectedExtension);
    }

    try {
      await this.nodeCreationFacade.createOrUpdateNode(
        this.enteredName,
        fileLink,
        this.selectedNodeType,
        this.selectedSize
      );
      this.miroService.isModalVisible = false;
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  }

  closeModal(): void {
    this.miroService.isModalVisible = false;
  }

  @HostListener('document:keydown.enter', ['$event'])
  onEnterPress(event: KeyboardEvent): void {
    if (this.miroService.isModalVisible) {
      event.preventDefault();
      this.handleSubmit();
    }
  }
}
