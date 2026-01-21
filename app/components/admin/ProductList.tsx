"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import Navbar from "./Navbar";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import { toast } from "react-toastify";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
}

interface ProductInput {
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddProduct = async (productInput: ProductInput) => {
    try {
      const response = await axios.post("/api/products", productInput);
      if (response.data.success) {
        setProducts([...products, response.data.data]);
        setIsModalOpen(false);
        toast.success("Produk berhasil ditambahkan!");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Gagal menambahkan produk!");
    }
  };

  const handleEditProduct = async (id: number, productInput: ProductInput) => {
    try {
      const response = await axios.put(`/api/products/${id}`, productInput);
      if (response.data.success) {
        setProducts(
          products.map((p) => (p.id === id ? response.data.data : p)),
        );
        setIsEditModalOpen(false);
        setSelectedProduct(null);
        toast.success("Produk berhasil diupdate!");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Gagal mengupdate produk!");
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      return;
    }

    try {
      const response = await axios.delete(`/api/products/${id}`);
      if (response.data.success) {
        setProducts(products.filter((p) => p.id !== id));
        toast.success("Produk berhasil dihapus!");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Gagal menghapus produk!");
    }
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-100">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar onAddProduct={() => setIsModalOpen(true)} />
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddProduct}
      />
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProduct(null);
        }}
        onEdit={handleEditProduct}
        product={selectedProduct}
      />
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-[#1a2332] rounded-xl border border-gray-700 overflow-hidden">
          {/* Mobile View */}
          <div className="block md:hidden">
            <div className="overflow-x-auto">
              <div className="min-w-max">
                {/* Header */}
                <div className="grid grid-cols-5 gap-3 p-3 border-b border-gray-700 bg-[#0f1824]">
                  <div className="text-xs font-medium text-gray-400">
                    Gambar
                  </div>
                  <div className="text-xs font-medium text-gray-400">Nama</div>
                  <div className="text-xs font-medium text-gray-400">
                    Kategori
                  </div>
                  <div className="text-xs font-medium text-gray-400">Harga</div>
                  <div className="text-xs font-medium text-gray-400"></div>
                </div>
                {/* Body */}
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="grid grid-cols-5 gap-3 p-3 border-b border-gray-700/50 items-center"
                  >
                    <div>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    </div>
                    <div className="text-xs text-white font-medium">
                      {product.name}
                    </div>
                    <div className="text-xs text-gray-300">Snack</div>
                    <div className="text-xs text-cyan-400 font-semibold">
                      {formatPrice(product.price)}
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Pencil className="w-3 h-3 text-gray-300" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3 text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">
                    Gambar
                  </th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">
                    Nama
                  </th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">
                    Kategori
                  </th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">
                    Harga
                  </th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">
                    Stok
                  </th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="p-4">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-white text-sm">
                        {product.name}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-300 text-sm">Snack</p>
                    </td>
                    <td className="p-4">
                      <p className="text-cyan-400 font-semibold text-sm">
                        {formatPrice(product.price)}
                      </p>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-500/20 text-green-400 font-semibold text-sm">
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-2 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4 text-gray-300" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {products.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              Tidak ada produk
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
