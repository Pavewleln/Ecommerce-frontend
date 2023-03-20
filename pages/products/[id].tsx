import { AddToBasketButton } from "@/components/ui/Home/Card/AddToBasketButton";
import { ProductsService } from "@/services/products/products.service";
import { Comments } from "@/components/ui/FullInfoProduct/Comments";
import { IProduct } from "@/services/products/products.interface";
import { MainLayout } from "@/components/layouts/MainLayout";
import { formatPrice } from "@/utils/formatPrice";
import { classNames } from "@/utils/classNames";
import { Back } from "@/components/ui/Back";
import Image from "next/image";

export const getStaticProps = async (context: { params: { id: string } }) => {
    const { data } = await ProductsService.getById(context.params.id);
    return {
        props: {
            data
        }
    };
};

const Product = ({ data }: { data: IProduct }) => {
    const { kol, description, price, title, images, type, _id } = data;
    return (
        <MainLayout title={data ? data.title : ""}>
            <Back />
            {data ? (
                <>
                    <section className="mx-auto bg-white dark:bg-gray-900 flex items-center justify-around flex-col md:flex-row p-2">
                        {images.length ? (
                            <Image
                                src={images[0]}
                                alt={"Product"}
                                width={400}
                                height={400}
                                className={
                                    "m-5 max-w-[500px] min-h-[250px] h-max md:max-h-[400px] w-auto"
                                }
                            />
                        ) : (
                            <div
                                className={
                                    "m-5 w-full max-w-[500px] min-w-[300px] md:min-w-[350px] min-h-[300px] h-max sm:h-[300px] md:h-[400px] bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 dark:bg-gray-600"
                                }
                            >
                                Нет фото
                            </div>
                        )}
                        <div className="max-w-xl lg:py-16">
                            <h2 className="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">
                                {title}
                            </h2>
                            <div
                                className={"flex items-center justify-between"}
                            >
                                <p className="mb-4 text-xl font-extrabold leading-none text-gray-900 md:text-2xl dark:text-white">
                                    {formatPrice(price)}
                                </p>
                                <p
                                    className={classNames(
                                        !kol || kol <= 0 ? "text-red-400" : "",
                                        "mb-4 text-xl font-bold leading-none text-gray-900 dark:text-white"
                                    )}
                                >
                                    На складе: {!kol || kol <= 0 ? 0 : kol}
                                </p>
                            </div>
                            <dl>
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                                    Детали
                                </dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                                    {description}
                                </dd>
                            </dl>
                            <dl className="flex items-center space-x-6">
                                <div>
                                    <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                                        Категория
                                    </dt>
                                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                                        {type}
                                    </dd>
                                </div>
                            </dl>
                            <AddToBasketButton
                                product={data}
                                condition={Boolean(!kol || kol <= 0)}
                            />
                        </div>
                    </section>
                    <Comments productId={_id} />
                </>
            ) : (
                <h2>Ошибка. Такой продукт не найден</h2>
            )}
        </MainLayout>
    );
};
export const getStaticPaths = async () => {
    const { data } = await ProductsService.getAll();
    const paths = data.map(item => ({
        params: { id: item._id.toString() }
    }));
    return {
        paths,
        fallback: false
    };
};
export default Product;
