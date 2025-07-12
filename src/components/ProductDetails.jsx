import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast, Toaster } from "sonner";
import { Loader2, Zap } from "lucide-react";

const ProductDetails = ({ id, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { token } = useAuth();

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${backendUrl}/api/product/approved/product/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data) {
          setProduct(response.data);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("Failed to load product details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductDetails();
  }, [id, backendUrl, token]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-10 h-10 text-orange-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 px-12 bg-white/80 backdrop-blur-sm text-gray-800">
      <Toaster richColors closeButton />
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#ff6523] bg-white/10 border border-white/20 rounded-lg shadow-sm hover:bg-white/20 transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Products
      </button>

      <div className="max-w-6xl mx-auto pt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Product Details (2/3 width on medium+) */}
        <div className="md:col-span-2 space-y-8 bg-white/30 p-8 rounded-xl shadow-sm">
          {/* Image */}
          <div className="w-full h-108 bg-white flex items-center justify-center rounded-lg overflow-hidden mb-6 shadow-md">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="text-4xl text-amber-300 font-black">
                {product.origin?.charAt(0) || "S"}
              </div>
            )}
          </div>

          {/* Product Name and Grade */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h1 className="text-3xl font-bold text-[#ff6523]">
              {product.name}
            </h1>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mt-2 sm:mt-0 ${
                product.grade === "premium"
                  ? "bg-gradient-to-r from-amber-500 to-[#ff6523] text-white shadow-md"
                  : product.grade === "category1"
                  ? "bg-gradient-to-r from-[#ff6523] to-orange-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {product.grade === "premium" && <Zap className="w-3 h-3 mr-1" />}
              {product.grade.replace("category", "Category ").toUpperCase()}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-lg mb-4">{product.description}</p>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-500">Origin</p>
              <p className="text-base font-medium">{product.origin}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Stock Available</p>
              <p className="text-base font-medium">{product.stock} g</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Price (Original)</p>
              <p className="text-base font-medium text-gray-800">
                ₹{product.price}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Final Price</p>
              <p className="text-base font-bold text-green-600">
                ₹{product.finalPrice}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Margin</p>
              <p className="text-base font-medium">₹{product.margin}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="text-base font-medium capitalize text-blue-600">
                {product.status}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Seller Info */}
        {product.seller && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#ff6523]">
              Seller Info
            </h3>
            <div className="text-sm text-gray-800 space-y-2 bg-white/30 p-4 rounded-xl shadow-sm">
              <p>
                <strong>Name:</strong> {product.seller.firstName}{" "}
                {product.seller.lastName}
              </p>
              <p>
                <strong>Email:</strong> {product.seller.email}
              </p>
              <p>
                <strong>Contact:</strong> {product.seller.contactNumber}
              </p>
              <p>
                <strong>Business Name:</strong> {product.seller.businessName}
              </p>
              <p>
                <strong>Business Type:</strong> {product.seller.businessType}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
