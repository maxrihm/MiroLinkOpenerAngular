import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface NodeSettings {
  extension: string;
  size: string;
  nodeType: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private defaultSettings: NodeSettings = {
    extension: '.canvas',
    size: 'medium',
    nodeType: 'node'
  };

  private lastUsedSettings = new BehaviorSubject<NodeSettings>(this.defaultSettings);

  constructor() {}

  get settings() {
    return this.lastUsedSettings.asObservable();
  }

  get currentSettings(): NodeSettings {
    return this.lastUsedSettings.getValue();
  }

  updateSettings(settings: Partial<NodeSettings>) {
    this.lastUsedSettings.next({
      ...this.currentSettings,
      ...settings
    });
  }

  resetSettings() {
    this.lastUsedSettings.next(this.defaultSettings);
  }
}
