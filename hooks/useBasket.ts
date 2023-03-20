import { useAppSelector } from "@/hooks/useAppSelector";

export const useBasket = () => useAppSelector(state => state.basket);
