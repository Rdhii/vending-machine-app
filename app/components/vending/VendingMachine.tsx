import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import Saldo from "./Saldo";

export default function VendingMachine() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <Navbar />
      <div className="rounded-2xl border p-4 mx-auto max-w-4xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-1 neon-text">VENDING MACHINE</h1>
          <p>Pilih Produk yang Anda Inginkan</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid grid-cols-3 col-span-2 border gap-4 p-4">
            <ProductCard />
            <ProductCard />
            <ProductCard /> 
            <ProductCard /> 
            <ProductCard /> 
          </div>
          <div className="border">
            <Saldo />
          </div>
        </div>
      </div>
    </div>
  );
}
