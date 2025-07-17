import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (backendUrl, token) => {
    if (products.length > 0) return; // Already fetched
    setIsProductsLoading(true);
    setError(null);
    try {
      const headers = {};
      if (token) headers.Authorization = `Bearer ${token}`;
      const response = await axios.get(
        `${backendUrl}/api/product/approved/product`,
        { headers, timeout: 10000 }
      );
      setProducts(response.data || []);
    } catch (err) {
      setError(err);
    } finally {
      setIsProductsLoading(false);
    }
  }, [products.length]);

  return (
    <ProductContext.Provider value={{
      products,
      isProductsLoading,
      error,
      fetchProducts,
      setProducts // for manual cache clearing if needed
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext); 