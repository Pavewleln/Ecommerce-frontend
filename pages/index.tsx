import {HomeSkeleton} from "@/components/ui/Skeletons/HomeSkeleton";
import {SearchProduct} from "@/components/ui/Home/SearchProduct";
import {CardsFilter} from "@/components/ui/Home/CardsFilter";
import {MainLayout} from "@/components/layouts/MainLayout";
import {IProduct} from "@/services/products/products.interface";
import {Card} from "@/components/ui/Home/Card/Card";
import {useQuery} from "@tanstack/react-query";
import {ProductsService} from "@/services/products/products.service";

const HomePage = () => {
    const {data, isLoading} = useQuery(['get all products'], () => ProductsService.getAll(), {
        select: ({data}) => data as IProduct[]
    })
    return (
        <MainLayout title={"Главная"}>
            {/*Появляется здесь после 800px*/}
            {data && data.length
                && <div className={"block md:hidden"}>
                    <CardsFilter products={data}/>
                </div>
            }
            <SearchProduct/>
            {!isLoading
                ? <div className={"flex justify-around"}>
                    {data && data.length ?
                        <>
                            {/*Исчезает после 800px*/}
                            <div className={"hidden md:block"}>
                                <CardsFilter products={data}/>
                            </div>
                            <div className={"flex items-center flex-wrap justify-center"}>
                                {data.map((product) => (
                                    <Card key={product._id}
                                          product={product}
                                    />
                                ))}
                            </div>
                        </>
                        : <h1>Произошла ошибка</h1>
                    }
                </div>
                : <HomeSkeleton/>
            }
        </MainLayout>
    )
}
export default HomePage