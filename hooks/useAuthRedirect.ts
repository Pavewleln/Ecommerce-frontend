import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "next/router";
import {useEffect} from "react";

export const useAuthRedirect = () => {
    const {user} = useAuth()
    const {replace} = useRouter()
    useEffect(() => {
        if (user && user.isAdmin === false) {
            replace('/')
        } else if(user && user.isAdmin === true) {
            replace('/')
        }
    }, [user])
}