
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Image as ImageIcon, Loader2 } from 'lucide-react';
import { ChatMessage, Product } from '../types';
import { getStylistAdvice } from '../services/geminiService';
import { PRODUCTS } from '../constants';
import ProductCard from './ProductCard';

interface StylistChatProps {
  onAddToCart: (product: Product, size?: string, color?: string) => void;
}

const StylistChat: React.FC<StylistChatProps> = ({ onAddToCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Hello! I'm your LumiStyle AI Stylist. I can now suggest specific sizes, colors, and the perfect accessories to complete your look. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      image: selectedImage || undefined,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const base64Data = selectedImage?.split(',')[1];
    setSelectedImage(null);

    const response = await getStylistAdvice(input || "Give me style advice based on this image", base64Data);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: response.message,
      recommendations: response.recommendedProductIds,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 ${isOpen ? 'bg-red-500 rotate-90' : 'bg-indigo-600 hover:bg-indigo-700'}`}
      >
        {isOpen ? <X className="text-white" /> : <Sparkles className="text-white fill-current" />}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] md:w-[420px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-10">
          <div className="p-4 bg-indigo-600 text-white flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Sparkles size={20} className="fill-current" />
            </div>
            <div>
              <h3 className="font-bold">LumiStyle Stylist</h3>
              <p className="text-xs text-indigo-100">Now with Personal Customization</p>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white shadow-sm border border-gray-100 rounded-tl-none text-gray-800'}`}>
                  {msg.image && (
                    <img src={msg.image} alt="User upload" className="w-full rounded-lg mb-2 object-cover aspect-square" />
                  )}
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="mt-3 w-full grid grid-cols-1 gap-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Personalized Recommendations</p>
                    {msg.recommendations.map(id => {
                      const prod = PRODUCTS.find(p => p.id === id);
                      return prod ? (
                        <ProductCard 
                          key={id} 
                          product={prod} 
                          onAddToCart={onAddToCart} 
                          compact 
                        />
                      ) : null;
                    })}
                  </div>
                )}
                <span className="text-[10px] text-gray-400 mt-1 uppercase">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 w-fit px-3 py-2 rounded-full border border-indigo-100">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-xs font-medium">Analyzing style & checking sizes...</span>
              </div>
            )}
          </div>

          <div className="p-3 bg-white border-t border-gray-100">
            {selectedImage && (
              <div className="relative w-16 h-16 mb-2 rounded-lg overflow-hidden border-2 border-indigo-500">
                <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5"
                >
                  <X size={12} />
                </button>
              </div>
            )}
            <div className="flex items-center gap-2">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
              >
                <ImageIcon size={20} />
              </button>
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about sizes, colors, or matching items..."
                className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <button 
                disabled={isLoading || (!input.trim() && !selectedImage)}
                onClick={handleSend}
                className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StylistChat;
