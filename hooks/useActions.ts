import * as userActions from '../store/user/user.actions'
import {bindActionCreators} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import { UserActions } from '@/store/user/user.slice';

const rootActions = {
    ...userActions,
    ...UserActions
}
export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(rootActions, dispatch)
}