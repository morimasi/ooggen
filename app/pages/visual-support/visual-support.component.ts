import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeminiService, GeneratedProblem } from '../../services/gemini.service';
import { FormsModule } from '@angular/forms';

type ProblemCategory = 'animals' | 'fruits' | 'vehicles' | 'shapes';
type ProblemOperation = 'addition' | 'subtraction';
type ProblemDifficulty = 'easy' | 'medium';

@Component({
  selector: 'app-visual-support',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md flex flex-col gap-8">
      <header>
        <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100">Yapay Zeka Destekli Problem Üretici</h2>
        <p class="mt-2 text-gray-600 dark:text-gray-300">
          Google Gemini AI kullanarak öğrencinizin seviyesine uygun, ilgi çekici ve görsel sözel problemler oluşturun.
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border dark:border-gray-700 rounded-lg">
        <!-- Form Controls -->
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Konu</label>
          <select id="category" [(ngModel)]="category" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option value="fruits">Meyveler</option>
            <option value="animals">Hayvanlar</option>
            <option value="vehicles">Taşıtlar</option>
            <!-- FIX: Added 'shapes' to the list of available categories. -->
            <option value="shapes">Şekiller</option>
          </select>
        </div>
        <div>
          <label for="operation" class="block text-sm font-medium text-gray-700 dark:text-gray-300">İşlem</label>
          <select id="operation" [(ngModel)]="operation" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option value="addition">Toplama</option>
            <option value="subtraction">Çıkarma</option>
          </select>
        </div>
        <div>
           <label for="difficulty" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Zorluk</label>
          <select id="difficulty" [(ngModel)]="difficulty" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option value="easy">Kolay (1-5 arası)</option>
            <option value="medium">Orta (1-10 arası)</option>
          </select>
        </div>
        <div class="flex items-end">
          <button (click)="generateProblem()" [disabled]="isLoading()" class="w-full justify-center flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors disabled:bg-indigo-400 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed">
            @if(isLoading()) {
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Üretiliyor...
            } @else {
               <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              Problem Üret
            }
          </button>
        </div>
      </div>

      <!-- Result Display -->
      <div class="p-6 border-2 border-dashed dark:border-gray-600 rounded-lg min-h-[300px] flex items-center justify-center">
        @if (isLoading()) {
          <p class="text-gray-500 dark:text-gray-400 italic">Yapay zeka sizin için bir problem hazırlıyor...</p>
        } @else if (errorMessage()) {
          <div class="text-center text-red-500">
            <h4 class="font-bold">Bir Hata Oluştu</h4>
            <p>{{ errorMessage() }}</p>
          </div>
        } @else if (problem()) {
          @if (problem(); as p) {
            <div class="space-y-6 w-full text-center">
              <p class="text-2xl leading-relaxed text-gray-700 dark:text-gray-200">{{ p.problemText }}</p>

              <div class="flex justify-center items-center gap-4 text-5xl">
                <span class="flex gap-2">
                  @for (i of numberToArray(p.items.count1); track i) {
                    <span>{{ p.items.emoji }}</span>
                  }
                </span>
                <span class="text-4xl font-bold text-indigo-500">{{ p.operation === 'addition' ? '+' : '-' }}</span>
                <span class="flex gap-2">
                  @for (i of numberToArray(p.items.count2); track i) {
                    <span>{{ p.items.emoji }}</span>
                  }
                </span>
                 <span class="text-4xl font-bold text-indigo-500">=</span>
                 <span class="text-gray-400 dark:text-gray-500">?</span>
              </div>
              
              <div class="pt-4">
                <button (click)="showAnswer.set(!showAnswer())" class="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  {{ showAnswer() ? 'Cevabı Gizle' : 'Cevabı Göster' }}
                </button>
                @if (showAnswer()) {
                  <div class="mt-4 text-4xl font-bold text-green-600 dark:text-green-400 flex items-center justify-center gap-4">
                     {{ p.answer }}
                     <span class="flex gap-1 text-5xl">
                       @for (i of numberToArray(p.answer); track i) {
                        <span>{{ p.items.emoji }}</span>
                       }
                     </span>
                  </div>
                }
              </div>
            </div>
          }
        } @else {
           <p class="text-gray-500 dark:text-gray-400 italic">Başlamak için yukarıdan seçenekleri belirleyip "Problem Üret" butonuna tıklayın.</p>
        }
      </div>

    </div>
  `,
})
export class VisualSupportComponent {
  private geminiService = inject(GeminiService);

  category: ProblemCategory = 'fruits';
  operation: ProblemOperation = 'addition';
  difficulty: ProblemDifficulty = 'easy';
  
  problem = signal<GeneratedProblem | null>(null);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  showAnswer = signal(false);

  async generateProblem() {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.problem.set(null);
    this.showAnswer.set(false);

    try {
      const result = await this.geminiService.generateMathProblem(
        this.difficulty,
        this.category,
        this.operation
      );
      this.problem.set(result);
    } catch (error) {
      console.error('Problem generation failed:', error);
      this.errorMessage.set('Problem üretilemedi. Lütfen tekrar deneyin veya API anahtarınızı kontrol edin.');
    } finally {
      this.isLoading.set(false);
    }
  }

  numberToArray(n: number): number[] {
    return Array(n);
  }
}