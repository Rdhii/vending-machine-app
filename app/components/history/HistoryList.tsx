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
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-400 text-lg">Belum ada transaksi</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-[#1a2332] rounded-2xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-4 text-gray-400 font-medium">
                  Tanggal & Waktu
                </th>
                <th className="text-left p-4 text-gray-400 font-medium">
                  Produk
                </th>
                <th className="text-left p-4 text-gray-400 font-medium">
                  Harga
                </th>
                <th className="text-left p-4 text-gray-400 font-medium">
                  Dibayar
                </th>
                <th className="text-left p-4 text-gray-400 font-medium">
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
                  <td className="p-4 text-gray-300">
                    {formatDateTime(transaction.createdAt)}
                  </td>
                  <td className="p-4 text-white font-medium">
                    {transaction.product.name}
                  </td>
                  <td className="p-4 text-cyan-400 font-medium">
                    {formatPrice(transaction.totalPrice)}
                  </td>
                  <td className="p-4 text-white">
                    {formatPrice(transaction.cash)}
                  </td>
                  <td
                    className={`p-4 font-medium ${
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
