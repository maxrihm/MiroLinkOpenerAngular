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

  buildFileLink(fileName: string, extension: string): string {
    return `${this.activeBaseLink}${encodeURIComponent(fileName)}${extension}`;
  }
}
