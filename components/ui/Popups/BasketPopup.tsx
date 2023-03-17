import {IPopup} from "@/components/ui/Popups/popup.types";
import {formatPrice} from "@/utils/formatPrice";
import {useActions} from "@/hooks/useActions";
import {useBasket} from "@/hooks/useBasket";
import Image from "next/image";
import {FC} from "react";

export const BasketPopup: FC<IPopup> = ({showModal, setShowModal}) => {
    const {items} = useBasket()
    const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    const {changeQuantity, removeFromBasket, reset} = useActions()
    return showModal ? (
        <>
            <div className="absolute z-30 right-5 lg:right-32">
                <div
                    className="fixed w-full h-full"
                    onClick={() => setShowModal(false)}
                ></div>
                <div className="min-h-screen px-4 py-8">
                    <div
                        className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg dark:bg-gray-700 min-w-[250px] min-h-[150px]">
                        <div className="flex items-center justify-between">
                            <h5>Моя корзина</h5>
                            {items.length
                                ? <button onClick={() => reset()}
                                          className={"rounded-xl cursor-pointer hover:bg-gray-100 transition-all dark:hover:bg-gray-800 p-1"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                                : null
                            }
                        </div>
                        <hr/>
                        <div>
                            {items.length
                                ? <div>
                                    <div className={"max-h-[300px] overflow-x-auto"}>
                                        {items.map(({product, price, quantity, _id}) => (
                                            <div key={_id} className={"m-2 flex items-center"}>
                                                <Image src={product.imageUrl} alt={product.title} width={80}
                                                       height={80}
                                                       className={"m-2"}/>
                                                <div className={"m-2"}>
                                                    <h5 className={"font-bold "}>{product.title}</h5>
                                                    <h6>{formatPrice(price)}</h6>
                                                    <div className={"flex items-center"}>
                                                        <button
                                                            onClick={() => changeQuantity({
                                                                _id: _id,
                                                                type: "minus"
                                                            })}
                                                            disabled={quantity <= 1}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24" strokeWidth="1.5"
                                                                 stroke="currentColor"
                                                                 className="p-1 w-6 h-6 m-2 rounded-xl cursor-pointer hover:bg-gray-100 transition-all dark:hover:bg-gray-800">
                                                                <path strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      d="M19.5 12h-15"/>
                                                            </svg>
                                                        </button>
                                                        {quantity}
                                                        <button
                                                            onClick={() => changeQuantity({
                                                                _id: _id,
                                                                type: "plus"
                                                            })}
                                                            disabled={quantity >= 10}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24" strokeWidth="1.5"
                                                                 stroke="currentColor"
                                                                 className="p-1 w-6 h-6 m-2 rounded-xl cursor-pointer hover:bg-gray-100 transition-all dark:hover:bg-gray-800">
                                                                <path strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      d="M12 4.5v15m7.5-7.5h-15"/>
                                                            </svg>
                                                        </button>
                                                        <button onClick={() => removeFromBasket({_id: _id})}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24" strokeWidth="1.5"
                                                                 stroke="currentColor"
                                                                 className="w-5 h-5 hover:text-red-500 transition-all cursor-pointer">
                                                                <path strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className={"font-medium "}>{formatPrice(total)}</p>
                                    <button className={"hover:underline"}>Купить</button>
                                </div>
                                : <h3 className={"flex items-center justify-center pt-10"}>Корзина пуста</h3>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : null
}