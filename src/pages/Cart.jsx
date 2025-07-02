import React, { useState } from 'react';
import { ShoppingCart, X, ChevronRight, Plus, Minus } from 'lucide-react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 199.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop&crop=center',
      color: 'Black',
      inStock: true
    },
    {
      id: 2,
      name: 'Organic Cotton T-Shirt',
      price: 29.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop&crop=center',
      color: 'White',
      size: 'M',
      inStock: true
    },
    {
      id: 3,
      name: 'Smart Watch Series 5',
      price: 249.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop&crop=center',
      color: 'Midnight Blue',
      inStock: false
    }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE10') {
      setAppliedCoupon({ code: 'SAVE10', discount: 0.1 });
      setCouponCode('');
    } else if (couponCode.toUpperCase() === 'FREESHIP') {
      setAppliedCoupon({ code: 'FREESHIP', freeShipping: true });
      setCouponCode('');
    } else {
      alert('Invalid coupon code. Try SAVE10 or FREESHIP');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedCoupon?.discount ? subtotal * appliedCoupon.discount : 0;
  const shipping = appliedCoupon?.freeShipping ? 0 : (subtotal > 100 ? 0 : 9.99);
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 rounded-xl z-10 bg-white py-4 px-6 shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Your Cart ({cartItems.length})</h1>
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row gap-4 border border-gray-100">
                  <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    
                    {item.color && (
                      <p className="text-sm text-gray-500 mt-1">Color: {item.color}</p>
                    )}
                    {item.size && (
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                    )}
                    
                    {!item.inStock && (
                      <p className="text-sm text-red-500 mt-1 font-medium">Out of stock</p>
                    )}
                  </div>
                  <div className="flex sm:flex-col justify-between sm:justify-center items-end sm:items-center gap-4">
                    <div className="flex items-center border border-gray-200 rounded-full">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-500 hover:text-gray-700 transition-colors"
                        disabled={!item.inStock}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-2 text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-500 hover:text-gray-700 transition-colors"
                        disabled={!item.inStock}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
              
              {/* Coupon Code */}
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <h3 className="font-medium text-gray-900 mb-2">Have a coupon code?</h3>
                {appliedCoupon && (
                  <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg flex justify-between items-center">
                    <span className="text-green-700 font-medium">✓ {appliedCoupon.code} applied</span>
                    <button 
                      onClick={() => setAppliedCoupon(null)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Try SAVE10 or FREESHIP" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button 
                    onClick={applyCoupon}
                    className="px-6 py-2 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-28">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span className="font-medium">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Shipping
                      {shipping === 0 && (
                        <span className="text-green-600 text-sm ml-1">
                          {appliedCoupon?.freeShipping ? '(Free with coupon)' : '(Free over $100)'}
                        </span>
                      )}
                    </span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors shadow-md flex items-center justify-center gap-2 mt-6">
                    Proceed to Checkout
                    <ChevronRight size={18} />
                  </button>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
                    <ShoppingCart size={16} className="text-gray-400" />
                    <span>Free shipping on orders over $100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <div className="max-w-md mx-auto bg-white p-8 rounded-2xl text-center shadow-lg border border-gray-100">
            <div className="mx-auto w-fit p-4 bg-orange-50 rounded-full mb-6">
              <ShoppingCart className="h-12 w-12 text-orange-600" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet</p>
            <button className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors shadow-md">
              Browse Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;