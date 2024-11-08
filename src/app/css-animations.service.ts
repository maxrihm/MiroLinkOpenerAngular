import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CssAnimationsService {
  private renderer: Renderer2;
  private cursorX: number = 0;
  private cursorY: number = 0;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.trackCursorPosition();
    this.injectAnimationStyles();
  }

  // Track the cursor position
  private trackCursorPosition(): void {
    document.addEventListener('mousemove', (event) => {
      this.cursorX = event.clientX;
      this.cursorY = event.clientY;
    });
  }

  // Inject the CSS needed for the spark animation into the document
  private injectAnimationStyles(): void {
    const styleElement = this.renderer.createElement('style');
    styleElement.textContent = `
      .spark-container {
        position: fixed;
        pointer-events: none;
      }
      .spark {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: gold;
        position: absolute;
        animation: spark-animation 0.6s ease-out forwards;
        opacity: 0;
      }
      @keyframes spark-animation {
        0% {
          opacity: 1;
          transform: translate(0, 0) scale(1);
        }
        100% {
          opacity: 0;
          transform: translate(var(--spark-x), var(--spark-y)) scale(0.5);
        }
      }
    `;
    this.renderer.appendChild(document.head, styleElement);
  }

  // Trigger the spark effect at the current cursor position
  triggerSparkEffect(): void {
    const sparkContainer = this.renderer.createElement('div');
    this.renderer.addClass(sparkContainer, 'spark-container');
    this.renderer.setStyle(sparkContainer, 'left', `${this.cursorX}px`);
    this.renderer.setStyle(sparkContainer, 'top', `${this.cursorY}px`);

    // Create multiple spark elements for a dynamic effect
    for (let i = 0; i < 6; i++) {
      const spark = this.renderer.createElement('div');
      this.renderer.addClass(spark, 'spark');

      // Randomize direction of each spark
      this.renderer.setStyle(spark, '--spark-x', `${Math.random() * 20 - 10}px`);
      this.renderer.setStyle(spark, '--spark-y', `${Math.random() * 20 - 10}px`);

      this.renderer.appendChild(sparkContainer, spark);
    }

    this.renderer.appendChild(document.body, sparkContainer);

    // Remove the spark container after the animation completes
    setTimeout(() => {
      this.renderer.removeChild(document.body, sparkContainer);
    }, 600); // Match the animation duration
  }
}
