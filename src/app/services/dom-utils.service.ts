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

  // Utility to wait until a condition is met

  async waitForCondition(conditionFn: () => Promise<boolean>, timeout = 10000): Promise<void> {

    const start = Date.now();

    return new Promise((resolve, reject) => {

      const checkCondition = async () => {

        if (await conditionFn()) {

          resolve();

        } else if (Date.now() - start >= timeout) {

          reject(new Error(`Condition not met within timeout.`));

        } else {

          setTimeout(checkCondition, 100);

        }

      };

      checkCondition();

    });

  }

} 