"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import Saldo from "./Saldo";
import TakeProduct from "./TakeProduct";
import axios from "axios";
import { toast } from "react-toastify";

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
  const [purchasedProduct, setPurchasedProduct] = useState<Product | null>(
    null,
  );
  const [change, setChange] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        if (response.data.success) {
          setProducts(response.data.data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
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
    setChange(0);
    setPurchasedProduct(null);
  };

  const handlePurchase = async (product: Product) => {
    // Validasi stok
    if (product.stock === 0) {
      toast.error("Maaf, stok produk habis!");
      return;
    }

    // Validasi uang
    if (saldo < product.price) {
      toast.warning(
        `Uang tidak cukup! Anda perlu Rp ${(product.price - saldo).toLocaleString("id-ID")} lagi.`,
      );
      return;
    }

    try {
      // Update stok di database
      const newStock = product.stock - 1;
      const response = await axios.patch(`/api/products/${product.id}`, {
        stock: newStock,
      });

      if (response.data.success) {
        // Hitung kembalian
        const kembalian = saldo - product.price;

        // Simpan transaksi ke database
        await axios.post("/api/transactions", {
          productId: product.id,
          totalPrice: product.price,
          cash: saldo,
          change: kembalian,
        });

        setChange(kembalian);
        setPurchasedProduct(product);
        setSaldo(0);

        // Update stok produk di state lokal
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === product.id ? { ...p, stock: newStock } : p,
          ),
        );
        toast.success(`Berhasil membeli ${product.name}!`);
      } else {
        toast.error("Gagal melakukan pembelian. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error purchasing product:", error);
      toast.error("Terjadi kesalahan saat melakukan pembelian.");
    }
  };

  const handleTakeProduct = () => {
    setPurchasedProduct(null);
    setChange(0);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <Navbar />
      <div className="rounded-2xl border p-4 mx-auto max-w-4xl">
        <div className="text-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold mb-1 neon-text">
            VENDING MACHINE
          </h1>
          <p className="text-sm md:text-base">
            Pilih Produk yang Anda Inginkan
          </p>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 border gap-3 md:gap-4 p-3 md:p-4 rounded-lg">
              {loading ? (
                <div className="col-span-2 md:col-span-3 text-center py-8">
                  Loading...
                </div>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onPurchase={handlePurchase}
                  />
                ))
              ) : (
                <div className="col-span-2 md:col-span-3 text-center py-8">
                  Tidak ada produk
                </div>
              )}
            </div>
            <div className="border p-4 rounded-lg">
              <TakeProduct
                purchasedProduct={purchasedProduct}
                change={change}
                onTakeProduct={handleTakeProduct}
              />
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
