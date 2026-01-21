import { CheckCircle } from "lucide-react";
import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
}

interface TakeProductProps {
  purchasedProduct: Product | null;
  change: number;
  onTakeProduct: () => void;
}

export default function TakeProduct({
  purchasedProduct,
  change,
  onTakeProduct,
}: TakeProductProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!purchasedProduct) {
    return (
      <div className="flex items-center justify-center p-6 text-gray-500">
        <p className="text-sm">Belum ada produk yang dibeli</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1a2332] border border-gray-700 rounded-xl p-4">
      <div className="flex items-center gap-3">
        {/* Success Icon */}
        <CheckCircle className="size-6 text-cyan-400 flex-shrink-0" />

        {/* Success Text */}
        <p className="text-lg font-semibold text-cyan-400">
          Pembelian Berhasil!
        </p>
      </div>

      <div className="flex items-center gap-4 mt-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={purchasedProduct.imageUrl}
            alt={purchasedProduct.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-grow">
          <p className="text-white font-semibold text-lg mb-1">
            {purchasedProduct.name}
          </p>
          <p className="text-orange-400 font-medium">
            Kembalian: {formatPrice(change)}
          </p>
        </div>
      </div>
    </div>
  );
}
