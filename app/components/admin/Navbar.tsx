"use client";

import Link from "next/link";

interface NavbarProps {
  onAddProduct: () => void;
}

export default function Navbar({ onAddProduct }: NavbarProps) {
  return (
    <div className="flex p-4 mx-auto max-w-7xl justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold neon-text">Admin Panel</h1>
        <p className="mt-1 text-gray-400">Kelola produk vending machine</p>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="py-2 px-4 border border-gray-600 rounded-md hover:bg-gray-800 transition-colors"
        >
          Kembali
        </Link>
        <button
          onClick={onAddProduct}
          className="py-2 px-4 border-none rounded-md bg-cyan-400 text-black font-semibold hover:bg-cyan-500 transition-colors flex items-center gap-2 hover:cursor-pointer"
        >
          <span className="text-xl">+</span> Tambah Produk
        </button>
      </div>
    </div>
  );
}
