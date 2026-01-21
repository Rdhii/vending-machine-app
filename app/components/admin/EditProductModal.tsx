"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Nama produk wajib diisi")
    .min(3, "Nama minimal 3 karakter"),
  price: yup
    .number()
    .required("Harga wajib diisi")
    .positive("Harga harus lebih dari 0")
    .typeError("Harga harus berupa angka"),
  stock: yup
    .number()
    .required("Stok wajib diisi")
    .min(0, "Stok tidak boleh negatif")
    .integer("Stok harus bilangan bulat")
    .typeError("Stok harus berupa angka"),
  imageUrl: yup
    .string()
    .optional()
    .default(undefined),
});

type ProductInput = yup.InferType<typeof schema>;

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (id: number, product: ProductInput) => void;
  product: Product | null;
}

export default function EditProductModal({
  isOpen,
  onClose,
  onEdit,
  product,
}: EditProductModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      imageUrl: "",
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        stock: product.stock,
        imageUrl: product.imageUrl,
      });
    }
  }, [product, reset]);

  const onSubmit = (data: ProductInput) => {
    if (product) {
      onEdit(product.id, data);
      reset();
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1e293b] rounded-2xl p-6 w-full max-w-md border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Edit Produk</h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Tutup modal"
            title="Tutup"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Nama Produk */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Nama Produk
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Masukkan nama produk"
              className="w-full px-4 py-3 bg-[#0f172a] border-2 border-cyan-500 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Harga & Stok */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Harga (Rp)
              </label>
              <input
                type="number"
                {...register("price")}
                placeholder="5000"
                className="w-full px-4 py-3 bg-[#0f172a] border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              {errors.price && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Stok
              </label>
              <input
                type="number"
                {...register("stock")}
                placeholder="10"
                className="w-full px-4 py-3 bg-[#0f172a] border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              {errors.stock && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.stock.message}
                </p>
              )}
            </div>
          </div>

          {/* URL Gambar */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              URL Gambar (Opsional)
            </label>
            <input
              type="text"
              {...register("imageUrl")}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 bg-[#0f172a] border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {errors.imageUrl && (
              <p className="text-red-400 text-sm mt-1">
                {errors.imageUrl.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-6 py-3 bg-transparent border-2 border-gray-600 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-cyan-400 text-black rounded-xl font-semibold hover:bg-cyan-500 transition-colors cursor-pointer"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
