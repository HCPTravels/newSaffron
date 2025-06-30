import React from 'react';
import { ShoppingCart } from 'lucide-react';

const Cart = () => {
  return (
    <div className="min-h-screen bg-[#ff6523] pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 py-4 rounded-lg px-6 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">My Cart</h1>
      </div>

      {/* Empty Cart State */}
      <div className="fixed inset-0 flex justify-center items-center px-4 z-50">
  <div className="bg-white p-8 rounded-2xl text-center shadow-lg max-w-sm w-full">
    <div className="mx-auto w-fit p-4 bg-gray-100 rounded-full mb-6">
      <ShoppingCart className="h-12 w-12 text-[#ff6523]" strokeWidth={1.5} />
    </div>
    <h2 className="text-xl font-semibold text-gray-900 mb-2">Your Cart is Empty</h2>
    <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet</p>
    <button className="px-6 py-2 bg-[#ff6523] text-white font-medium rounded-full hover:bg-[#e55a1f] transition-colors shadow-md">
      Browse Products
    </button>
  </div>
</div>
    </div>
  );
};

export default Cart;