import { Injectable } from '@angular/core'
import { DomUtilsService } from './dom-utils.service'

declare var miro: any

@Injectable({ providedIn: 'root' })
export class TemplateCreationService {
  constructor(private domUtils: DomUtilsService) {}

  async createTemplate(templateName: string, fileLink: string, enteredName: string): Promise<void> {
    const templateButton = document.getElementById('CreationBarButton--TEMPLATES')
    if (!templateButton) {
      throw new Error('Button with ID "CreationBarButton--TEMPLATES" not found.')
    }
    templateButton.click()
    const personalSpan = await this.domUtils.waitForElement('span', 'Personal')
    const personalButton = personalSpan.closest('button')
    if (!personalButton) {
      throw new Error('Parent button for "Personal" not found.')
    }
    personalButton.click()
    const targetSpan = await this.domUtils.waitForElement('span', templateName)
    const targetButton = targetSpan.closest('button')
    if (!targetButton) {
      throw new Error('Parent button for "' + templateName + '" not found.')
    }
    targetButton.click()
    
    // Wait for selection to be available
    await this.domUtils.waitForCondition(async () => {
      const selection = await miro.board.experimental.getSelection()
      return !!selection && selection.length > 0
    }, 10000)
    
    const selection = await miro.board.experimental.getSelection()
    if (!selection || selection.length === 0) {
      throw new Error('No objects selected after clicking the template.')
    }
    
    // Find a text object in the selection
    const textObject = selection.find((obj: any) => obj.type === 'text')
    if (!textObject) {
      throw new Error('No text object found in the selection.')
    }
    
    // Update only the text content of the text object
    textObject.content = enteredName
    await textObject.sync()
    
    // Apply link to the non-text object
    const nonTextObject = selection.find((obj: any) => obj.type !== 'text')
    if (nonTextObject) {
      nonTextObject.linkedTo = fileLink
      await nonTextObject.sync()
    } else {
      // If no non-text object is found, apply the link to the text object instead
      textObject.linkedTo = fileLink
      await textObject.sync()
    }
  }
}
