import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_API } from '../data/DATA';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch products with reviews
    if(userId === null) {
      toast.error("Please login to view products.");
      navigate("/login");
      return;
    }
    async function fetchProducts() {
      try {
        const response = await fetch(`${BACKEND_API}/products-with-reviews`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch products");
        }

        setProducts(data);
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Something went wrong while fetching products.");
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800 tracking-tight">
        Product Reviews
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
