import { Injectable } from '@angular/core';

declare var miro: any;

@Injectable({
  providedIn: 'root'
})
export class MiroService {
  isDropdownVisible: boolean = false;
  isModalVisible: boolean = false;
  enteredName: string = '';
  generatedLink: string = '';
  selectedExtension: string = '.canvas';
  selectedSize: string = 'medium';

  constructor() {
    this.setupAuxClickListener();
  }

  handleSubmit(
    name: string,
    extension: string,
    size: string
  ): void {
    this.enteredName = name;
    this.selectedExtension = extension;
    this.selectedSize = size;

    if (this.enteredName) {
      this.generatedLink = `obsidian://advanced-uri?vault=Obsidian%20Vault&filepath=Graph%2520Nodes%252F${encodeURIComponent(
        this.enteredName
      )}${this.selectedExtension}`;
      console.log('Entered name:', this.enteredName);
      console.log('Generated link:', this.generatedLink);
      this.createShapeAndText();
      this.openCreatedLink();
    } else {
      alert('Please enter a name.');
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

    // Create the circle
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

    // Calculate the text height and offset
    const textHeight = selectedTextSize * 1.42857;
    const offsetY = (selectedCircleSize + textHeight) / 2;

    // Create the text
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

  openCreatedLink(): void {
    if (this.generatedLink) {
      this.sendPostRequest(this.createData(this.generatedLink));
    } else {
      console.log('No link to open.');
    }
  }

  createData(linkedTo: string): any {
    if (linkedTo.includes('obsidian')) {
      return {
        Arg1: 'openObsidian',
        Arg2: linkedTo
      };
    } else {
      return {
        Arg1: 'openCanary',
        Arg2: linkedTo
      };
    }
  }

  sendPostRequest(data: any): void {
    fetch('http://localhost:5199/Commands/ExecuteCommand', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => console.log('Success:', data))
      .catch((error) => console.error('Error:', error));
  }

  setupAuxClickListener(): void {
    document.addEventListener('auxclick', this.handleAuxClick.bind(this));
  }

  async handleAuxClick(event: any): Promise<void> {
    if (event.button === 1) {
      setTimeout(async () => {
        const selection = await miro.board.getSelection();
        if (selection.length > 0 && selection[0].linkedTo) {
          const data = this.createData(selection[0].linkedTo);
          this.sendPostRequest(data);
        }
        await miro.board.deselect();
      }, 10);
    }
  }
}
