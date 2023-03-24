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
                    ? "text-red-700 border-red-700 hover:bg-red-800 focus:ring-red-300 dark:border-red-500 dark:hover:bg-red-500 dark:focus:ring-red-800"
                    : "text-blue-700 border-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:border-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-800",
                "hover:text-white border focus:ring-4 focus:outline-none font-medium rounded-lg px-3 py-2 text-xs font-medium text-center dark:text-blue-500 dark:hover:text-white text-center mr-2 mb-2 disabled:cursor-not-allowed disabled:border-blue-100 disabled:text-blue-100"
            )}
        >
            {currentElement ? "Из корзины" : "В корзину"}
        </button>
    );
};
