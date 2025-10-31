import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

interface MenuItem {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="w-64 bg-white dark:bg-gray-800 shadow-md flex-col flex-shrink-0 hidden lg:flex">
      <div class="h-16 flex items-center justify-center border-b dark:border-gray-700">
        <h1 class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">MathGen</h1>
      </div>
      <nav class="flex-1 px-4 py-6 space-y-2">
        @for (item of menuItems(); track item.path) {
          <a
            [routerLink]="item.path"
            routerLinkActive="bg-indigo-50 text-indigo-600 font-semibold dark:bg-gray-700 dark:text-white"
            class="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-white rounded-md transition-colors duration-200"
          >
            <div [innerHTML]="item.icon | safeHtml" class="w-6 h-6 mr-3"></div>
            <span>{{ item.label }}</span>
          </a>
        }
      </nav>

      <div class="p-4 border-t dark:border-gray-700 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Tema</span>
          <button (click)="settingsService.toggleTheme()" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
            @if(uiState().theme === 'light') {
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            }
          </button>
        </div>
        <div class="border-t dark:border-gray-700 pt-4 flex justify-center space-x-4">
            <a href="#" title="X / Twitter" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href="#" title="Instagram" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" ><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163m0-1.087C8.74 1.076 8.344 1.088 7.108 1.145c-3.636.166-6.096 2.62-6.262 6.262C.788 8.64.777 9.036.777 12s.011 3.36.069 4.592c.166 3.636 2.62 6.096 6.262 6.262 1.244.057 1.64.069 4.892.069s3.648-.012 4.892-.069c3.636-.166 6.096-2.62 6.262-6.262.057-1.244.069-1.64.069-4.892s-.012-3.648-.069-4.892c-.166-3.636-2.62-6.096-6.262-6.262C15.66 1.088 15.264 1.076 12 1.076M12 6.837a5.163 5.163 0 1 0 0 10.326 5.163 5.163 0 0 0 0-10.326M12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6m4.805-7.875a1.282 1.282 0 1 0 0-2.564 1.282 1.282 0 0 0 0 2.564" /></svg>
            </a>
        </div>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  settingsService = inject(SettingsService);
  uiState = this.settingsService.uiState.asReadonly();
  
  menuItems = signal<MenuItem[]>([
    { path: '/dashboard', label: 'Ana Sayfa', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>' },
    { path: '/math-readiness', label: 'Matematiğe Hazırlık', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17.25v-4.5m0 4.5h4.5m-4.5 0l6-6m3 6v-4.5m0 4.5h-4.5m4.5 0l-6-6m-3 6h12a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5H6" /></svg>' },
    { path: '/visual-support', label: 'Görsel Destek', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>' },
    { path: '/rhythmic-counting', label: 'Ritmik Sayma', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l11-4v13M9 19c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm11-13.34V19c0 1.105-.895 2-2 2s-2-.895-2-2V5.66" /></svg>' },
    { path: '/measurements', label: 'Ölçümler', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' },
    { path: '/special-learning', label: 'Özel Öğrenme', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>' },
  ]);
}
