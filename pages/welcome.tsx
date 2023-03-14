import {useAuthRedirect} from "@/hooks/useAuthRedirect";

const Welcome = () => {
    useAuthRedirect()
    return (
        <div>
            Welcome
        </div>
    )
}
export default Welcome