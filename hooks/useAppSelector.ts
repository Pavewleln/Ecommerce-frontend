import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "@/store/store";

// Типизируем useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector