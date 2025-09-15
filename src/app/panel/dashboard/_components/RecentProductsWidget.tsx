import { Product } from "@/types/product";
import { Badge, NumberFormatter } from "@mantine/core";
import Image from "next/image";

interface Props {
    products: Product[]
}
export default function RecentProductsWidget({products}: Props) {
    return (
        <div className="rounded-2xl bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 shadow-sm p-5">
            <div className="mb-3 font-semibold">Recent Products</div>
            <ul className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 text-sm">
                {products.map((product) => (
                    <li key={product.id} className="flex gap-5 md:grid grid-cols-7 items-center justify-between py-2.5 overflow-auto">
                        <section className="flex items-center gap-2 col-span-4">
                            <Image src={product.thumbnail} width={180} height={180} alt={product.title} className="w-14 h-14 rounded-full" />
                            <span className="text-zinc-700 dark:text-zinc-200 w-40 md:w-fit truncate">{product.title}</span>
                        </section>
                        <NumberFormatter prefix="$" thousandSeparator value={product.price} className="col-span-1"/>
                        <section className="col-span-2 flex justify-end w-26 md:w-full shrink-0">
                            <Badge variant="light" color="cyan">{product.brand}</Badge>
                        </section>
                    </li>
                ))}
            </ul>
        </div>
    );
}
