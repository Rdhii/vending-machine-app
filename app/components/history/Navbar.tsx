"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex flex-col md:flex-row p-4 mx-auto max-w-7xl justify-between mb-6 gap-4 md:gap-0">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold neon-text">
          Riwayat Transaksi
        </h1>
        <p className="mt-1 text-sm md:text-base text-gray-400">
          Lihat semua pembelian yang telah dilakukan
        </p>
      </div>
      <div className="flex items-center">
        <Link
          href="/"
          className="flex items-center gap-2 py-2 px-4 border border-gray-600 rounded-md hover:bg-gray-800 transition-colors text-sm md:text-base"
        >
          <ArrowLeft className="size-4" />
          <span>Kembali</span>
        </Link>
      </div>
    </div>
  );
}
