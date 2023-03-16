import * as userActions from "../store/user/user.actions";
import {BasketActions} from "@/store/basket/basket.slice";
import {UserActions} from '@/store/user/user.slice';
import {bindActionCreators} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

const rootActions = {
    ...userActions,
    ...UserActions,
    ...BasketActions
}
// Достаем все dispatch из store(альтернатива useDispatch)
export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(rootActions, dispatch)
}