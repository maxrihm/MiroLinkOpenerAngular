import { Injectable } from '@angular/core';

declare var miro: any;

@Injectable({ providedIn: 'root' })
export class ShapeTextService {
  constructor() {}

  async createShapeAndText(
    enteredName: string,
    fileLink: string,
    size: string,
    nodeType: string
  ): Promise<void> {
    const viewport = await miro.board.viewport.get();
    const centerX = viewport.x + viewport.width / 2;
    const centerY = viewport.y + viewport.height / 2;

    const sizeMap: { [key: string]: number } = {
      xs: 8,
      small: 10,
      medium: 12,
      large: 14
    };
    const selectedCircleSize = sizeMap[size] || 12;
    const selectedTextSize = selectedCircleSize;

    const textLength = enteredName.length;
    const idealTextWidth = selectedTextSize * textLength * 0.6;

    if (nodeType === 'node') {
      await miro.board.createShape({
        shape: 'circle',
        style: {
          fillColor: '#e6e6e6',
          borderOpacity: 0,
          fillOpacity: 1.0
        },
        x: centerX,
        y: centerY,
        width: selectedCircleSize,
        height: selectedCircleSize,
        linkedTo: fileLink
      });

      const textHeight = selectedTextSize * 1.42857;
      const offsetY = (selectedCircleSize + textHeight) / 2;

      await miro.board.createText({
        content: `${enteredName}`,
        style: {
          color: '#e6e6e6',
          fontFamily: 'opensans',
          fontSize: selectedTextSize,
          textAlign: 'center'
        },
        x: centerX,
        y: centerY + offsetY,
        width: idealTextWidth
      });

    } else if (nodeType === 'text') {
      await miro.board.createText({
        content: `${enteredName}`,
        style: {
          color: '#e6e6e6',
          fontFamily: 'opensans',
          fontSize: selectedTextSize,
          textAlign: 'center'
        },
        x: centerX,
        y: centerY,
        width: idealTextWidth,
        linkedTo: fileLink
      });
    }
  }
} 