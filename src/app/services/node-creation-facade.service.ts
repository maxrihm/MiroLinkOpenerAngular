import { Injectable } from '@angular/core';
import { MindMapService } from './mindmap.service';
import { ShapeTextService } from './shape-text.service';
import { BookMediumService } from './book-medium.service';

@Injectable({ providedIn: 'root' })
export class NodeCreationFacadeService {
  constructor(
    private mindMapService: MindMapService,
    private shapeTextService: ShapeTextService,
    private bookMediumService: BookMediumService
  ) {}

  async createOrUpdateNode(
    nodeName: string,
    fileLink: string,
    nodeType: string,
    size: string
  ): Promise<void> {
    switch (nodeType) {
      case 'mindmap':
        await this.mindMapService.createMindMapNode(nodeName, fileLink);
        break;
      case 'mindmap-update':
        await this.mindMapService.updateSelectedMindMapNode(nodeName, fileLink);
        break;
      case 'node':
      case 'text':
        await this.shapeTextService.createShapeAndText(nodeName, fileLink, size, nodeType);
        break;
      case 'book-medium':
        await this.bookMediumService.createBookMedium(fileLink, nodeName);
        break;
      default:
        throw new Error(`Unsupported node type: ${nodeType}`);
    }
  }
} 