
import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingBag, Plus, ChevronDown } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size?: string, color?: string) => void;
  compact?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, compact = false }) => {
  const [selectedSize, setSelectedSize] = useState(product.availableSizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.availableColors?.[0] || '');

  if (compact) {
    return (
      <div className="flex flex-col p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-indigo-200 transition-all">
        <div className="flex items-center gap-3 mb-3">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-14 h-14 object-cover rounded-lg"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">{product.name}</p>
            <p className="text-xs font-semibold text-indigo-600">${product.price.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          {product.availableSizes && (
            <div className="relative">
              <select 
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full appearance-none bg-gray-50 border border-gray-100 rounded-md py-1.5 px-2 text-[10px] font-medium focus:ring-1 focus:ring-indigo-500 outline-none"
              >
                {product.availableSizes.map(s => <option key={s} value={s}>Size: {s}</option>)}
              </select>
              <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          )}
          {product.availableColors && (
            <div className="relative">
              <select 
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full appearance-none bg-gray-50 border border-gray-100 rounded-md py-1.5 px-2 text-[10px] font-medium focus:ring-1 focus:ring-indigo-500 outline-none"
              >
                {product.availableColors.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          )}
        </div>

        <button 
          onClick={() => onAddToCart(product, selectedSize, selectedColor)}
          className="w-full flex items-center justify-center gap-2 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={14} /> Add to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        <button 
          onClick={() => onAddToCart(product)}
          className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-white p-3 rounded-full shadow-lg text-gray-900 hover:bg-indigo-600 hover:text-white"
        >
          <ShoppingBag size={20} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
          <span className="text-indigo-600 font-bold">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-500 mb-2">{product.category} • {product.style}</p>
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full md:hidden py-2 bg-gray-900 text-white rounded-lg font-medium text-sm active:scale-95 transition-transform"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
