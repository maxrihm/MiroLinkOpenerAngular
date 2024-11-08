import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkOpenerService {
  constructor() {}

  openLink(link: string): void {
    const data = this.createData(link);
    this.sendPostRequest(data);
  }

  private createData(link: string): any {
    if (link.includes('obsidian')) {
      return { Arg1: 'openObsidian', Arg2: link };
    } else {
      return { Arg1: 'openCanary', Arg2: link };
    }
  }

  private sendPostRequest(data: any): void {
    fetch('http://localhost:5199/Commands/ExecuteCommand', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((responseData) => console.log('Success:', responseData))
      .catch((error) => console.error('Error:', error));
  }
}
