
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Classic White Tee',
    price: 29.99,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    description: 'A premium cotton basic for every wardrobe.',
    color: 'White',
    style: 'Casual',
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: ['White', 'Heather Grey', 'Black']
  },
  {
    id: 'p2',
    name: 'Slim Fit Indigo Jeans',
    price: 89.99,
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800',
    description: 'Deep blue denim with a modern tapered cut.',
    color: 'Blue',
    style: 'Casual',
    availableSizes: ['30', '32', '34', '36'],
    availableColors: ['Indigo', 'Light Wash', 'Black']
  },
  {
    id: 'p3',
    name: 'Black Leather Biker Jacket',
    price: 199.99,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
    description: 'High-quality leather jacket for an edgy look.',
    color: 'Black',
    style: 'Streetwear',
    availableSizes: ['M', 'L', 'XL'],
    availableColors: ['Black', 'Dark Brown']
  },
  {
    id: 'p4',
    name: 'Minimalist White Sneakers',
    price: 120.00,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
    description: 'Clean design that pairs with everything.',
    color: 'White',
    style: 'Casual',
    availableSizes: ['8', '9', '10', '11', '12'],
    availableColors: ['White', 'Off-White']
  },
  {
    id: 'p5',
    name: 'Charcoal Wool Blazer',
    price: 159.00,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    description: 'Sophisticated layer for formal occasions.',
    color: 'Grey',
    style: 'Formal',
    availableSizes: ['38R', '40R', '42R', '44R'],
    availableColors: ['Charcoal', 'Navy']
  },
  {
    id: 'p6',
    name: 'Linen Button-Up Shirt',
    price: 65.00,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
    description: 'Breathable fabric for summer days.',
    color: 'Beige',
    style: 'Casual',
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: ['Beige', 'Light Blue', 'White']
  },
  {
    id: 'p7',
    name: 'Chino Trousers',
    price: 75.00,
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1473966968600-fa804b86d27b?auto=format&fit=crop&q=80&w=800',
    description: 'Versatile cotton chinos in sand color.',
    color: 'Sand',
    style: 'Casual',
    availableSizes: ['30', '32', '34', '36'],
    availableColors: ['Sand', 'Olive', 'Navy']
  },
  {
    id: 'p8',
    name: 'Silver Watch',
    price: 250.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800',
    description: 'Timeless accessory for any outfit.',
    color: 'Silver',
    style: 'Formal',
    availableSizes: ['One Size'],
    availableColors: ['Silver', 'Gold']
  }
];
