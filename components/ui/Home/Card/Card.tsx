import {AddToBasketButton} from "@/components/ui/Home/Card/AddToBasketButton";
import {IProduct} from '@/services/products/products.interface';
import Image from "next/image";
import {FC} from "react";
import Link from "next/link";

export const Card: FC<{ product: IProduct }> = ({product}) => {
    const {_id, kol, description, price, title, imageUrl, type, seller} = product
    return (
        <div
            className="max-w-[16.5rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2 hover:shadow-md transition-all">
            <Link href={`/products/${_id}`}>
                <Image className="rounded-t-lg p-2" src={imageUrl} alt="Product" width={286} height={169}/>
            </Link>
            <div className="p-3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-md font-bold text-gray-900 dark:text-white">${price}</span>
                    <span className="text-md font-bold text-gray-900 dark:text-white">На складе: {kol}</span>
                </div>
                <div className="flex items-center justify-end">
                    <AddToBasketButton product={product}/>
                </div>
            </div>
        </div>
    )
}