import {ICard} from "@/components/ui/Home/Card";
import {classNames} from "@/utils/classNames";
import {groupCategories} from "@/utils/groupCategories";
import {useMemo, useState} from "react";

export const CardsFilter = ({cards}: { cards: ICard[] }) => {
    const [dropdown, setDropdown] = useState<boolean>(false)
    const categories = groupCategories(cards)
    return (
        <>
            {/*При большом окне*/}
            <div className={"text-center mt-2 hidden md:block"}>
                <div className={"z-10 w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700 text-center m-auto"}>
                    <div className={"mb-4"}>
                        <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                            Категории
                        </h6>
                        <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                            {categories.map((category, index) => useMemo(() => (
                                <li className="flex items-center" key={index}>
                                    <input id={category.label} type="checkbox" value={category.label}
                                           className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer"/>
                                    <label htmlFor={category.label}
                                           className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {category.label} ({category.matches})
                                    </label>
                                </li>
                            ), categories))}
                        </ul>
                    </div>
                    <div>
                        <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                            Цена
                        </h6>
                    </div>
                </div>
            </div>
            {/*На маленьком окне*/}
            <div className={"text-center m-2 mt-0 md:hidden"}>
                <button id="dropdown-button" data-dropdown-toggle="dropdown"
                        type="button"
                        onClick={() => setDropdown(!dropdown)}
                >
                    Фильтр
                </button>
                <div className={classNames(dropdown ? "block" : "hidden")}>
                    <div
                        className={"z-10 p-3 bg-white rounded-lg shadow dark:bg-gray-700 text-center m-auto flex justify-center flex-wrap"}>
                        <div className={"mb-4 w-48"}>
                            <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                                Категории
                            </h6>
                            <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                                {categories && categories.map(({matches, label}, index) => (
                                    <li className="flex items-center" key={index}>
                                        <input id={label} type="checkbox" value={label}
                                               className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer"/>
                                        <label htmlFor={label}
                                               className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {label} ({matches})
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={"w-48"}>
                            <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                                Цена
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}