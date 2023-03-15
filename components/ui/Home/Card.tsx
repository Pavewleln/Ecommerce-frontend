import img from '../../../assets/images/image-1.jpg'
import Image from "next/image";

interface ICard {
    title: string,
    price: number,
    kol: number,
    description: string
}

export const Card = () => {
    return (

        <div
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
            <a href="#">
                <Image className="rounded-t-lg" src={img} alt="Product"/>
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy
                        technology acquisitions 2021</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise
                    technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
                    <button
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        В корзину
                    </button>
                </div>
            </div>
        </div>

    )
}