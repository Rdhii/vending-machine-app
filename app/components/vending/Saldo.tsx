import { Coins } from "lucide-react";
import MoneyButton from "./MoneyButton";

export default function Saldo() {
  return (
    <div className="p-4">
        <div className="flex flex-col items-center p-4 border rounded-lg">
            <p className="text-xs mb-1">SALDO</p>
            <p className="text-2xl font-bold neon-text">Rp 0</p>
        </div>
        <div className="flex items-center rounded-lg p-3 mt-4 border justify-center gap-3">
            <Coins className="text-orange-300"/>
            <p className="text-sm text-gray-300">Masukkan Uang</p>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4 space-y-2">
            <MoneyButton />
            <MoneyButton />
            <MoneyButton />
            <MoneyButton />
            <MoneyButton />
        </div>
    </div>
  )
}
