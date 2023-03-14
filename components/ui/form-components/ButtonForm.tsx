import {Loader} from "../Loader";
import {FC} from "react";

interface IButtonForm {
    isValid?: boolean,
    label: string,
    isLoading?: boolean,
    submit?: () => void
}

export const ButtonForm: FC<IButtonForm> = ({isValid = true, label, isLoading = false, submit}: IButtonForm) => {
    return (
        <button
            onClick={submit}
            className={`${
                !isValid
                    ? 'bg-blue-100 hover:bg-blue-200 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-500'
            }
                 w-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center transition-all`}
            type="submit"
            disabled={!isValid}
        >
            <span className={"mx-2"}>{label}</span>
            {isLoading
                && <Loader/>
            }
        </button>
    )
}