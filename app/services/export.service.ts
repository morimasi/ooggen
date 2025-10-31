import { Injectable } from '@angular/core';

// These are loaded from CDN in index.html
declare const html2canvas: any;
declare const jspdf: any;

@Injectable({
  providedIn: 'root',
})
export class ExportService {

  async downloadAsPdf(elementId: string, fileName: string = 'mathgen-calisma-sayfasi.pdf'): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with id #${elementId} not found.`);
      return;
    }

    try {
      const isDark = document.documentElement.classList.contains('dark');
      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true, 
        backgroundColor: isDark ? '#1f2937' : '#ffffff' // gray-800 for dark, white for light
      });

      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = jspdf;
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      
      let imgWidth = pdfWidth - 20; // with margin
      let imgHeight = imgWidth / ratio;

      if (imgHeight > pdfHeight - 20) {
        imgHeight = pdfHeight - 20; // with margin
        imgWidth = imgHeight * ratio;
      }

      const x = (pdfWidth - imgWidth) / 2;
      const y = (pdfHeight - imgHeight) / 2;

      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }

  printWorksheet(): void {
    window.print();
  }
}
