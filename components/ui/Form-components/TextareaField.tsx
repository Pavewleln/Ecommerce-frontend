import { useRestrictTyping } from "@/hooks/useRestrictTyping";
import { classNames } from "@/utils/classNames";
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
}

// Кастомный textarea
export const TextareaField: FC<ITextareaField> = ({
    id,
    control,
    label,
    name,
    placeholder,
    validation
}) => {
    const { handleChangeTextarea, textLimitPercent } = useRestrictTyping(150);
    return (
        <div className={"m-2"}>
            <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <div className={"text-center"}>
                <div className={"flex items-center justify-between my-3"}>
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
                                onChange={event => {
                                    handleChangeTextarea(event);
                                    field.onChange(event);
                                }}
                            />
                        )}
                    />
                </div>
                {textLimitPercent > 0 && (
                    <div className="w-[120px] bg-gray-200 rounded-xl h-1 mb-4 dark:bg-gray-700">
                        <div
                            className={classNames(
                                textLimitPercent < 70
                                    ? "bg-green-500"
                                    : textLimitPercent < 90
                                    ? "bg-orange-500"
                                    : "bg-red-500",
                                " h-1 rounded-xl"
                            )}
                            style={{ width: textLimitPercent }}
                        ></div>
                    </div>
                )}
            </div>
        </div>
    );
};
