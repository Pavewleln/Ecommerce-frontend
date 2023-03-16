import {IAddToBasketPayload, IBasketInitialState, IChangeQuantityPayload} from "@/store/basket/basket.interface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: IBasketInitialState = {
    items: []
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state, action: PayloadAction<IAddToBasketPayload>) => {
            const isExistSize = state.items.some(item => item.product._id === action.payload.product._id)
            if (!isExistSize) {
                state.items.push({...action.payload, _id: state.items.length})
            }
        },
        removeFromBasket: (state, action: PayloadAction<{ _id: number }>) => {
            state.items = state.items.filter(item => item._id === action.payload._id)
        },
        changeQuantity: (state, action: PayloadAction<IChangeQuantityPayload>) => {
            const {_id, type} = action.payload
            const item = state.items.find(item => item._id === _id)
            if (item) type === 'plus' ? item.quantity++ : item.quantity--
        },
        reset: state => {
            state.items = []
        }
    }
})
export const {reducer: basketReducer, actions: BasketActions} = basketSlice