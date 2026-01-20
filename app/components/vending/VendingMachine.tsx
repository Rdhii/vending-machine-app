"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import Saldo from "./Saldo";
import TakeProduct from "./TakeProduct";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
}

export default function VendingMachine() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        if (response.data.success) {
          setProducts(response.data.data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddMoney = (amount: number) => {
    setSaldo((prev) => prev + amount);
  };

  const handleReturnMoney = () => {
    setSaldo(0);
  };


  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <Navbar />
      <div className="rounded-2xl border p-4 mx-auto max-w-4xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-1 neon-text">VENDING MACHINE</h1>
          <p>Pilih Produk yang Anda Inginkan</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 space-y-4">
            <div className="grid grid-cols-3 border gap-4 p-4 rounded-lg">
              {loading ? (
                <div className="col-span-3 text-center py-8">Loading...</div>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  Tidak ada produk
                </div>
              )}
            </div>
            <div className="border p-4 rounded-lg">
              <TakeProduct />
            </div>
          </div>

          <div className="border h-fit rounded-lg">
            <Saldo 
              saldo={saldo} 
              onAddMoney={handleAddMoney} 
              onReturnMoney={handleReturnMoney} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
