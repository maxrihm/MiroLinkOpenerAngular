import { Injectable } from '@angular/core';

declare var miro: any;

@Injectable({
  providedIn: 'root'
})
export class MiroService {
  isDropdownVisible: boolean = false;
  isModalVisible: boolean = false;
  enteredName: string = '';
  fileName: string = '';
  generatedLink: string = '';
  selectedExtension: string = '.canvas';
  selectedSize: string = 'medium';
  selectedNodeType: string = '';

  private activeBaseLink!: string;

  constructor() {
    this.initializeBaseLink();
  }

  private initializeBaseLink(): void {
    if (window.location.href.includes('uXjVKNnndTA')) {
      this.activeBaseLink = 'obsidian://advanced-uri?vault=Obsidian%20Vault&filepath=Frontend%252F';
    } else if (window.location.href.includes('uXjVLGZJr7w')) {
      this.activeBaseLink = 'obsidian://advanced-uri?vault=Obsidian%20Vault&filepath=Forex%252F';
    } else {
      this.activeBaseLink = 'obsidian://advanced-uri?vault=Obsidian%20Vault&filepath=Graph%2520Nodes%252F';
    }
  }

  filterFileName(nodeName: string): string {
    return nodeName.replace(/[\\\/:*?"<>|]/g, '');
  }

  async createMindMapNode(
    nodeName: string,
    fileName: string,
    extension: string,
    size: string
  ): Promise<void> {
    const viewport = await miro.board.viewport.get();
    const centerX = viewport.x + viewport.width / 2;
    const centerY = viewport.y + viewport.height / 2;

    const link = `${this.activeBaseLink}${encodeURIComponent(fileName)}${extension}`;

    await miro.board.experimental.createMindmapNode({
      nodeView: {
        type: 'text',
        content: nodeName
      },
      x: centerX,
      y: centerY,
      linkedTo: link,
    });

  }

  async createShapeAndText(): Promise<void> {
    const viewport = await miro.board.viewport.get();
    const centerX = viewport.x + viewport.width / 2;
    const centerY = viewport.y + viewport.height / 2;

    const sizeMap: { [key: string]: number } = {
      xs: 8,
      small: 10,
      medium: 12,
      large: 14
    };
    const selectedCircleSize = sizeMap[this.selectedSize];
    const selectedTextSize = sizeMap[this.selectedSize];

    const textLength = this.enteredName.length;
    const idealTextWidth = selectedTextSize * textLength * 0.6;

    if (this.selectedNodeType === 'node') {
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
        linkedTo: this.generatedLink
      });

      const textHeight = selectedTextSize * 1.42857;
      const offsetY = (selectedCircleSize + textHeight) / 2;

      await miro.board.createText({
        content: `${this.enteredName}`,
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

    } else if (this.selectedNodeType === 'text') {
      await miro.board.createText({
        content: `${this.enteredName}`,
        style: {
          color: '#e6e6e6',
          fontFamily: 'opensans',
          fontSize: selectedTextSize,
          textAlign: 'center'
        },
        x: centerX,
        y: centerY,
        width: idealTextWidth,
        linkedTo: this.generatedLink
      });
    }
  }

  handleSubmit(nodeName: string, fileName: string, extension: string, size: string, nodeType: string): void {
    this.enteredName = nodeName;
    this.fileName = fileName;
    this.selectedExtension = extension;
    this.selectedSize = size;
    this.selectedNodeType = nodeType;

    if (this.enteredName && this.fileName) {
      this.generatedLink = `${this.activeBaseLink}${encodeURIComponent(this.fileName)}${this.selectedExtension}`;
      console.log('Generated link:', this.generatedLink);

      if (this.selectedNodeType === 'mindmap') {
        this.createMindMapNode(
          this.enteredName,
          this.fileName,
          this.selectedExtension,
          this.selectedSize
        );
      } else {
        this.createShapeAndText();
      }
    } else {
      alert('Please enter a node name and file name.');
    }
  }
}
