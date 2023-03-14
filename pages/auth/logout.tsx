import {Loader} from "@/components/ui/Loader";
import {MainLayout} from "@/components/layouts/MainLayout";
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
        <MainLayout title={"Выход"}>
            <Loader/>
        </MainLayout>
    )
}
export default Logout