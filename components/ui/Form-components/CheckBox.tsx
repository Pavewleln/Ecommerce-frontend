import {Controller} from "react-hook-form";
import {FC} from "react";

interface ICheckBox {
    id: string,
    control: any,
    label: string,
    name: string,
    type: string,
}

// Кастомный checkbox
export const CheckBox: FC<ICheckBox> = ({
                                            id,
                                            control,
                                            label,
                                            name,
                                            type
                                        }) => {
    return (
        <div className="flex items-center">
            <Controller
                control={control}
                name={name}
                render={({field}) => (
                    <input
                        type={type}
                        name={name}
                        id={id}
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>

                )}
            />
            <label htmlFor="link-checkbox"
                   className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
        </div>
    )
}