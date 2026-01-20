import { DollarSign } from "lucide-react";
import Image from "next/image";

export default function ProductCard() {
    return (
        <div className="rounded-xl p-3 border w-full space-y-2">
            <Image src="/images/soda.jpg" alt="Product Image" width={100} height={100} />
            <h2 className="text-sm font-semibold line-clamp-1">Product Name</h2>
            <p className="text-lg font-bold text-[#14EBD9]">Rp 12.000</p>
            <button className="flex items-center justify-center rounded-lg p-1 w-full gap-2 border neon-bg hover:cursor-pointer"><DollarSign className="size-4.5"/> Beli</button>
        </div>
    )
}