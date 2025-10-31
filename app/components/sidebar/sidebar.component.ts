import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="w-64 bg-white shadow-md flex-col flex-shrink-0 hidden lg:flex">
      <div class="h-16 flex items-center justify-center border-b">
        <h1 class="text-2xl font-bold text-indigo-600">MathGen</h1>
      </div>
      <nav class="flex-1 px-4 py-6 space-y-2">
        @for (item of menuItems(); track item.path) {
          <a
            [routerLink]="item.path"
            routerLinkActive="bg-indigo-50 text-indigo-600 font-semibold"
            class="flex items-center px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-md transition-colors duration-200"
          >
            <div [innerHTML]="item.icon | safeHtml" class="w-6 h-6 mr-3"></div>
            <span>{{ item.label }}</span>
          </a>
        }
      </nav>
      <div class="p-4 border-t">
         <a href="#" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Genel Ayarlar</span>
         </a>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  menuItems = signal<MenuItem[]>([
    { path: '/dashboard', label: 'Ana Sayfa', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>' },
    { path: '/math-readiness', label: 'Matematiğe Hazırlık', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17.25v-4.5m0 4.5h4.5m-4.5 0l6-6m3 6v-4.5m0 4.5h-4.5m4.5 0l-6-6m-3 6h12a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5H6" /></svg>' },
    { path: '/visual-support', label: 'Görsel Destek', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>' },
    { path: '/rhythmic-counting', label: 'Ritmik Sayma', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l11-4v13M9 19c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm11-13.34V19c0 1.105-.895 2-2 2s-2-.895-2-2V5.66" /></svg>' },
    { path: '/measurements', label: 'Ölçümler', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' },
    { path: '/special-learning', label: 'Özel Öğrenme', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>' },
  ]);
}
