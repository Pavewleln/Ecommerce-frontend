import { getAccessToken, getRefreshToken } from "@/services/auth/auth.helper";
import { FC, PropsWithChildren, useEffect } from "react";
import { useActions } from "@/hooks/useActions";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

// Компонент, который проверяет различные права пользователя при нахождении на той или иной странице
const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuth();
    const { checkAuth, logout } = useActions();
    const { pathname } = useRouter();
    const router = useRouter();
    useEffect(() => {
        const accessToken = getAccessToken();
        if (accessToken) checkAuth();
    }, []);

    useEffect(() => {
        const refreshToken = getRefreshToken();
        if (!refreshToken && user) {
            logout();
            router.push("/auth/signIn");
            toast.error("Нет доступа");
        } else if (
            !refreshToken &&
            pathname !== "/auth/signIn" &&
            pathname !== "/auth/signUp"
        ) {
            router.push("/auth/signIn");
        }
    }, [pathname]);

    return <>{children}</>;
};
export default AuthProvider;
