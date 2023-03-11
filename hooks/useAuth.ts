import {useAppSelector} from "@/hooks/useAppSelector";

export const useAuth = () => useAppSelector(state => state.user)