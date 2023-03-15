import {classNames} from "@/utils/classNames";
import {useState} from "react";

export const SearchProduct = () => {
    // Поиск
    const [search, setSearch] = useState<string>('')
    const [dropdown, setDropdown] = useState<boolean>(false)
    return (
        <div className="flex m-2 mt-0">
            <button id="dropdown-button" data-dropdown-toggle="dropdown"
                    className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4
                    text-sm font-medium text-center text-gray-900 bg-gray-100 border
                    border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4
                    focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600
                    dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                    type="button"
                    onClick={() => setDropdown(!dropdown)}
            >
                Сортировать
                {!dropdown
                    ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                           stroke="currentColor" className="w-5 h-5 p-0 m-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                    </svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                           stroke="currentColor" className="w-5 h-5 p-0 m-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/>
                    </svg>
                }
            </button>
            <div id="dropdown"
                 className={classNames(dropdown ? "absolute" : "hidden", "z-20 w-32 p-3 bg-white rounded-lg shadow dark:bg-gray-700 mt-12")}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                    <li>
                        <button type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Дата
                        </button>
                    </li>
                    <li>
                        <button type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Дата
                        </button>
                    </li>
                    <li>
                        <button type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Цена
                        </button>
                    </li>
                    <li>
                        <button type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Цена
                        </button>
                    </li>
                </ul>
            </div>
            <input type="search" id="search-dropdown"
                   className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50
                           rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300
                           focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700
                           dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                   placeholder="Поиск"/>
        </div>
    )
}