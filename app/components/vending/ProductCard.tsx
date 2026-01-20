import { DollarSign } from "lucide-react";
import Image from "next/image";

export default function ProductCard() {
  return (
    <div className="rounded-xl p-3 border w-full space-y-2">
      <div className="relative w-full aspect-square">
        <Image
          src="/images/soda.jpg"
          alt="Product Image"
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h2 className="text-sm font-semibold line-clamp-1">Product Name</h2>
      <p className="text-lg font-bold text-[#14EBD9]">Rp 12.000</p>
      <button className="flex items-center justify-center rounded-lg p-1 w-full gap-2 border bg-cyan-500 hover:cursor-pointer text-black">
        <DollarSign className="size-4.5" /> Beli
      </button>
    </div>
  );
}
