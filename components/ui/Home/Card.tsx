import img from '../../../assets/images/image-1.jpg'
import Image from "next/image";
import {FC} from "react";
import Link from "next/link";

export interface ICard {
    _id: string,
    title: string,
    price: number,
    kol: number,
    description: string,
    imageUrl: string,
    type: string
}

export const Card: FC<ICard> = ({_id, kol, description, price, title, imageUrl, type}) => {
    return (
        <div className="max-w-[16rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2 hover:shadow-md transition-all">
            <Link href={`/product/${_id}`}>
                <Image className="rounded-t-lg" src={img} alt="Product"/>
            </Link>
            <div className="p-3">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                </a>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-md font-bold text-gray-900 dark:text-white">${price}</span>
                    <span className="text-md font-bold text-gray-900 dark:text-white">На складе: {kol}</span>
                </div>
                <div className="flex items-center justify-end">
                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium
                 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4
                focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
                dark:focus:ring-blue-800">
                        В корзину
                    </button>
                </div>
            </div>
        </div>
    )
}