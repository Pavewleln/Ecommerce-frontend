import { Controller } from "react-hook-form";
import { FC } from "react";

interface ITextareaField {
    id: string;
    // eslint-disable-next-line
    control: any;
    label: string;
    name: string;
    placeholder: string;
    // eslint-disable-next-line
    validation: any;
    // eslint-disable-next-line
    error: any;
}

// Кастомный textarea
export const TextareaField: FC<ITextareaField> = ({
    id,
    control,
    label,
    name,
    placeholder,
    validation,
    error
}) => {
    return (
        <div className={"m-2"}>
            <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <Controller
                control={control}
                name={name}
                rules={validation}
                render={({ field }) => (
                    <textarea
                        id={id}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder={placeholder}
                        required
                        value={field.value}
                        onChange={e => field.onChange(e)}
                    />
                )}
            />
            {error && (
                <span className="font-medium px-1 mb-1 text-sm text-red-800 rounded-lg dark:bg-gray-800 dark:text-red-400">
                    {error.message}
                </span>
            )}
        </div>
    );
};
