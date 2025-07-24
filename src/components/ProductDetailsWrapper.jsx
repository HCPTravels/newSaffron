import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductDetails from "./ProductDetails";

const ProductDetailsWrapper = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Add key to force remount when ID changes
  const componentKey = `product-${id}`;
  
  // Validate ID format (assuming MongoDB ObjectId format)
  const isValidId = id && /^[0-9a-fA-F]{24}$/.test(id);
  
  if (!isValidId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Invalid Product ID</h2>
          <p className="text-gray-600 mb-4">The product ID format is invalid.</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-[#ff6523] text-white rounded hover:bg-[#e55a1d] transition-colors"
          >
            Go Back to Home
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <ProductDetails 
      key={componentKey}
      id={id} 
      onBack={() => navigate("/dashboard")} 
    />
  );
};

export default ProductDetailsWrapper; 