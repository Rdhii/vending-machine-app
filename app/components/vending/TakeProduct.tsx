import { Package, CheckCircle } from "lucide-react";
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
      <div className="flex flex-col items-center p-4 rounded-xl text-gray-400">
        <Package className="size-12 mb-2" />
        <p className="text-sm">Ambil Produk Disini</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 rounded-xl space-y-4">
      <CheckCircle className="size-12 text-green-500 mb-2" />
      <div className="text-center space-y-2">
        <p className="text-lg font-bold text-green-500">Pembelian Berhasil!</p>
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 space-y-1">
          <p className="text-sm text-gray-300">
            Produk:{" "}
            <span className="font-semibold text-white">
              {purchasedProduct.name}
            </span>
          </p>
          <p className="text-sm text-gray-300">
            Harga:{" "}
            <span className="font-semibold text-[#14EBD9]">
              {formatPrice(purchasedProduct.price)}
            </span>
          </p>
          {change > 0 && (
            <p className="text-sm text-gray-300">
              Kembalian:{" "}
              <span className="font-semibold text-yellow-400">
                {formatPrice(change)}
              </span>
            </p>
          )}
        </div>
      </div>
      <button
        onClick={onTakeProduct}
        className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
      >
        <Package className="size-4" />
        Ambil Produk
      </button>
    </div>
  );
}
