import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-help-modal',
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity" (click)="close()"></div>
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-fade-in-up">
        <header class="flex items-center justify-between p-4 border-b dark:border-gray-700 flex-shrink-0">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">Yardım ve Destek</h2>
          <button (click)="close()" class="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>
        <main class="p-6 overflow-y-auto space-y-4 text-gray-600 dark:text-gray-300">
          <h3 class="font-semibold text-lg text-gray-700 dark:text-gray-200">MathGen'e Hoş Geldiniz!</h3>
          <p>MathGen, özellikle özel gereksinimli öğrenciler için tasarlanmış, özelleştirilebilir matematik çalışma sayfaları oluşturmanıza olanak tanıyan bir araçtır.</p>
          
          <div>
            <h4 class="font-semibold text-md text-gray-700 dark:text-gray-200 mt-4 mb-2">Nasıl Kullanılır?</h4>
            <ol class="list-decimal list-inside space-y-2">
              <li><strong>Modül Seçin:</strong> Sol taraftaki menüden "Matematiğe Hazırlık" gibi bir modül seçerek başlayın.</li>
              <li><strong>Özelleştirin:</strong> Sağdaki "Çalışma Sayfası Ayarları" panelini kullanarak sayfanızı kişiselleştirin. Nesne sayısını, kategoriyi, sayfa düzenini ve daha fazlasını değiştirebilirsiniz.</li>
              <li><strong>Ayar Setleri:</strong> Sık kullandığınız ayarları "Ayar Seti" olarak kaydedebilir, daha sonra tek tıkla yükleyebilirsiniz.</li>
              <li><strong>Dışa Aktarın:</strong> Hazırladığınız çalışma sayfasını üst menüdeki butonları kullanarak PDF olarak indirebilir veya doğrudan yazdırabilirsiniz.</li>
              <li><strong>Görünümü Değiştirin:</strong> Kenar çubuğundaki Ay/Güneş ikonuna tıklayarak Açık ve Koyu tema arasında geçiş yapabilirsiniz.</li>
            </ol>
          </div>
          
          <p>Uygulamayı geliştirirken karşılaştığınız herhangi bir sorun veya öneri için bizimle iletişime geçmekten çekinmeyin.</p>
        </main>
        <footer class="p-4 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700 flex-shrink-0 flex justify-end">
          <button (click)="close()" class="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors">
            Anladım, Kapat
          </button>
        </footer>
      </div>
    </div>
  `
})
export class HelpModalComponent {
  private settingsService = inject(SettingsService);

  close(): void {
    this.settingsService.closeHelpModal();
  }
}
