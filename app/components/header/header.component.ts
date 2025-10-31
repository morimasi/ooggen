import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  template: `
    <header class="h-16 bg-white border-b flex items-center px-6 justify-between flex-shrink-0">
      <h2 class="text-xl font-semibold text-gray-700">{{ title() }}</h2>
      <div>
        <button class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            PDF İndir
        </button>
      </div>
    </header>
  `
})
export class HeaderComponent {
  // FIX: Explicitly type injected dependencies to fix "property does not exist on type 'unknown'" errors.
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  private routeData$ = this.router.events.pipe(
    // FIX: Use a type guard in the filter operator to ensure the correct event type for subsequent operators.
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
}
