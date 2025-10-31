import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings-panel',
  imports: [CommonModule],
  template: `
    <aside class="w-80 bg-white shadow-md p-6 border-l flex-col space-y-6 overflow-y-auto hidden md:flex">
      <h3 class="text-lg font-semibold border-b pb-2 text-gray-800">Çalışma Sayfası Ayarları</h3>
      
      <div>
        <label for="itemCount" class="block text-sm font-medium text-gray-700">Nesne Sayısı: <span class="font-bold">{{ settings().itemCount }}</span></label>
        <input 
          id="itemCount" 
          type="range" 
          min="1" 
          max="10" 
          [value]="settings().itemCount"
          (input)="onItemCountChange($event)"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2">
      </div>

      <div>
        <label for="category" class="block text-sm font-medium text-gray-700">Kategori</label>
        <select 
          id="category" 
          [value]="settings().category"
          (change)="onCategoryChange($event)"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          <option value="fruits">Meyveler</option>
          <option value="animals">Hayvanlar</option>
          <option value="vehicles">Taşıtlar</option>
          <option value="shapes">Şekiller</option>
        </select>
      </div>

       <div>
        <label for="itemSize" class="block text-sm font-medium text-gray-700">Nesne Boyutu: <span class="font-bold">{{ settings().itemSize }}%</span></label>
        <input 
          id="itemSize" 
          type="range" 
          min="50" 
          max="200" 
          step="10"
          [value]="settings().itemSize"
          (input)="onItemSizeChange($event)"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2">
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Sayfa Düzeni</label>
        <div class="relative z-0 inline-flex shadow-sm rounded-md w-full">
          <button 
            type="button" 
            (click)="updateLayout('flow')"
            [class.bg-indigo-600]="settings().layout === 'flow'"
            [class.text-white]="settings().layout === 'flow'"
            [class.bg-white]="settings().layout !== 'flow'"
            [class.text-gray-700]="settings().layout !== 'flow'"
            class="relative inline-flex items-center justify-center w-1/2 px-4 py-2 rounded-l-md border border-gray-300 text-sm font-medium hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
            Akış
          </button>
          <button 
            type="button" 
            (click)="updateLayout('grid')"
            [class.bg-indigo-600]="settings().layout === 'grid'"
            [class.text-white]="settings().layout === 'grid'"
            [class.bg-white]="settings().layout !== 'grid'"
            [class.text-gray-700]="settings().layout !== 'grid'"
            class="-ml-px relative inline-flex items-center justify-center w-1/2 px-4 py-2 rounded-r-md border border-gray-300 text-sm font-medium hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
            Tablo
          </button>
        </div>
      </div>

      <div>
        <label for="background" class="block text-sm font-medium text-gray-700">Arka Plan</label>
        <select 
          id="background" 
          [value]="settings().background"
          (change)="onBackgroundChange($event)"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          <option value="plain">Düz</option>
          <option value="lined">Çizgili</option>
          <option value="squared">Kareli</option>
          <option value="dotted">Noktalı</option>
        </select>
      </div>
      
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-700">Sayıları Göster</span>
        <button 
          type="button" 
          [class.bg-indigo-600]="settings().showNumbers"
          [class.bg-gray-200]="!settings().showNumbers"
          (click)="toggleShowNumbers()"
          class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
          role="switch">
          <span 
            [class.translate-x-5]="settings().showNumbers"
            [class.translate-x-0]="!settings().showNumbers"
            class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
        </button>
      </div>
      
      <div class="border-t pt-6 space-y-2 !mt-auto">
         <button class="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
          Ayarları Kaydet
        </button>
        <button class="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
          Ayarları Yükle
        </button>
      </div>
    </aside>
  `
})
export class SettingsPanelComponent {
  settingsService = inject(SettingsService);
  settings = this.settingsService.settings.asReadonly();

  onItemCountChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.settingsService.updateSetting('itemCount', parseInt(value, 10));
  }

  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as 'animals' | 'fruits' | 'vehicles' | 'shapes';
    this.settingsService.updateSetting('category', value);
  }

  onItemSizeChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.settingsService.updateSetting('itemSize', parseInt(value, 10));
  }

  updateLayout(layout: 'flow' | 'grid') {
    this.settingsService.updateSetting('layout', layout);
  }

  onBackgroundChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as 'plain' | 'lined' | 'squared' | 'dotted';
    this.settingsService.updateSetting('background', value);
  }
  
  toggleShowNumbers() {
    this.settingsService.updateSetting('showNumbers', !this.settings().showNumbers);
  }
}