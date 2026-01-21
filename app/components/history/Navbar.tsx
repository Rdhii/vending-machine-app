"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex p-4 mx-auto max-w-7xl justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold neon-text">Riwayat Transaksi</h1>
        <p className="mt-1 text-gray-400">Lihat semua pembelian yang telah dilakukan</p>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="py-2 px-4 border border-gray-600 rounded-md hover:bg-gray-800 transition-colors"
        >
          Kembali
        </Link>
      </div>
    </div>
  );
}
