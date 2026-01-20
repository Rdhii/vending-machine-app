import { History, Settings } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return (
        <>
            <nav className="max-w-4xl mx-auto flex justify-end gap-3 mb-6 text-gray-300">
                <Link className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-[hsl(263_70%_58%)]" href="/history"><History className="size-4"/>History</Link>
                <Link className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-[hsl(263_70%_58%)]" href="/admin"><Settings className="size-4" />Admin</Link>
            </nav>
        </>        
    )
}