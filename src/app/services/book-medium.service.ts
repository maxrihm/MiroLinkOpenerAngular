import { Injectable } from '@angular/core';
import { DomUtilsService } from './dom-utils.service';

declare var miro: any;

@Injectable({ providedIn: 'root' })
export class BookMediumService {
  constructor(private domUtils: DomUtilsService) {}

  async createBookMedium(fileLink: string, enteredName: string): Promise<void> {
    // Step 1: Open the templates menu
    const templateButton = document.getElementById('CreationBarButton--TEMPLATES');
    if (!templateButton) {
      throw new Error('Button with ID "CreationBarButton--TEMPLATES" not found.');
    }
    templateButton.click();

    // Wait for "Personal"
    const personalSpan = await this.domUtils.waitForElement('span', 'Personal');
    const personalButton = personalSpan.closest('button'); 
    if (!personalButton) {
      throw new Error('Parent button for "Personal" not found.');
    }
    personalButton.click();

    // Wait for "Book-medium"
    const bookMediumSpan = await this.domUtils.waitForElement('span', 'Book-medium');
    const bookButton = bookMediumSpan.closest('button');
    if (!bookButton) {
      throw new Error('Parent button for "Book-medium" not found.');
    }
    bookButton.click();

    // After clicking book-medium, we need to wait until selection has 2 objects
    await this.domUtils.waitForCondition(async () => {
      const selection = await miro.board.experimental.getSelection();
      return selection && selection.length === 2;
    }, 10000);

    const selection = await miro.board.experimental.getSelection();
    if (!selection || selection.length !== 2) {
      throw new Error('Did not get exactly two objects in selection for Book-medium.');
    }

    // Find stencil and text objects
    const stencilObject = selection.find((obj: any) => obj.type === 'stencil');
    const textObject = selection.find((obj: any) => obj.type === 'text');

    if (!stencilObject || !textObject) {
      throw new Error('Expected one stencil and one text object.');
    }

    // Assign link to stencil
    stencilObject.linkedTo = fileLink;

    // Assign text
    textObject.content = enteredName;

    // Sync objects
    await stencilObject.sync();
    await textObject.sync();
  }
}
