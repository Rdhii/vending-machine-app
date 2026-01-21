"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
}

interface Transaction {
  id: number;
  productId: number;
  totalPrice: number;
  cash: number;
  change: number;
  createdAt: string;
  product: Product;
}

export default function HistoryList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("/api/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-100">
        <p className="text-gray-400 text-lg">Belum ada transaksi</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-[#1a2332] rounded-xl md:rounded-2xl border border-gray-700 overflow-hidden">
        {/* Mobile View */}
        <div className="block md:hidden">
          <div className="overflow-x-auto">
            <div className="min-w-max">
              {/* Header */}
              <div className="grid grid-cols-4 gap-4 p-3 border-b border-gray-700 bg-[#0f1824]">
                <div className="text-xs font-medium text-gray-400">
                  Tanggal
                  <br />& Waktu
                </div>
                <div className="text-xs font-medium text-gray-400">Produk</div>
                <div className="text-xs font-medium text-gray-400">Harga</div>
                <div className="text-xs font-medium text-gray-400">Dibayar</div>
              </div>
              {/* Body */}
              {transactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className={`grid grid-cols-4 gap-4 p-3 ${
                    index !== transactions.length - 1
                      ? "border-b border-gray-700/50"
                      : ""
                  }`}
                >
                  <div className="text-xs text-gray-300">
                    {formatDateTime(transaction.createdAt)}
                  </div>
                  <div className="text-xs text-white font-medium">
                    {transaction.product.name}
                  </div>
                  <div className="text-xs text-cyan-400 font-medium">
                    {formatPrice(transaction.totalPrice)}
                  </div>
                  <div className="text-xs text-white">
                    {formatPrice(transaction.cash)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-4 text-gray-400 font-medium text-sm">
                  Tanggal & Waktu
                </th>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">
                  Produk
                </th>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">
                  Harga
                </th>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">
                  Dibayar
                </th>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">
                  Kembalian
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className={`${
                    index !== transactions.length - 1
                      ? "border-b border-gray-700/50"
                      : ""
                  } hover:bg-gray-800/30 transition-colors`}
                >
                  <td className="p-4 text-gray-300 text-sm">
                    {formatDateTime(transaction.createdAt)}
                  </td>
                  <td className="p-4 text-white font-medium text-sm">
                    {transaction.product.name}
                  </td>
                  <td className="p-4 text-cyan-400 font-medium text-sm">
                    {formatPrice(transaction.totalPrice)}
                  </td>
                  <td className="p-4 text-white text-sm">
                    {formatPrice(transaction.cash)}
                  </td>
                  <td
                    className={`p-4 font-medium text-sm ${
                      transaction.change > 0
                        ? "text-orange-400"
                        : "text-gray-400"
                    }`}
                  >
                    {formatPrice(transaction.change)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
