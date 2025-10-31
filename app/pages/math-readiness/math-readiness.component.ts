import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-math-readiness',
  imports: [CommonModule],
  template: `
    <div class="p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-md h-full">
        <h3 class="text-xl font-semibold mb-6 border-b pb-3 text-gray-700">Rakam Tanıma ve Sayma</h3>
        <div 
            class="p-4 border-dashed border-2 border-gray-300 rounded-lg min-h-[60vh] flex flex-col items-stretch justify-center space-y-8"
            [style]="backgroundStyle()"
        >
          @if (settings().showNumbers) {
            <div class="text-8xl font-bold text-indigo-600 select-none text-center">{{ settings().itemCount }}</div>
          }
          <div 
            class="w-full flex-1 justify-center items-center gap-6"
            [class.flex]="settings().layout === 'flow'"
            [class.flex-wrap]="settings().layout === 'flow'"
            [class.grid]="settings().layout === 'grid'"
            [class.grid-cols-5]="settings().layout === 'grid'"
            [class.content-center]="settings().layout === 'grid'"
          >
              @for (item of items(); track $index) {
                <div 
                  class="text-6xl transition-transform duration-200 hover:scale-110 cursor-pointer flex items-center justify-center"
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
  settings = this.settingsService.settings.asReadonly();
  
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
    // base size is 4rem (text-6xl), scale it by itemSize percentage
    return 4 * (this.settings().itemSize / 100);
  });

  backgroundStyle = computed(() => {
    const bg = this.settings().background;
    switch (bg) {
      case 'lined':
        return { 
          'background-image': 'linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
          'background-size': '100% 2.5rem'
        };
      case 'squared':
        return {
          'background-image': 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
          'background-size': '2rem 2rem'
        };
      case 'dotted':
         return {
          'background-image': 'radial-gradient(#d1d5db 1.5px, transparent 1.5px)',
          'background-size': '2rem 2rem',
        };
      default:
        return {};
    }
  });
}