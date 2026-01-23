import { DollarSign } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
  onPurchase: (product: Product) => Promise<void>;
}

export default function ProductCard({ product, onPurchase }: ProductCardProps) {
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="rounded-xl p-3 border w-full space-y-2">
      <div className="relative w-full aspect-square">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <h2 className="text-sm font-semibold line-clamp-1">{product.name}</h2>
      <p className="text-lg font-bold text-[#14EBD9]">
        {formatPrice(product.price)}
      </p>
      <p className="text-xs text-gray-400 md:hidden">Stock: {product.stock}</p>
      <div className="hidden md:flex justify-between items-center">
        <p className="text-xs text-gray-400">Stock: {product.stock}</p>
      </div>
      <button
        onClick={() => onPurchase(product)}
        className="flex items-center justify-center rounded-lg p-1 w-full gap-2 border bg-cyan-500 hover:cursor-pointer text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-600 transition-colors"
        disabled={product.stock === 0}
      >
        <DollarSign className="size-4.5" />{" "}
        {product.stock > 0 ? "Beli" : "Habis"}
      </button>
    </div>
  );
}
