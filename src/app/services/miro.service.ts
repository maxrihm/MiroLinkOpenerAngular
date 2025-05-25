import { Injectable } from '@angular/core';

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
    const url = window.location.href;
    
    switch (true) {
      case url.includes('uXjVKNnndTA'):
        this.activeBaseLink = 'obsidian://advanced-uri?vault=Obsidian%20Vault&filepath=Frontend%252F';
        break;

      case url.includes('uXjVLGZJr7w'):
        this.activeBaseLink = 'obsidian://advanced-uri?vault=Obsidian%20Vault&filepath=Forex%252F';
        break;

      case url.includes('uXjVIw_4xP4='):
        this.activeBaseLink = 'obsidian://advanced-uri?vault=Hobby&filepath=Hobby%252F';
        break;

      default:
        this.activeBaseLink = 'obsidian://advanced-uri?vault=Obsidian%20Vault&filepath=Graph%2520Nodes%252F';
        break;
    }
  }

  filterFileName(nodeName: string): string {
    return nodeName.replace(/[\\\/:*?"<>|]/g, '');
  }

  buildFileLink(fileName: string, extension: string): string {
    return `${this.activeBaseLink}${encodeURIComponent(fileName)}${extension}`;
  }
}
