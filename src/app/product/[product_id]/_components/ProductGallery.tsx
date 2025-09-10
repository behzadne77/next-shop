"useClient"
import type { Product } from "@/types/product";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductGallery({ isLoading, product } : {isLoading: boolean, product: Product}) {
    const [activeImage, setActiveImage] = useState<string>("")
    const changeActiveImage = (newImage: string): void => {
        setActiveImage(newImage)
    }
    useEffect(()=> {
        if(product)
            setActiveImage(product.images[0])
    }, [isLoading, product])
    return (
        <section className="w-full">
            {isLoading && (
                <>
                    <section className="w-full h-76 bg-gray-300 rounded-lg animate-pulse" />
                    <section className="mt-4 grid grid-cols-5 gap-4">
                        {Array.from({ length: 5 }).map((_, index)=> (
                            <section key={index} className="w-20 h-20 bg-gray-300 rounded-lg animate-pulse" />
                        ))}
                    </section>
                </>
            )}
            {product && (
                <>
                    <section className="w-full h-76 bg-gray-300 rounded-lg flex items-center justify-center">
                        {activeImage && (<Image src={activeImage} alt={product.title} className="w-60" width={500} height={500} />)}
                    </section>
                    <section className="mt-4 grid grid-cols-5 gap-4">
                        {product.images.map((image, index) => (
                            <button
                            key={index}
                            className={`w-20 h-20 bg-gray-300 rounded-lg flex items-center justify-center cursor-pointer ${image == activeImage ? 'border border-blue-500' : ''}`}
                            onClick={() => changeActiveImage(image)}
                            >
                                <Image src={image} width={160} height={160} alt="image" className="w-16" />
                            </button>
                        ))}
                    </section>
                </>
            )}
        </section>
    )
}