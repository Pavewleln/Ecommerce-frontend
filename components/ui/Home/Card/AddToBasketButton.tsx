import { IProduct } from "@/services/products/products.interface";
import { classNames } from "@/utils/classNames";
import { useActions } from "@/hooks/useActions";
import { useBasket } from "@/hooks/useBasket";
import { FC } from "react";

export const AddToBasketButton: FC<{
    product: IProduct;
    condition: boolean;
}> = ({ product, condition }) => {
    const { addToBasket, removeFromBasket } = useActions();
    const { items } = useBasket();
    const currentElement = items.find(
        basketItem => basketItem.product._id === product._id
    );
    return (
        <button
            disabled={condition}
            onClick={() =>
                currentElement
                    ? removeFromBasket({ _id: currentElement._id })
                    : addToBasket({
                          product,
                          price: product.price,
                          quantity: 1
                      })
            }
            className={classNames(
                currentElement
                    ? "bg-red-700 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 hover:bg-red-800"
                    : "bg-blue-700 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:bg-blue-800",
                "inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg focus:ring-4 focus:outline-none disabled:bg-blue-200 disabled:cursor-not-allowed dark:disabled: dark:disabled:bg-blue-300"
            )}
        >
            {currentElement ? "Из корзины" : "В корзину"}
        </button>
    );
};
