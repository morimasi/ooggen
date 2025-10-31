import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { SettingsPanelComponent } from './components/settings-panel/settings-panel.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="flex h-screen bg-gray-100 text-gray-800">
      <app-sidebar></app-sidebar>
      <div class="flex-1 flex flex-col overflow-hidden">
        <app-header></app-header>
        <main class="flex-1 p-6 overflow-y-auto">
          <router-outlet></router-outlet>
        </main>
      </div>
      <app-settings-panel></app-settings-panel>
    </div>
  `,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, SettingsPanelComponent],
})
export class AppComponent {}
