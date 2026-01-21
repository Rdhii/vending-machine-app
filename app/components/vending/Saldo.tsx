import { Coins, RefreshCcw } from "lucide-react";
import MoneyButton from "./MoneyButton";

interface SaldoProps {
  saldo: number;
  onAddMoney: (amount: number) => void;
  onReturnMoney: () => void;
}

export default function Saldo({
  saldo,
  onAddMoney,
  onReturnMoney,
}: SaldoProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const denominations = [2000, 5000, 10000, 20000, 50000];

  return (
    <div className="p-4">
      <div className="flex flex-col items-center p-4 border rounded-lg mb-4">
        <p className="text-xs mb-1 text-gray-400">SALDO</p>
        <p className="text-2xl font-bold neon-text">{formatPrice(saldo)}</p>
      </div>
      <div className="flex items-center rounded-lg p-3 mb-4 border justify-center gap-2">
        <Coins className="text-orange-300 size-5" />
        <p className="text-sm text-gray-300">Masukkan Uang</p>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {denominations.slice(0, 4).map((amount) => (
          <MoneyButton
            key={amount}
            amount={amount}
            onClick={() => onAddMoney(amount)}
          />
        ))}
      </div>
      <div className="mb-4">
        <MoneyButton
          amount={denominations[4]}
          onClick={() => onAddMoney(denominations[4])}
        />
      </div>
      <button
        onClick={onReturnMoney}
        className="w-full flex items-center justify-center gap-2 border rounded-lg py-3 px-4 border-[#EF4343] text-[#EF4343] hover:bg-[#EF4343]/10 transition-colors cursor-pointer"
      >
        <RefreshCcw className="size-4" />
        <span className="text-sm font-medium cursor-pointer">Kembalikan Uang</span>
      </button>
    </div>
  );
}
