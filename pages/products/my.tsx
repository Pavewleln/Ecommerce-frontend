import { MyProductsSkeleton } from "@/components/ui/Skeletons/MyProductsSkeleton";
import { ProductsService } from "@/services/products/products.service";
import { IProduct } from "@/services/products/products.interface";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Card } from "@/components/ui/Home/Card/Card";
import { useQuery } from "@tanstack/react-query";
import { Back } from "@/components/ui/Back";

const My = () => {
    const { data, isLoading } = useQuery(
        ["get all my products"],
        () => ProductsService.myProducts(),
        {
            select: ({ data }) => data as IProduct[],
            staleTime: 12000
        }
    );
    return (
        <MainLayout title={"Мои продукты"}>
            <Back />
            <h1 className="mb-4 text-xl font-bold text-gray-900 dark:text-white m-2 text-center">
                Ваши товары
            </h1>
            {isLoading ? (
                <MyProductsSkeleton />
            ) : (
                <div>
                    {data && data.length ? (
                        <div
                            className={
                                "flex items-center flex-wrap justify-center"
                            }
                        >
                            {data.map(product => (
                                <Card key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div>
                            <h1>У вас нет своих товаров</h1>
                        </div>
                    )}
                </div>
            )}
        </MainLayout>
    );
};
export default My;
