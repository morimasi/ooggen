import { Injectable, signal } from '@angular/core';

export interface WorksheetSettings {
  category: 'animals' | 'fruits' | 'vehicles' | 'shapes';
  itemCount: number;
  itemSize: number; // as a percentage
  layout: 'flow' | 'grid';
  showNumbers: boolean;
  background: 'plain' | 'lined' | 'squared' | 'dotted';
}

const initialSettings: WorksheetSettings = {
  category: 'fruits',
  itemCount: 5,
  itemSize: 100,
  layout: 'flow',
  showNumbers: true,
  background: 'plain',
};

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  settings = signal<WorksheetSettings>(initialSettings);

  updateSetting<K extends keyof WorksheetSettings>(key: K, value: WorksheetSettings[K]) {
    this.settings.update(s => ({ ...s, [key]: value }));
  }
}