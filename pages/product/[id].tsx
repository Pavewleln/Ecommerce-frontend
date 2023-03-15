import {MainLayout} from "@/components/layouts/MainLayout";
import Image from "next/image";
import {Back} from "@/components/ui/Back";

const productInfo = {
    _id: "laiuvbo783gv4,kadv",
    kol: 45,
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, vero!",
    price: 20000,
    title: "IMac",
    imageUrl: 'data:image/jpeg;base64,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',
    type: 'Xiaomi',
    seller: "kjbsvdliasvb"
}
const Product = () => {
    const {kol, description, type, imageUrl, price, title} = productInfo
    return (
        <MainLayout title={title}>
            <Back/>
            <section className="mx-auto bg-white dark:bg-gray-900 flex items-center justify-around flex-col md:flex-row">
                <Image src={imageUrl} alt={"Product"} width={400} height={400} className={"m-5"}/>
                <div className="max-w-xl lg:py-16">
                    <h2 className="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">{title}</h2>
                    <div className={"flex items-center justify-between"}>
                        <p className="mb-4 text-xl font-extrabold leading-none text-gray-900 md:text-2xl dark:text-white">${price}</p>
                        <p className="mb-4 text-xl font-bold leading-none text-gray-900 md:text-дп dark:text-white">На складе: {kol}</p>
                    </div>
                    <dl>
                        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Details</dt>
                        <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{description}</dd>
                    </dl>
                    <dl className="flex items-center space-x-6">
                        <div>
                            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Category</dt>
                            <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{type}</dd>
                        </div>
                    </dl>
                    <div className="flex items-center space-x-4">
                        <button type="button"
                                className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800
                                focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm
                                px-3 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth="1.5"
                                 stroke="currentColor" className="mr-1 -ml-1 w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                            </svg>

                            В корзину
                        </button>
                        <button type="button"
                                className="inline-flex items-center text-white bg-green-600 hover:bg-green-700 focus:ring-4
                                focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center
                                dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-900"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth="1.5"
                                 stroke="currentColor" className="mr-1 -ml-1 w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>
                            </svg>
                            Оставить отзыв
                        </button>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}
export default Product