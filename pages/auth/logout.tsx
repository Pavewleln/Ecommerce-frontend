import { useActions } from "@/hooks/useActions";
import { Loader } from "@/components/ui/Loader";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Logout = () => {
    const { replace } = useRouter();
    const { logout } = useActions();
    useEffect(() => {
        logout();
        setTimeout(async () => {
            await replace("/auth/signIn");
        }, 500);
    }, []);
    return (
        <div className={"h-screen flex items-center justify-center"}>
            <Loader />
        </div>
    );
};
export default Logout;
