import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class TemplatesListService {
  private templatesSubject = new BehaviorSubject<string[]>(['Book-medium', 'Question'])
  templates$ = this.templatesSubject.asObservable()
  private templates: string[] = ['Book-medium', 'Question']

  constructor(private http: HttpClient) {
    this.loadTemplates()
  }

  private loadTemplates() {
    this.http.get('assets/templates.txt', { responseType: 'text' })
      .pipe(
        catchError(error => {
          console.error('Error loading templates:', error)
          return of('Book-medium\nQuestion')
        }),
        tap(data => {
          console.log('Templates loaded:', data)
        })
      )
      .subscribe(data => {
        this.templates = data
          .split('\n')
          .map(line => line.trim())
          .filter(line => line !== '')
        this.templatesSubject.next(this.templates)
        console.log('Processed templates:', this.templates)
      })
  }

  getTemplates(): string[] {
    return this.templates
  }
}
