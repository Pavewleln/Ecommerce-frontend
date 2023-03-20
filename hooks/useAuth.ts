import { useAppSelector } from "@/hooks/useAppSelector";

// Достаем state из user.slice.tsx
export const useAuth = () => useAppSelector(state => state.user);
