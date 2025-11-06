import { GoogleGenAI } from "@google/genai";
import { OrderDetail } from '../types';

// Assume process.env.API_KEY is configured in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Ключ Gemini API не найден. Функции ИИ будут отключены.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export async function generateOrderSummary(orderDetails: OrderDetail[], grandTotal: number): Promise<string> {
  if (!API_KEY) {
    return Promise.resolve("Сводка ИИ отключена. API_KEY не настроен.");
  }
  
  const model = "gemini-2.5-flash";

  const orderItemsText = orderDetails.map(item => 
    `- Товар: ${item.product.model} (${item.product.category})\n` +
    `  Количество: ${item.quantity}\n` +
    `  Цена за единицу: ₸${item.product.price.toFixed(2)}\n` +
    `  Промежуточный итог: ₸${item.totalPrice.toFixed(2)}`
  ).join('\n\n');

  const prompt = `
Вы — ассистент оптовой компании по продаже электроники TOPOMAX. Ваша задача — создать профессиональную и краткую сводку заказа на основе предоставленного списка товаров.

Сводка должна быть отформатирована как простой текст, подходящий для вставки в электронное письмо или официальный документ.

Вот детали заказа:

${orderItemsText}

---
Итого: ₸${grandTotal.toFixed(2)}
---

Пожалуйста, выполните следующее:
1.  Начните с профессиональной темы, например "Сводка заказа для TOPOMAX".
2.  Напишите краткое вступительное предложение.
3.  Четко перечислите каждый товар, указав Модель, Количество и Промежуточную сумму.
4.  В конце укажите Итоговую сумму.
5.  Не добавляйте никаких лишних комментариев или разговорного текста, кроме самой сводки.
`;

  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt
    });
    
    return response.text.trim();

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Не удалось сгенерировать сводку с помощью ИИ. Проверьте консоль для получения подробной информации.");
  }
}