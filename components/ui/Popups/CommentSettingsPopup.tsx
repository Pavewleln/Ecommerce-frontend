import {IPopup} from "@/components/ui/Popups/popup.types";
import {classNames} from "@/utils/classNames";
import {FC} from "react";

export const CommentSettingsPopup: FC<IPopup> = ({showModal, setShowModal, comment}) => {

    return (
        <div id="dropdownComment"
             className={classNames(showModal ? "absolute" : "hidden", "z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600")}>
            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownMenuIconHorizontalButton">
                <li>
                    <a href="#"
                       className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                </li>
                <li>
                    <a href="#"
                       className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                </li>
                <li>
                    <a href="#"
                       className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                </li>
            </ul>
        </div>
    )
}