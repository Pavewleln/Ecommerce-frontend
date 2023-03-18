import {IProduct, TypeDataFilters} from "@/services/products/products.interface";
import {groupCategories} from "@/utils/groupCategories";
import {ChangeEvent, FC, useState} from "react";
import {classNames} from "@/utils/classNames";

interface ICardsFilter {
    products: IProduct[],
    search: TypeDataFilters,
    handleFromPrice: (event: ChangeEvent<HTMLInputElement>) => void,
    handleBeforePrice: (event: ChangeEvent<HTMLInputElement>) => void,
    handleChangeCategories: (event: ChangeEvent<HTMLInputElement>) => void
}

export const CardsFilter: FC<ICardsFilter> = ({
                                                  products,
                                                  search,
                                                  handleFromPrice,
                                                  handleBeforePrice,
                                                  handleChangeCategories
                                              }) => {
    const [dropdown, setDropdown] = useState<boolean>(false)
    const categories = groupCategories(products)

    return (
        <>
            <div className={"text-center mt-2"}>
                {/*Кнопка. При маленьком окне*/}
                <button id="dropdown-button" data-dropdown-toggle="dropdown"
                        type="button"
                        className="block md:hidden inline-flex items-center px-3 py-2 text-sm font-medium
                      text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4
                     focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
                     dark:focus:ring-blue-800 mb-2 px-20"
                        onClick={() => setDropdown(!dropdown)}>
                    Фильтр
                </button>
                {/*Категории*/}
                <div
                    className={classNames(dropdown ? "block" : "hidden", "z-10 p-2 bg-white rounded-lg shadow dark:bg-gray-700 text-center m-auto flex flex-row md:block justify-center mb-2")}>
                    <div className={"mb-4 w-48"}>
                        <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                            Категории
                        </h6>
                        <ul className="space-y-2 text-sm " aria-labelledby="dropdownDefault">
                            {categories.map((category, index) => (
                                <li key={index}>
                                    <input id={category.label}
                                           type="checkbox"
                                           value={category.label}
                                           onChange={handleChangeCategories}
                                           checked={!!search.categories.find((c) => c === category.label)}
                                           className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer"/>
                                    <label htmlFor={category.label}
                                           className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {category.label} ({category.matches})
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/*Цена*/}
                    <div>
                        <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                            Цена
                        </h6>
                        <input type="number"
                               value={search.fromPrice}
                               name="fromPrice"
                               id="fromPrice"
                               className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                               placeholder="от"
                               onChange={handleFromPrice}
                        />
                        <input type="number"
                               value={search.beforePrice}
                               name="beforePrice"
                               id="beforePrice"
                               className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                               placeholder="до"
                               onChange={handleBeforePrice}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}