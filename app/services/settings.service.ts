import { Injectable, signal } from '@angular/core';

export interface WorksheetSettings {
  category: 'animals' | 'fruits' | 'vehicles' | 'shapes';
  itemCount: number;
  itemSize: number; // as a percentage
  layout: 'flow' | 'grid';
  showNumbers: boolean;
  background: 'plain' | 'lined' | 'squared' | 'dotted';
  borderStyle: 'none' | 'solid' | 'dashed' | 'shadow';
  alignment: 'left' | 'center' | 'right';
  gridColumns: number;
  fontFamily: 'inter' | 'lexend' | 'comic-neue';
  themeColor: string;
}

export interface Preset {
  id: string;
  name: string;
  settings: WorksheetSettings;
  isFavorite?: boolean;
}

export interface UiState {
  theme: 'light' | 'dark';
  isHelpModalOpen: boolean;
}

const initialSettings: WorksheetSettings = {
  category: 'fruits',
  itemCount: 5,
  itemSize: 100,
  layout: 'flow',
  showNumbers: true,
  background: 'plain',
  borderStyle: 'none',
  alignment: 'center',
  gridColumns: 5,
  fontFamily: 'inter',
  themeColor: '#4f46e5', // a default indigo color
};

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  settings = signal<WorksheetSettings>(initialSettings);
  presets = signal<Preset[]>([]);
  uiState = signal<UiState>({ theme: 'light', isHelpModalOpen: false });

  private readonly PRESETS_STORAGE_KEY = 'mathgen-presets';
  private readonly THEME_STORAGE_KEY = 'mathgen-theme';

  constructor() {
    this.loadPresetsFromStorage();
    this.loadThemeFromStorage();
  }

  updateSetting<K extends keyof WorksheetSettings>(key: K, value: WorksheetSettings[K]) {
    this.settings.update(s => ({ ...s, [key]: value }));
  }

  // UI State Management
  private loadThemeFromStorage() {
    try {
      if (typeof localStorage !== 'undefined') {
        const storedTheme = localStorage.getItem(this.THEME_STORAGE_KEY);
        if (storedTheme === 'dark' || storedTheme === 'light') {
          this.uiState.update(state => ({ ...state, theme: storedTheme }));
        } else {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          this.uiState.update(state => ({ ...state, theme: prefersDark ? 'dark' : 'light' }));
        }
      }
    } catch (e) {
      console.error('Error loading theme from localStorage', e);
    }
  }

  private _saveThemeToLocalStorage(theme: 'light' | 'dark') {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.THEME_STORAGE_KEY, theme);
      }
    } catch (e) {
      console.error('Error saving theme to localStorage', e);
    }
  }

  toggleTheme() {
    this.uiState.update(state => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      this._saveThemeToLocalStorage(newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { ...state, theme: newTheme };
    });
  }

  openHelpModal() {
    this.uiState.update(state => ({ ...state, isHelpModalOpen: true }));
  }

  closeHelpModal() {
    this.uiState.update(state => ({ ...state, isHelpModalOpen: false }));
  }
  
  // Preset Management
  private loadPresetsFromStorage() {
    try {
      if (typeof localStorage !== 'undefined') {
        const storedPresets = localStorage.getItem(this.PRESETS_STORAGE_KEY);
        if (storedPresets) {
          this.presets.set(JSON.parse(storedPresets));
        }
      }
    } catch (e) {
      console.error('Error loading presets from localStorage', e);
    }
  }

  private _savePresetsToLocalStorage(presets: Preset[]) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.PRESETS_STORAGE_KEY, JSON.stringify(presets));
      }
    } catch (e) {
      console.error('Error saving presets to localStorage', e);
    }
  }

  saveCurrentSettingsAsPreset(name: string) {
    const newPreset: Preset = {
      id: Date.now().toString(),
      name,
      settings: this.settings(),
      isFavorite: false,
    };
    const updatedPresets = [...this.presets(), newPreset];
    this.presets.set(updatedPresets);
    this._savePresetsToLocalStorage(updatedPresets);
  }

  loadPreset(id: string) {
    const preset = this.presets().find(p => p.id === id);
    if (preset) {
      this.settings.set(preset.settings);
    }
  }

  deletePreset(id: string) {
    const updatedPresets = this.presets().filter(p => p.id !== id);
    this.presets.set(updatedPresets);
    this._savePresetsToLocalStorage(updatedPresets);
  }

  toggleFavoritePreset(id: string) {
    const updatedPresets = this.presets().map(p => 
      p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
    );
    this.presets.set(updatedPresets);
    this._savePresetsToLocalStorage(updatedPresets);
  }

  // Sharing functionality
  getSettingsAsEncodedString(): string {
    const settingsString = JSON.stringify(this.settings());
    return btoa(settingsString); // Base64 encode
  }

  loadSettingsFromEncodedString(encodedString: string): void {
    try {
      const decodedString = atob(encodedString); // Base64 decode
      const loadedSettings = JSON.parse(decodedString);
      
      // Basic validation to ensure it's a valid settings object
      if (loadedSettings && typeof loadedSettings === 'object' && 'itemCount' in loadedSettings) {
         this.settings.set({ ...initialSettings, ...loadedSettings });
      } else {
        console.error('Invalid settings string provided.');
      }
    } catch (error) {
      console.error('Failed to load settings from string:', error);
    }
  }
}