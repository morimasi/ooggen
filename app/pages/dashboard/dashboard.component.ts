import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="bg-white p-8 rounded-lg shadow-md animate-fade-in">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">MathGen'e Hoş Geldiniz!</h2>
      <p class="text-gray-600 leading-relaxed">
        Öğrenme yolculuğunuza başlamak için sol menüden bir modül seçin. 
        Her modül, özel öğrenme ihtiyaçlarına yönelik olarak tasarlanmıştır.
        <br>
        Sağ taraftaki panelden çalışma sayfalarınızı anında özelleştirebilirsiniz.
      </p>
    </div>
  `,
})
export class DashboardComponent {}
