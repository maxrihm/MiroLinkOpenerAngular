import { Component, HostListener, OnInit } from '@angular/core'
import { MiroService } from '../services/miro.service'
import { FormsModule } from '@angular/forms'
import { NgIf, NgFor } from '@angular/common'
import { NodeCreationFacadeService } from '../services/node-creation-facade.service'
import { SettingsService } from '../services/settings.service'
import { TemplatesListService } from '../services/templates-list.service'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf, NgFor]
})
export class ModalComponent implements OnInit {
  enteredName: string = ''
  fileName: string = ''
  directLink: string = ''
  selectedExtension: string = '.canvas'
  selectedSize: string = 'medium'
  selectedNodeType: string = 'node'
  selectedTemplateName: string = ''
  availableTemplates: string[] = []

  constructor(
    private miroService: MiroService,
    private nodeCreationFacade: NodeCreationFacadeService,
    private settingsService: SettingsService,
    private templatesListService: TemplatesListService
  ) {}

  ngOnInit() {
    const lastSettings = this.settingsService.currentSettings
    this.selectedExtension = lastSettings.extension
    this.selectedSize = lastSettings.size
    this.selectedNodeType = lastSettings.nodeType
    
    // Set default templates in case HTTP request fails
    this.availableTemplates = ['Book-medium', 'Question']
    
    // Subscribe to templates from the service
    this.templatesListService.templates$.subscribe((templates: string[]) => {
      if (templates && templates.length > 0) {
        this.availableTemplates = templates
      }
    })
  }

  onNodeNameChange(nodeName: string): void {
    this.fileName = this.miroService.filterFileName(nodeName)
  }

  onFileNameChange(fileName: string): void {
    this.fileName = this.miroService.filterFileName(fileName)
  }

  updateSettings(): void {
    this.settingsService.updateSettings({
      extension: this.selectedExtension,
      size: this.selectedSize,
      nodeType: this.selectedNodeType
    })
  }

  async handleSubmit(): Promise<void> {
    if (!this.enteredName && !this.directLink) {
      alert('Please enter a name or a direct link.')
      return
    }
    let fileLink: string
    if (this.directLink && this.directLink.trim() !== '') {
      fileLink = this.directLink.trim()
    } else {
      if (!this.fileName) {
        alert('Please enter a file name.')
        return
      }
      fileLink = this.miroService.buildFileLink(this.fileName, this.selectedExtension)
    }
    try {
      this.updateSettings()
      await this.nodeCreationFacade.createOrUpdateNode(
        this.enteredName,
        fileLink,
        this.selectedNodeType,
        this.selectedSize,
        this.selectedTemplateName
      )
      this.miroService.isModalVisible = false
    } catch (error: any) {
      alert('Error: ' + error.message)
    }
  }

  closeModal(): void {
    this.miroService.isModalVisible = false
  }

  @HostListener('document:keydown.enter', ['$event'])
  onEnterPress(event: KeyboardEvent): void {
    if (this.miroService.isModalVisible) {
      event.preventDefault()
      this.handleSubmit()
    }
  }
}
