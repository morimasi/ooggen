import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { SettingsService } from '../../services/settings.service';
import { ExportService } from '../../services/export.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  template: `
    <header class="h-16 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex items-center px-6 justify-between flex-shrink-0">
      <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200">{{ title() }}</h2>
      <div class="flex items-center space-x-3">
        <button (click)="shareWorksheet()" class="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-gray-800 transition-colors flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>
          {{ shareButtonText() }}
        </button>
        <button (click)="exportService.downloadAsPdf('printable-area')" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            PDF İndir
        </button>
        <button (click)="exportService.printWorksheet()" class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800 transition-colors flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Yazdır
        </button>
        <button (click)="settingsService.openHelpModal()" title="Yardım" class="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </header>
  `
})
export class HeaderComponent {
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  settingsService = inject(SettingsService);
  exportService = inject(ExportService);
  
  shareButtonText = signal('Paylaş');

  private routeData$ = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map(() => {
      let route = this.activatedRoute;
      while (route.firstChild) {
        route = route.firstChild;
      }
      return route;
    }),
    switchMap(route => route.data)
  );

  private routeData = toSignal(this.routeData$, {initialValue: {title: 'Yükleniyor...'}});

  title = computed(() => this.routeData()?.['title'] || 'Ana Sayfa');

  shareWorksheet() {
    const presetString = this.settingsService.getSettingsAsEncodedString();
    const currentPath = window.location.hash.split('/')[1] || 'math-readiness';
    const shareUrl = `${window.location.origin}${window.location.pathname}#/${currentPath}/${presetString}`;

    navigator.clipboard.writeText(shareUrl).then(() => {
      this.shareButtonText.set('Kopyalandı!');
      setTimeout(() => this.shareButtonText.set('Paylaş'), 2000);
    }).catch(err => {
      console.error('Could not copy text: ', err);
      this.shareButtonText.set('Hata!');
      setTimeout(() => this.shareButtonText.set('Paylaş'), 2000);
    });
  }
}