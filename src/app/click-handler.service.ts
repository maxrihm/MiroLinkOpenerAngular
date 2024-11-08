import { Injectable } from '@angular/core';
import { LinkOpenerService } from './link-opener.service';
import { CssAnimationsService } from './css-animations.service';

declare var miro: any;

@Injectable({
  providedIn: 'root'
})
export class ClickHandlerService {
  private pointerDownTime: number | null = null;
  private readonly SHORT_CLICK_THRESHOLD = 200;
  private initialLink: string | null = null;

  constructor(
    private linkOpenerService: LinkOpenerService,
    private cssAnimationsService: CssAnimationsService // Inject the animation service
  ) {
    this.initEventListeners();
    this.checkInitialLink();
  }

  private initEventListeners(): void {
    document.addEventListener('pointerdown', (event) => this.onPointerDown(event));
    document.addEventListener('pointerup', (event) => this.onPointerUp(event));
  }

  private onPointerDown(event: PointerEvent): void {
    if (event.button === 0) {
      this.pointerDownTime = new Date().getTime();
    }
  }

  private onPointerUp(event: PointerEvent): void {
    if (event.button === 0 && this.pointerDownTime !== null) {
      const clickDuration = new Date().getTime() - this.pointerDownTime;

      if (clickDuration < this.SHORT_CLICK_THRESHOLD) {
        this.runMainLogic();
      }

      this.pointerDownTime = null;
      this.checkInitialLink();
    }
  }

  private async checkInitialLink(): Promise<void> {
    const selection = await miro.board.getSelection();
    this.initialLink = selection && selection.length > 0 && selection[0].linkedTo ? selection[0].linkedTo : null;
  }

  private async runMainLogic(): Promise<void> {
    const selection = await miro.board.getSelection();
    const currentLink = selection && selection.length > 0 && selection[0].linkedTo ? selection[0].linkedTo : null;

    if (currentLink && currentLink !== this.initialLink) {
      this.linkOpenerService.openLink(currentLink);
      await miro.board.deselect();
      this.cssAnimationsService.triggerSparkEffect(); // Trigger the spark effect after deselection
    }
  }
}
