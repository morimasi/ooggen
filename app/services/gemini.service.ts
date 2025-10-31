import { Injectable } from '@angular/core';
import { GoogleGenAI, Type } from '@google/genai';

export interface GeneratedProblem {
  problemText: string;
  items: {
    name: string;
    emoji: string;
    count1: number;
    count2: number;
  };
  operation: 'addition' | 'subtraction';
  answer: number;
}

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private ai: GoogleGenAI | null = null;
  private readonly modelName = 'gemini-2.5-flash';

  constructor() {
    try {
      if (process.env.API_KEY) {
        this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      } else {
        console.error('API_KEY environment variable not found.');
      }
    } catch (e) {
      console.error('Failed to initialize GoogleGenAI', e);
    }
  }

  async generateMathProblem(
    difficulty: 'easy' | 'medium',
    // FIX: Added 'shapes' to the category union type to match the component's type.
    category: 'animals' | 'fruits' | 'vehicles' | 'shapes',
    operation: 'addition' | 'subtraction'
  ): Promise<GeneratedProblem> {
    if (!this.ai) {
      throw new Error('Gemini AI Service is not initialized. Please check your API key.');
    }

    const numberRange = difficulty === 'easy' ? '1 to 5' : '1 to 10';
    const operationText = operation === 'addition' ? 'toplama' : 'çıkarma';
    const categoryText = {
      animals: 'hayvanlar (örneğin köpek, kedi)',
      fruits: 'meyveler (örneğin elma, muz)',
      vehicles: 'taşıtlar (örneğin araba, otobüs)',
      // FIX: Added a prompt text for the 'shapes' category.
      shapes: 'şekiller (örneğin kare, daire)',
    }[category];

    const prompt = `Özel gereksinimli bir ilkokul öğrencisi için basit bir sözel ${operationText} problemi oluştur. 
    Problem ${categoryText} ile ilgili olsun.
    Kullanılacak sayılar ${numberRange} aralığında olmalı.
    Problem, çocuğun kolayca anlayabileceği, çok basit ve net bir dilde yazılmalıdır.
    Cevap negatif bir sayı olmamalıdır.
    Sonucu JSON formatında ver.`;

    try {
        const response = await this.ai.models.generateContent({
            model: this.modelName,
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        problemText: { type: Type.STRING, description: "Sözel problemin metni." },
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING, description: "Problemde kullanılan nesnenin adı (örn: elma)." },
                                emoji: { type: Type.STRING, description: "Nesneyi temsil eden tek bir emoji karakteri." },
                                count1: { type: Type.INTEGER, description: "Problemdeki ilk sayı." },
                                count2: { type: Type.INTEGER, description: "Problemdeki ikinci sayı." },
                            },
                            required: ["name", "emoji", "count1", "count2"],
                        },
                        operation: { type: Type.STRING, enum: ["addition", "subtraction"], description: "İşlem türü." },
                        answer: { type: Type.INTEGER, description: "Problemin doğru sayısal cevabı." },
                    },
                    required: ["problemText", "items", "operation", "answer"],
                },
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as GeneratedProblem;

    } catch (error) {
        console.error("Error generating content from Gemini:", error);
        throw new Error("Failed to generate math problem from AI.");
    }
  }
}