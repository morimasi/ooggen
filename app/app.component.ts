import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { SettingsPanelComponent } from './components/settings-panel/settings-panel.component';
import { SettingsService } from './services/settings.service';
import { HelpModalComponent } from './components/help-modal/help-modal.component';

@Component({
  selector: 'app-root',
  template: `
    <div 
      class="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
      [class]="fontClass()">
      <app-sidebar></app-sidebar>
      <div class="flex-1 flex flex-col overflow-hidden">
        <app-header></app-header>
        <main class="flex-1 p-6 overflow-y-auto">
          <router-outlet></router-outlet>
        </main>
      </div>
      <app-settings-panel></app-settings-panel>
    </div>

    @if (uiState().isHelpModalOpen) {
      <app-help-modal></app-help-modal>
    }
  `,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent, SettingsPanelComponent, HelpModalComponent],
})
export class AppComponent {
  private settingsService = inject(SettingsService);
  private settings = this.settingsService.settings.asReadonly();
  uiState = this.settingsService.uiState.asReadonly();

  fontClass = computed(() => 'font-' + this.settings().fontFamily);
}
