import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { TEMPLATES } from '../constants/templates.constants'

@Injectable({ providedIn: 'root' })
export class TemplatesListService {
  private templatesSubject = new BehaviorSubject<string[]>(TEMPLATES)
  templates$ = this.templatesSubject.asObservable()
  private templates: string[] = TEMPLATES

  constructor() {}

  getTemplates(): string[] {
    return this.templates
  }
}
