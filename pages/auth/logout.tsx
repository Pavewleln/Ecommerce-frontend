import {Loader} from "@/components/ui/Loader";
import {useEffect} from "react";
import {useActions} from "@/hooks/useActions";
import {useRouter} from "next/router";

const Logout = () => {
    const {replace} = useRouter()
    const {logout} = useActions()
    useEffect(() => {
        logout()
        setTimeout(() => {
            replace('/auth/signIn')
        }, 500)
    }, [])
    return (
        <div className={"h-screen flex items-center justify-center"}>
            <Loader/>
        </div>
    )
}
export default Logout