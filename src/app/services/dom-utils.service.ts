import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DomUtilsService {

  waitForElement(selector: string, checkText: string | null = null, timeout = 10000): Promise<HTMLElement> {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();

      const check = () => {
        const elements = document.querySelectorAll<HTMLElement>(selector);
        const matchedElement = Array.from(elements).find(el =>
          checkText ? el.textContent?.trim() === checkText : el
        );
        if (matchedElement) {
          resolve(matchedElement);
        } else if (Date.now() - startTime >= timeout) {
          reject(new Error(`Element "${checkText || selector}" not found within timeout.`));
        } else {
          setTimeout(check, 100);
        }
      };

      check();
    });
  }

  /**
   * Waits until the provided async condition function returns true, or until timeout.
   * @param conditionFn A function that returns a Promise<boolean>
   * @param timeout Timeout in ms
   */
  async waitForCondition(conditionFn: () => Promise<boolean>, timeout = 10000): Promise<void> {
    const start = Date.now();
    return new Promise((resolve, reject) => {
      const checkCondition = async () => {
        try {
          const result = await conditionFn();
          if (result) {
            resolve();
          } else if (Date.now() - start >= timeout) {
            reject(new Error(`Condition not met within timeout.`));
          } else {
            setTimeout(checkCondition, 100);
          }
        } catch (error) {
          reject(error);
        }
      };
      checkCondition();
    });
  }
}
