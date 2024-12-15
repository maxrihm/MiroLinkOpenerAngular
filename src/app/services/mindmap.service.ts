import { Injectable } from '@angular/core';

declare var miro: any;

@Injectable({ providedIn: 'root' })
export class MindMapService {
  constructor() {}

  async createMindMapNode(
    nodeName: string,
    fileLink: string
  ): Promise<void> {
    const viewport = await miro.board.viewport.get();
    const centerX = viewport.x + viewport.width / 2;
    const centerY = viewport.y + viewport.height / 2;

    await miro.board.experimental.createMindmapNode({
      nodeView: {
        type: 'text',
        content: nodeName
      },
      x: centerX,
      y: centerY,
      linkedTo: fileLink,
    });
  }

  async updateSelectedMindMapNode(
    nodeName: string,
    fileLink: string
  ): Promise<void> {
    const selectedItems = await miro.board.experimental.getSelection();
    if (!selectedItems || selectedItems.length === 0) {
      throw new Error('No mindmap node selected');
    }
    const selectedNode = selectedItems[0];
    selectedNode.linkedTo = fileLink;
    selectedNode.nodeView.content = nodeName;
    await selectedNode.sync();
  }
} 