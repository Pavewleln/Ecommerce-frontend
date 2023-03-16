import {IProduct} from "@/services/products/products.interface";

export interface IBasketItem {
    _id: number,
    product: IProduct,
    quantity: number,
    price: number
}
export interface IBasketInitialState {
    items: IBasketItem[]
}

export interface IAddToBasketPayload extends Omit<IBasketItem, '_id'>{}
export interface IChangeQuantityPayload extends Pick<IBasketItem, '_id'>{
    type: 'minus' | 'plus'
}