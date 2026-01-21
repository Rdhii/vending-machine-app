"use client";

import Link from "next/link";

interface NavbarProps {
  onAddProduct: () => void;
}

export default function Navbar({ onAddProduct }: NavbarProps) {
  return (
    <div className="p-4 mx-auto max-w-7xl mb-6 md:flex md:justify-between md:items-center">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold neon-text">
          Admin Panel
        </h1>
        <p className="mt-1 text-sm md:text-base text-gray-400">
          Kelola produk vending machine
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <Link
          href="/"
          className="py-2 px-4 border border-gray-600 rounded-md hover:bg-gray-800 transition-colors text-center text-sm md:text-base"
        >
          Kembali ke Mesin
        </Link>
        <button
          onClick={onAddProduct}
          className="py-2 px-4 border-none rounded-md bg-cyan-400 text-black font-semibold hover:bg-cyan-500 transition-colors flex items-center justify-center gap-2 hover:cursor-pointer text-sm md:text-base"
        >
          <span className="text-xl">+</span> Tambah Produk
        </button>
      </div>
    </div>
  );
}
