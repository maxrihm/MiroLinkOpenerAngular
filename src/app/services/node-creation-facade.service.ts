import { Injectable } from '@angular/core'
import { MindMapService } from './mindmap.service'
import { ShapeTextService } from './shape-text.service'
import { TemplateCreationService } from './template-creation.service'

@Injectable({ providedIn: 'root' })
export class NodeCreationFacadeService {
  constructor(
    private mindMapService: MindMapService,
    private shapeTextService: ShapeTextService,
    private templateCreationService: TemplateCreationService
  ) {}

  async createOrUpdateNode(
    nodeName: string,
    fileLink: string,
    nodeType: string,
    size: string,
    selectedTemplateName?: string
  ): Promise<void> {
    switch (nodeType) {
      case 'mindmap':
        await this.mindMapService.createMindMapNode(nodeName, fileLink)
        break
      case 'mindmap-update':
        await this.mindMapService.updateSelectedMindMapNode(nodeName, fileLink)
        break
      case 'node':
      case 'text':
        await this.shapeTextService.createShapeAndText(nodeName, fileLink, size, nodeType)
        break
      case 'template':
        if (!selectedTemplateName) {
          throw new Error('No template name selected.')
        }
        await this.templateCreationService.createTemplate(selectedTemplateName, fileLink, nodeName)
        break
      default:
        throw new Error('Unsupported node type: ' + nodeType)
    }
  }
}