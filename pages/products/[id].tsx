import {AddToBasketButton} from "@/components/ui/Home/Card/AddToBasketButton";
import {ProductsService} from "@/services/products/products.service";
import {IProduct} from "@/services/products/products.interface";
import {Comments} from "@/components/ui/Home/Card/Comments";
import {MainLayout} from "@/components/layouts/MainLayout";
import {formatPrice} from "@/utils/formatPrice";
import {Back} from "@/components/ui/Back";
import Image from "next/image";

export const getStaticProps = async (context: { params: { id: string; } }) => {
    const {data} = await ProductsService.getById(context.params.id);

    return {
        props: {
            data,
        },
    };
};

const Product = ({data}: { data: IProduct }) => {
    return (
        <MainLayout title={data ? data.title : ""}>
            <Back/>
            {data
                ? <>
                    <section
                        className="mx-auto bg-white dark:bg-gray-900 flex items-center justify-around flex-col md:flex-row">
                        {data.imageUrl
                            ? <Image src={data.imageUrl} alt={"Product"} width={400} height={400}
                                     className={"m-5"}/>
                            : <div className={"m-5 w-full max-w-[500px] h-[400px] bg-gray-300"}></div>
                        }
                        <div className="max-w-xl lg:py-16">
                            <h2 className="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">{data.title}</h2>
                            <div className={"flex items-center justify-between"}>
                                <p className="mb-4 text-xl font-extrabold leading-none text-gray-900 md:text-2xl dark:text-white">{formatPrice(data.price)}</p>
                                <p className="mb-4 text-xl font-bold leading-none text-gray-900 md:text-дп dark:text-white">На
                                    складе: {data.kol}</p>
                            </div>
                            <dl>
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Детали</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{data.description}</dd>
                            </dl>
                            <dl className="flex items-center space-x-6">
                                <div>
                                    <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Категория</dt>
                                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{data.type}</dd>
                                </div>
                            </dl>
                            <AddToBasketButton product={data}/>
                        </div>
                    </section>
                    <Comments/>
                </>
                : <h2>Ошибка. Такой продукт не найден</h2>
            }
        </MainLayout>
    )
}
export const getStaticPaths = async (context: { params: { id: string; }; }) => {
    const {data} = await ProductsService.getAll();

    const paths = data.map((item) => ({
        params: {id: item._id.toString()},
    }));
    return {
        paths,
        fallback: false,
    };
};
export default Product