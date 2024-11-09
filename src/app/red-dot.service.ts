import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RedDotService {
  private redDotElement: HTMLDivElement | null = null;

  showRedDot(): void {
    // If the red dot already exists, don't add another one
    if (this.redDotElement) return;

    // Create the red dot element
    this.redDotElement = document.createElement('div');
    this.redDotElement.classList.add('red-dot');

    // Style the red dot to ensure it's centered and on top
    Object.assign(this.redDotElement.style, {
      width: '10px',
      height: '10px',
      backgroundColor: 'red',
      borderRadius: '50%',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '10000', // High z-index to ensure it's on top
    });

    // Append the red dot to the body
    document.body.appendChild(this.redDotElement);
  }

  hideRedDot(): void {
    // Remove the red dot element if it exists
    if (this.redDotElement) {
      document.body.removeChild(this.redDotElement);
      this.redDotElement = null;
    }
  }
}
