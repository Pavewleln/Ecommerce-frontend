import { AddToBasketButton } from "@/components/ui/Home/Card/AddToBasketButton";
import { IProduct } from "@/services/products/products.interface";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import { FC } from "react";
import Link from "next/link";
import { classNames } from "@/utils/classNames";

export const Card: FC<{ product: IProduct }> = ({ product }) => {
    const { _id, kol, price, title, images } = product;
    return (
        <div className="w-[16.5rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2 hover:shadow-md transition-all">
            <Link
                className={"bg-white dark:bg-white"}
                href={`/products/${_id}`}
            >
                {images.length ? (
                    <Image
                        className="rounded-t-lg p-2 w-auto h-[169px] flex items-center justify-center m-auto"
                        src={images[0]}
                        alt="Product"
                        width={276}
                        height={169}
                    />
                ) : (
                    <div
                        className={
                            "rounded-t-lg p-2 w-auto h-[169px] bg-gray-100 flex items-center justify-center filter text-gray-400 dark:bg-gray-600"
                        }
                    >
                        нет фото
                    </div>
                )}
            </Link>
            <div className="p-3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {title}
                </h5>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-md font-bold text-gray-900 dark:text-white">
                        {formatPrice(price)}
                    </span>
                    <span
                        className={classNames(
                            !kol || kol <= 0
                                ? "text-red-400"
                                : " dark:text-white",
                            "text-md font-bold text-gray-900"
                        )}
                    >
                        На складе: {!kol || kol <= 0 ? 0 : kol}
                    </span>
                </div>
                <div className="flex items-center justify-end">
                    <AddToBasketButton
                        product={product}
                        condition={!kol || kol <= 0}
                    />
                </div>
            </div>
        </div>
    );
};
