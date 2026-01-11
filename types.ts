
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Tops' | 'Bottoms' | 'Shoes' | 'Accessories' | 'Outerwear';
  image: string;
  description: string;
  color: string;
  style: 'Casual' | 'Formal' | 'Sporty' | 'Streetwear';
  availableSizes?: string[];
  availableColors?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string;
  recommendations?: string[]; // Array of product IDs
  timestamp: Date;
}

export interface StylistResponse {
  message: string;
  recommendedProductIds: string[];
}
