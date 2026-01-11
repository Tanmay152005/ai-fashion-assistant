
import React, { useState } from 'react';
import { ShoppingCart, ShoppingBag, Menu, X, ChevronRight, Sparkles } from 'lucide-react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './constants';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import StylistChat from './components/StylistChat';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const addToCart = (product: Product, size?: string, color?: string) => {
    setCart(prev => {
      // We check for existing item WITH the same size and color to allow multiple variants in cart
      const existingIndex = prev.findIndex(item => 
        item.id === product.id && 
        item.selectedSize === size && 
        item.selectedColor === color
      );

      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex] = { 
          ...newCart[existingIndex], 
          quantity: newCart[existingIndex].quantity + 1 
        };
        return newCart;
      }

      return [...prev, { 
        ...product, 
        quantity: 1, 
        selectedSize: size || product.availableSizes?.[0], 
        selectedColor: color || product.availableColors?.[0]
      }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    // Note: in a real app we'd use a unique cart item ID because of variants, 
    // but for this demo we'll clear by product ID or filter carefully.
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, q: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: q } : item));
  };

  const categories = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Shoes', 'Accessories'];
  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-black tracking-tighter text-indigo-600 flex items-center gap-1">
                LUMISTYLE <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2"></div>
              </h1>
              <div className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
                <a href="#" className="hover:text-indigo-600 transition-colors">Shop</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">Men</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">Women</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">New Arrivals</a>
              </div>
            </div>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-all active:scale-95"
            >
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <header className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="z-10">
              <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6">
                Next-Gen Shopping Experience
              </span>
              <h2 className="text-5xl lg:text-7xl font-black leading-tight mb-6">
                Curating Style with <span className="text-indigo-600">Intelligence.</span>
              </h2>
              <p className="text-lg text-gray-500 mb-8 max-w-lg leading-relaxed">
                Experience the future of fashion. Our AI Stylist helps you build the perfect wardrobe using real items from our premium collection.
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center gap-2">
                  Shop Catalog <ChevronRight size={20} />
                </button>
                <div className="flex items-center gap-2 text-indigo-600 font-semibold px-4 cursor-pointer hover:underline">
                  <Sparkles size={20} className="fill-current" /> Meet your Stylist
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-indigo-100 rounded-[2rem] -rotate-3 blur-2xl opacity-50"></div>
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200" 
                alt="Hero Fashion" 
                className="relative rounded-[2rem] shadow-2xl w-full h-[500px] object-cover object-top"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <h2 className="text-3xl font-bold">Featured Collection</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart} 
            />
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-xl font-black text-indigo-600 mb-4">LUMISTYLE</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
            Premium fashion essentials curated for the modern minimalist. Powered by Gemini AI.
          </p>
          <div className="flex justify-center gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900">Terms of Service</a>
            <a href="#" className="hover:text-gray-900">Contact Us</a>
          </div>
          <p className="mt-8 text-xs text-gray-400">© 2024 LumiStyle AI Fashion. All rights reserved.</p>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
      
      <StylistChat onAddToCart={addToCart} />
    </div>
  );
};

export default App;
