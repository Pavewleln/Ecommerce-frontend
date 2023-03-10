import {Home} from "@/components/views/Home";
import {MainLayout} from "@/components/layouts/MainLayout";

const HomePage = () => {
    return (
        <MainLayout title={"Главная"}>
            <Home/>
        </MainLayout>
    )
}
export default HomePage