import {bindActionCreators} from "@reduxjs/toolkit";
import * as userActions from '../store/user/user.actions'
import {useDispatch} from "react-redux";

const rootActions = {
    ...userActions
}
export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(rootActions, dispatch)
}