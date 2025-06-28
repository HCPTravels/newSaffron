import React from 'react';
import { ShoppingCart } from 'lucide-react';

const Cart = () => {
  return (
    <div className="min-h-screen bg-[#ff6523] pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm py-4 px-6 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">My Cart</h1>
      </div>

      {/* Empty Cart State */}
      <div className="max-w-md mx-auto pt-16 px-4 text-center">
        <div className="bg-white/20 p-8 rounded-2xl backdrop-blur-sm border border-white/30">
          <div className="mx-auto w-fit p-4 bg-white/90 rounded-full mb-6">
            <ShoppingCart className="h-12 w-12 text-[#ff6523]" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Your Cart is Empty</h2>
          <p className="text-white/80 mb-6">Looks like you haven't added anything to your cart yet</p>
          <button className="px-6 py-2 bg-white text-[#ff6523] font-medium rounded-full hover:bg-gray-100 transition-colors shadow-md">
            Browse Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;