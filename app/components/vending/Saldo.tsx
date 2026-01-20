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
      <div className="flex flex-col items-center p-4 border rounded-lg">
        <p className="text-xs mb-1">SALDO</p>
        <p className="text-2xl font-bold neon-text">{formatPrice(saldo)}</p>
      </div>
      <div className="flex items-center rounded-lg p-3 mt-4 border justify-center gap-3">
        <Coins className="text-orange-300" />
        <p className="text-sm text-gray-300">Masukkan Uang</p>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {denominations.map((amount) => (
          <MoneyButton
            key={amount}
            amount={amount}
            onClick={() => onAddMoney(amount)}
          />
        ))}
      </div>
      <div className="flex items-center justify-center mt-7 gap-3 border rounded-lg py-2 px-4 border-[#EF4343] text-[#EF4343] hover:bg-[#EF4343]/10 transition-colors">
        <RefreshCcw className="size-4" />
        <button onClick={onReturnMoney}>Kembalikan Uang</button>
      </div>
    </div>
  );
}
