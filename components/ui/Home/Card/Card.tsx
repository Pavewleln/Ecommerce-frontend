import { AddToBasketButton } from "@/components/ui/Home/Card/AddToBasketButton";
import { ProductsService } from "@/services/products/products.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IProduct } from "@/services/products/products.interface";
import { formatPrice } from "@/utils/formatPrice";
import { classNames } from "@/utils/classNames";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { FC, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";

export const Card: FC<{ product: IProduct }> = ({ product }) => {
    const queryClient = useQueryClient();
    const { pathname } = useRouter();
    const { user } = useAuth();
    const { _id, kol, price, title, images, seller } = product;
    const deleteProduct = useMutation(
        (id: string) => ProductsService.delete(id),
        {
            onSuccess: () =>
                queryClient.invalidateQueries(["get all my products"])
        }
    );
    const onSubmit = async (
        event: MouseEvent<HTMLButtonElement>,
        id: string
    ) => {
        event.preventDefault();
        try {
            await deleteProduct.mutate(id);
            toast.success("Продукт успешно удален");
        } catch (err) {
            toast.error("Ошибка. Попробуйте позже");
        }
    };
    return (
        <div className="relative w-[16.5rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2 hover:shadow-md transition-all">
            <Link
                className={"bg-white dark:bg-white"}
                href={`/products/${_id}`}
            >
                {images.length ? (
                    <Image
                        loader={() => images[0]}
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
                    {seller === user?._id && pathname === "/products/my" ? (
                        <>
                            <Link
                                href={`/products/${_id}/edit`}
                                className={
                                    "text-green-700 border-green-700 hover:bg-green-800 focus:ring-green-300 dark:border-green-500 dark:hover:bg-green-500 dark:focus:ring-green-800 hover:text-white border focus:ring-4 focus:outline-none font-medium rounded-lg px-3 py-2 text-xs font-medium text-center dark:text-blue-500 dark:hover:text-white text-center mr-2 mb-2 disabled:cursor-not-allowed disabled:border-blue-100 disabled:text-blue-100"
                                }
                            >
                                Изменить
                            </Link>
                            <button
                                onClick={event => onSubmit(event, _id)}
                                className={
                                    "text-red-700 border-red-700 hover:bg-red-800 focus:ring-red-300 dark:border-red-500 dark:hover:bg-red-500 dark:focus:ring-red-800 hover:text-white border focus:ring-4 focus:outline-none font-medium rounded-lg px-3 py-2 text-xs font-medium text-center dark:text-blue-500 dark:hover:text-white text-center mr-2 mb-2 disabled:cursor-not-allowed disabled:border-blue-100 disabled:text-blue-100"
                                }
                            >
                                Удалить
                            </button>
                        </>
                    ) : (
                        <AddToBasketButton
                            product={product}
                            condition={!kol || kol <= 0}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
