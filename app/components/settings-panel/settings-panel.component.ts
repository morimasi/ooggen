import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, WorksheetSettings, Preset } from '../../services/settings.service';

@Component({
  selector: 'app-settings-panel',
  imports: [CommonModule],
  template: `
    <aside class="w-80 bg-white dark:bg-gray-800 shadow-md p-6 border-l dark:border-gray-700 flex-col space-y-6 overflow-y-auto hidden md:flex">
      <h3 class="text-lg font-semibold border-b pb-2 text-gray-800 dark:text-gray-100 dark:border-gray-600">Çalışma Sayfası Ayarları</h3>
      
      <div>
        <label for="itemCount" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nesne Sayısı: <span class="font-bold">{{ settings().itemCount }}</span></label>
        <input 
          id="itemCount" 
          type="range" 
          min="1" 
          max="10" 
          [value]="settings().itemCount"
          (input)="onSettingChange('itemCount', $event)"
          class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer mt-2">
      </div>

      <div>
        <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kategori</label>
        <select 
          id="category" 
          [value]="settings().category"
          (change)="onSettingChange('category', $event)"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          <option value="fruits">Meyveler</option>
          <option value="animals">Hayvanlar</option>
          <option value="vehicles">Taşıtlar</option>
          <option value="shapes">Şekiller</option>
        </select>
      </div>

       <div>
        <label for="itemSize" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nesne Boyutu: <span class="font-bold">{{ settings().itemSize }}%</span></label>
        <input 
          id="itemSize" 
          type="range" 
          min="50" 
          max="200" 
          step="10"
          [value]="settings().itemSize"
          (input)="onSettingChange('itemSize', $event)"
          class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer mt-2">
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sayfa Düzeni</label>
        <div class="relative z-0 inline-flex shadow-sm rounded-md w-full">
          <button 
            type="button" 
            (click)="updateSetting('layout', 'flow')"
            [class.bg-indigo-600]="settings().layout === 'flow'"
            [class.text-white]="settings().layout === 'flow'"
            [class.bg-white]="settings().layout !== 'flow'"
            [class.dark:bg-gray-700]="settings().layout !== 'flow'"
            [class.text-gray-700]="settings().layout !== 'flow'"
            [class.dark:text-gray-200]="settings().layout !== 'flow'"
            class="relative inline-flex items-center justify-center w-1/2 px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
            Akış
          </button>
          <button 
            type="button" 
            (click)="updateSetting('layout', 'grid')"
            [class.bg-indigo-600]="settings().layout === 'grid'"
            [class.text-white]="settings().layout === 'grid'"
            [class.bg-white]="settings().layout !== 'grid'"
            [class.dark:bg-gray-700]="settings().layout !== 'grid'"
            [class.text-gray-700]="settings().layout !== 'grid'"
            [class.dark:text-gray-200]="settings().layout !== 'grid'"
            class="-ml-px relative inline-flex items-center justify-center w-1/2 px-4 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
            Tablo
          </button>
        </div>
      </div>

      <div>
        <label for="background" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Arka Plan</label>
        <select 
          id="background" 
          [value]="settings().background"
          (change)="onSettingChange('background', $event)"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          <option value="plain">Düz</option>
          <option value="lined">Çizgili</option>
          <option value="squared">Kareli</option>
          <option value="dotted">Noktalı</option>
        </select>
      </div>

      <div class="border-t dark:border-gray-600 pt-4 space-y-6">
        <div class="flex items-center justify-between">
          <label for="themeColor" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Ana Renk</label>
           <input 
            type="color" 
            id="themeColor"
            [value]="settings().themeColor"
            (input)="onSettingChange('themeColor', $event)"
            class="p-1 h-8 w-14 block bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none">
        </div>

        <div>
          <label for="fontFamily" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Yazı Tipi</label>
          <select 
            id="fontFamily" 
            [value]="settings().fontFamily"
            (change)="onSettingChange('fontFamily', $event)"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option value="inter">Standart (Inter)</option>
            <option value="lexend">Disleksi Dostu (Lexend)</option>
            <option value="comic-neue">Eğlenceli (Comic Neue)</option>
          </select>
        </div>

        <div>
          <label for="borderStyle" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kenarlık Stili</label>
          <select 
            id="borderStyle" 
            [value]="settings().borderStyle"
            (change)="onSettingChange('borderStyle', $event)"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option value="none">Yok</option>
            <option value="solid">Düz Çizgi</option>
            <option value="dashed">Kesik Çizgi</option>
            <option value="shadow">Gölge</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hizalama</label>
          <div class="relative z-0 inline-flex shadow-sm rounded-md w-full">
            <button 
              type="button" 
              (click)="updateSetting('alignment', 'left')"
              [class.bg-indigo-600]="settings().alignment === 'left'"
              [class.text-white]="settings().alignment === 'left'"
              [class.dark:bg-gray-700]="settings().alignment !== 'left'"
              [class.dark:text-gray-200]="settings().alignment !== 'left'"
              class="relative inline-flex items-center justify-center w-1/3 px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 5A.75.75 0 012.75 9h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 9.75zm0 5A.75.75 0 012.75 14h10.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clip-rule="evenodd"></path></svg>
            </button>
            <button 
              type="button" 
              (click)="updateSetting('alignment', 'center')"
              [class.bg-indigo-600]="settings().alignment === 'center'"
              [class.text-white]="settings().alignment === 'center'"
              [class.dark:bg-gray-700]="settings().alignment !== 'center'"
              [class.dark:text-gray-200]="settings().alignment !== 'center'"
              class="-ml-px relative inline-flex items-center justify-center w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 5A.75.75 0 012.75 9h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 9.75zM5.25 14a.75.75 0 01.75-.75h8a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75z" clip-rule="evenodd"></path></svg>
            </button>
            <button 
              type="button" 
              (click)="updateSetting('alignment', 'right')"
              [class.bg-indigo-600]="settings().alignment === 'right'"
              [class.text-white]="settings().alignment === 'right'"
              [class.dark:bg-gray-700]="settings().alignment !== 'right'"
              [class.dark:text-gray-200]="settings().alignment !== 'right'"
              class="-ml-px relative inline-flex items-center justify-center w-1/3 px-4 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 5A.75.75 0 012.75 9h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 9.75zM6.25 14a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H7a.75.75 0 01-.75-.75z" clip-rule="evenodd"></path></svg>
            </button>
          </div>
        </div>
        
        @if (settings().layout === 'grid') {
          <div>
            <label for="gridColumns" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Sütun Sayısı: <span class="font-bold">{{ settings().gridColumns }}</span></label>
            <input 
              id="gridColumns" 
              type="range" 
              min="2" 
              max="10" 
              [value]="settings().gridColumns"
              (input)="onSettingChange('gridColumns', $event)"
              class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer mt-2">
          </div>
        }
      </div>
      
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Sayıları Göster</span>
        <button 
          type="button" 
          [class.bg-indigo-600]="settings().showNumbers"
          [class.bg-gray-200]="!settings().showNumbers"
          [class.dark:bg-gray-600]="!settings().showNumbers"
          (click)="toggleShowNumbers()"
          class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
          role="switch">
          <span 
            [class.translate-x-5]="settings().showNumbers"
            [class.translate-x-0]="!settings().showNumbers"
            class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
        </button>
      </div>
      
      <div class="border-t dark:border-gray-600 pt-4 mt-auto space-y-4">
        <h4 class="text-sm font-semibold text-gray-600 dark:text-gray-400">Ayar Setleri</h4>
        
        <button (click)="handleSavePreset()" class="w-full justify-center text-left flex items-center px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
          Mevcut Ayarları Kaydet
        </button>
        
        <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
            @if (sortedPresets().length === 0) {
              <p class="text-xs text-gray-500 dark:text-gray-400 text-center italic py-2">Kaydedilmiş ayar seti bulunmuyor.</p>
            }
            @for (preset of sortedPresets(); track preset.id) {
              <div class="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                <span class="text-sm font-medium text-gray-800 dark:text-gray-200 truncate mr-2">{{ preset.name }}</span>
                <div class="flex items-center space-x-1 flex-shrink-0">
                  <button (click)="handleToggleFavorite(preset.id)" [title]="preset.isFavorite ? 'Favorilerden Kaldır' : 'Favorilere Ekle'" class="p-1 text-gray-500 dark:text-gray-400 hover:bg-yellow-100 dark:hover:bg-gray-600 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" [class.fill-yellow-400]="preset.isFavorite" [class.text-yellow-400]="preset.isFavorite" [class.text-gray-400]="!preset.isFavorite" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  </button>
                  <button (click)="handleLoadPreset(preset.id)" title="Yükle" class="p-1 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-gray-600 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  </button>
                   <button (click)="handleDeletePreset(preset.id)" title="Sil" class="p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-gray-600 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            }
        </div>
      </div>
    </aside>
  `
})
export class SettingsPanelComponent {
  settingsService = inject(SettingsService);
  settings = this.settingsService.settings.asReadonly();
  presets = this.settingsService.presets.asReadonly();
  
  sortedPresets = computed(() => {
    return [...this.presets()].sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return 0; // or sort by name/date if needed
    });
  });

  onSettingChange(key: keyof WorksheetSettings, event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    let value: string | number = target.value;
  
    if (target.type === 'range' || key === 'gridColumns') {
      value = parseInt(value, 10);
    }
    
    this.settingsService.updateSetting(key, value as any);
  }

  updateSetting<K extends keyof WorksheetSettings>(key: K, value: WorksheetSettings[K]) {
    this.settingsService.updateSetting(key, value);
  }
  
  toggleShowNumbers() {
    this.settingsService.updateSetting('showNumbers', !this.settings().showNumbers);
  }

  handleSavePreset() {
    const name = prompt(`Ayar seti için bir ad girin:`, `Ayar Seti ${this.presets().length + 1}`);
    if (name && name.trim().length > 0) {
      this.settingsService.saveCurrentSettingsAsPreset(name.trim());
    }
  }

  handleLoadPreset(id: string) {
    this.settingsService.loadPreset(id);
  }

  handleDeletePreset(id: string) {
    if (confirm('Bu ayar setini silmek istediğinizden emin misiniz?')) {
      this.settingsService.deletePreset(id);
    }
  }

  handleToggleFavorite(id: string) {
    this.settingsService.toggleFavoritePreset(id);
  }
}