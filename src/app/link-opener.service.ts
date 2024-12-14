import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkOpenerService {
  constructor(private http: HttpClient) {} // Inject HttpClient

  openLink(link: string): void {
    const data = this.createData(link);
    this.sendPostRequest(data);
  }

  private createData(link: string): any {
    switch (true) {
      case link.includes('https://select//'):
        return { Arg1: 'openSelection', Arg2: link };
        case link.includes('https://code-book//'):
          return { Arg1: 'openCodeBook', Arg2: link };
      case link.includes('obsidian'):
        return { Arg1: 'openObsidian', Arg2: link };
      default:
        return { Arg1: 'openCanary', Arg2: link };
    }
  }

  private sendPostRequest(data: any): void {
    this.http.post('http://localhost:5199/Commands/ExecuteCommand', data)
      .pipe(
        catchError(error => {
          console.error('Error:', error);
          return throwError(() => error); // Updated to the new throwError syntax
        })
      )
      .subscribe(responseData => console.log('Success:', responseData));
  }
}
