import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CssAnimationsService {
  private cursorX: number = 0;
  private cursorY: number = 0;

  constructor() {
    this.trackCursorPosition();
  }

  // Track the cursor position globally
  private trackCursorPosition(): void {
    document.addEventListener('mousemove', (event) => {
      this.cursorX = event.clientX;
      this.cursorY = event.clientY;
    });
  }

  // Trigger the spark effect at the current cursor position
  triggerSparkEffect(): void {
    const sparkContainer = document.createElement('div');
    sparkContainer.classList.add('spark-container');
    sparkContainer.style.left = `${this.cursorX}px`;
    sparkContainer.style.top = `${this.cursorY}px`;

    // Generate fewer, more dynamic sparks for better performance
    for (let i = 0; i < 5; i++) {
      const spark = document.createElement('div');
      spark.classList.add('spark');

      // Randomize spark direction using CSS variables
      spark.style.setProperty('--spark-x', `${Math.random() * 40 - 20}px`);
      spark.style.setProperty('--spark-y', `${Math.random() * 40 - 20}px`);

      sparkContainer.appendChild(spark);
    }

    document.body.appendChild(sparkContainer);

    // Remove the spark container after the animation completes
    setTimeout(() => {
      document.body.removeChild(sparkContainer);
    }, 500); // Match the animation duration
  }
}
