import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

interface SubModule {
  id: string;
  title: string;
}

@Component({
  selector: 'app-math-readiness',
  imports: [CommonModule],
  template: `
    <div id="printable-area" class="p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md h-full flex flex-col">
      
      <div class="mb-6">
        <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200">Matematiğe Hazırlık Modülleri</h3>
        <div class="flex flex-wrap gap-2 mt-3 border-b dark:border-gray-700 pb-3">
          @for (module of subModules(); track module.id) {
            <button
              (click)="activeSubModule.set(module.id)"
              [class.bg-indigo-600]="activeSubModule() === module.id"
              [class.text-white]="activeSubModule() === module.id"
              [class.bg-gray-100]="activeSubModule() !== module.id"
              [class.dark:bg-gray-700]="activeSubModule() !== module.id"
              [class.text-gray-700]="activeSubModule() !== module.id"
              [class.dark:text-gray-200]="activeSubModule() !== module.id"
              class="px-3 py-1.5 text-sm font-medium rounded-md hover:bg-indigo-500 hover:text-white transition-colors">
              {{ module.title }}
            </button>
          }
        </div>
      </div>
      
      <div 
            class="p-4 border-dashed border-2 border-gray-300 dark:border-gray-600 rounded-lg min-h-[60vh] flex flex-col items-stretch justify-center space-y-8 flex-1"
            [style]="backgroundStyle()"
        >
          @if (settings().showNumbers) {
            <div 
              class="text-8xl font-bold select-none text-center"
              [style.color]="settings().themeColor"
            >{{ settings().itemCount }}</div>
          }
          <div 
            class="w-full flex-1 items-center gap-6"
            [class.flex]="settings().layout === 'flow'"
            [class.flex-wrap]="settings().layout === 'flow'"
            [class.grid]="settings().layout === 'grid'"
            [class]="containerAlignmentClass()"
            [style]="gridStyle()"
          >
              @for (item of items(); track $index) {
                <div 
                  class="text-6xl transition-all duration-200 hover:scale-110 cursor-pointer flex items-center justify-center"
                  [class]="itemBorderClass()"
                  [style.font-size.rem]="itemSizeInRem()"
                >
                  {{ item }}
                </div>
              }
          </div>
        </div>
    </div>
  `,
})
export class MathReadinessComponent {
  settingsService = inject(SettingsService);
  private route = inject(ActivatedRoute);

  settings = this.settingsService.settings.asReadonly();
  uiState = this.settingsService.uiState.asReadonly();

  activeSubModule = signal('number-recognition');
  subModules = signal<SubModule[]>([
      { id: 'matching-grouping', title: 'Eşleştirme ve Gruplama' },
      { id: 'quantity-comparison', title: 'Miktarları Karşılaştırma' },
      { id: 'number-recognition', title: 'Rakam Tanıma ve Sayma' },
      { id: 'patterns', title: 'Örüntüler' },
      { id: 'shapes', title: 'Temel Geometrik Şekiller' },
      { id: 'position-direction', title: 'Konum ve Yön' },
      { id: 'intro-measurement', title: 'Ölçmeye Giriş' },
      { id: 'data-graphics', title: 'Basit Grafikler ve Veri' },
  ]);

  private presetParam = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('preset')))
  );

  constructor() {
    const presetData = this.presetParam();
    if (presetData) {
      this.settingsService.loadSettingsFromEncodedString(presetData);
    }
  }
  
  private readonly EMOJIS = {
    fruits: ['🍓', '🍎', '🍌', '🍇', '🍉', '🥝', '🍊', '🍑', '🍍', '🥥'],
    animals: ['🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁'],
    vehicles: ['🚗', '🚕', '🚌', '🚑', '🚓', '🚚', '🚜', '🚲', '🛵', '✈️'],
    shapes: ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '🟤', '⚫️', '⚪️', '🟥']
  };

  items = computed(() => {
    const category = this.settings().category;
    const count = this.settings().itemCount;
    const emojiSet = this.EMOJIS[category];
    return Array.from({ length: count }, (_v, i) => emojiSet[i % emojiSet.length]);
  });

  itemSizeInRem = computed(() => {
    return 4 * (this.settings().itemSize / 100);
  });

  backgroundStyle = computed(() => {
    const bg = this.settings().background;
    const isDark = this.uiState().theme === 'dark';
    const lightColor = '#e5e7eb';
    const darkColor = '#4b5563';
    const color = isDark ? darkColor : lightColor;
    
    switch (bg) {
      case 'lined':
        return { 
          'background-image': `linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
          'background-size': '100% 2.5rem'
        };
      case 'squared':
        return {
          'background-image': `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
          'background-size': '2rem 2rem'
        };
      case 'dotted':
         return {
          'background-image': `radial-gradient(${color} 1.5px, transparent 1.5px)`,
          'background-size': '2rem 2rem',
        };
      default:
        return {};
    }
  });

  itemBorderClass = computed(() => {
    const style = this.settings().borderStyle;
    switch (style) {
      case 'solid':
        return 'border-2 border-gray-300 dark:border-gray-600 rounded-md p-2';
      case 'dashed':
        return 'border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-2';
      case 'shadow':
        return 'shadow-lg rounded-lg p-2 bg-white dark:bg-gray-700/50';
      default:
        return '';
    }
  });

  containerAlignmentClass = computed(() => {
    const alignment = this.settings().alignment;
    switch (alignment) {
      case 'left':
        return 'justify-start';
      case 'center':
        return 'justify-center';
      case 'right':
        return 'justify-end';
      default:
        return 'justify-center';
    }
  });

  gridStyle = computed(() => {
    if (this.settings().layout === 'grid') {
      return {
        'grid-template-columns': `repeat(${this.settings().gridColumns}, minmax(0, 1fr))`
      };
    }
    return {};
  });
}