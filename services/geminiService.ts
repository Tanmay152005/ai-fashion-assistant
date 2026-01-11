
import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS } from "../constants";
import { StylistResponse } from "../types";

const API_KEY = process.env.API_KEY || '';

const SYSTEM_INSTRUCTION = `
You are a High-End Visual Fashion Stylist for "LumiStyle". 
Your objective: Create personalized outfit recommendations based on VISUAL observation and USER context.

CATALOG DATA (Use ONLY these items):
${JSON.stringify(PRODUCTS.map(p => ({ 
  id: p.id, 
  name: p.name, 
  style: p.style, 
  color: p.color, 
  category: p.category,
  sizes: p.availableSizes,
  colors: p.availableColors
})), null, 2)}

DIAGNOSTIC PROCESS:
If a photo is provided, visually analyze:
1. Skin tone and undertone (e.g., warm, cool, neutral).
2. Body proportions (e.g., shoulder-to-hip ratio, height perception).
3. Current outfit colors, fit, and aesthetic.

RECOMMENDATION RULES:
- Use the user's context (Casual, College, Office, Party) to filter recommendations.
- Select 1-3 items maximum from the catalog.
- For EACH item: Briefly state WHY it was chosen (1-2 lines max). 
- REASONING FOCUS: Focus on color harmony with their skin tone, proportional balance with their current look, and context suitability.
- DO NOT describe the item (e.g., "It is a blue shirt").
- DO NOT provide long paragraphs. Keep it professional and high-speed.

JSON RESPONSE FORMAT:
{
  "message": "Start with a brief visual analysis (e.g., 'Your cool skin tone and tall proportions suggest...'), then list reasoning for each recommended item.",
  "recommendedProductIds": ["id1", "id2"]
}
`;

export async function getStylistAdvice(
  userPrompt: string, 
  base64Image?: string
): Promise<StylistResponse> {
  if (!API_KEY) {
    return {
      message: "API Key missing. Please configure it to get personalized advice.",
      recommendedProductIds: []
    };
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const model = 'gemini-3-flash-preview';
  
  const contents: any[] = [{ text: userPrompt || "Provide fashion advice for my current look." }];
  
  if (base64Image) {
    contents.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: base64Image
      }
    });
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: { parts: contents },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            message: { 
              type: Type.STRING,
              description: "The stylist's concise visual analysis and item-by-item reasoning."
            },
            recommendedProductIds: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "IDs of recommended products from the catalog."
            }
          },
          required: ["message", "recommendedProductIds"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    
    const result = JSON.parse(text);
    return {
      message: result.message || "I've curated a few pieces for you.",
      recommendedProductIds: result.recommendedProductIds || []
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      message: "I'm having trouble connecting to my style database right now. Please try again in a moment!",
      recommendedProductIds: []
    };
  }
}
