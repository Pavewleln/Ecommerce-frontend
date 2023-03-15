import {MainLayout} from "@/components/layouts/MainLayout";
import {Card} from "@/components/ui/Home/Card";
import {CardsFilter} from "@/components/ui/Home/CardsFilter";

const HomePage = () => {
    return (
        <MainLayout title={"Главная"}>
            <div className={"flex justify-between"}>
                <CardsFilter/>
                <div className={"flex items-center flex-wrap justify-center"}>
                    {[...Array(5)].map((index) => (
                        <Card key={index}/>
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}
export default HomePage