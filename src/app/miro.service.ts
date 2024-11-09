import { Injectable } from '@angular/core';

declare var miro: any;

@Injectable({
  providedIn: 'root'
})
export class MiroService {
  isDropdownVisible: boolean = false;
  isModalVisible: boolean = false;
  enteredName: string = '';
  fileName: string = ''; // Add fileName property
  generatedLink: string = '';
  selectedExtension: string = '.canvas';
  selectedSize: string = 'medium';

  private activeBaseLink!: string;

  constructor() {
    this.initializeBaseLink();
  }

  private initializeBaseLink(): void {
    console.log(window.location.href);
    if (window.location.href.includes("uXjVKNnndTA")) {
      this.activeBaseLink = "obsidian://advanced-uri?vault=Obsidian%20Vault&filepath=Frontend%252F";
      console.log("Using Frontend base link format.");
    } else {
      this.activeBaseLink = "obsidian://advanced-uri?vault=Obsidian%20Vault&filepath=Graph%2520Nodes%252F";
      console.log("Using GraphNodes base link format.");
    }
  }

  filterFileName(nodeName: string): string {
    return nodeName.replace(/[\\\/:*?"<>|]/g, '');
  }

  handleSubmit(nodeName: string, fileName: string, extension: string, size: string): void {
    this.enteredName = nodeName;
    this.fileName = fileName; // Set the file name
    this.selectedExtension = extension;
    this.selectedSize = size;

    if (this.enteredName && this.fileName) {
      this.generatedLink = `${this.activeBaseLink}${encodeURIComponent(this.fileName)}${this.selectedExtension}`;
      console.log('Generated link:', this.generatedLink);
      this.createShapeAndText();
    } else {
      alert('Please enter a node name and file name.');
    }
  }

  async createShapeAndText(): Promise<void> {
    const viewport = await miro.board.viewport.get();
    const centerX = viewport.x + viewport.width / 2;
    const centerY = viewport.y + viewport.height / 2;

    const sizeMap: { [key: string]: number } = {
      small: 10,
      medium: 12,
      large: 14
    };
    const selectedCircleSize = sizeMap[this.selectedSize];
    const selectedTextSize = sizeMap[this.selectedSize];

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
      width: 105
    });

    console.log('Shape and text created on the Miro board.');
  }
}
