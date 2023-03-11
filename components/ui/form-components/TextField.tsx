import {Controller} from "react-hook-form";
import {FC, useState} from "react";

interface TextFieldInt {
    id: string,
    control: any,
    label: string,
    name: string,
    type: string,
    placeholder: string,
    validation: any,
    error: any
}

export const TextField: FC<TextFieldInt> = ({
                                                id,
                                                control,
                                                label,
                                                name,
                                                type,
                                                placeholder,
                                                validation,
                                                error
                                            }: TextFieldInt) => {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    return (
        <div>
            <label htmlFor="phone"
                   className="block text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </label>
            <div className={"text-center"}>
                <div className={"flex items-center justify-between my-3"}>
                    <Controller
                        control={control}
                        name={name}
                        rules={validation}
                        render={({field}) => (
                            <input type={showPassword ? "text" : type}
                                   name={name}
                                   id={id}
                                   onChange={(e) => field.onChange(e)}
                                   value={field.value}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder={placeholder}
                            />
                        )}
                    />
                    {type === "password" &&
                        <div className={"p-2 cursor-pointer"}>
                            {showPassword
                                ? <svg onClick={toggleShowPassword} xmlns="http://www.w3.org/2000/svg" fill="none"
                                       viewBox="0 0 24 24" strokeWidth="1.5"
                                       stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                                : <svg onClick={toggleShowPassword} xmlns="http://www.w3.org/2000/svg" fill="none"
                                       viewBox="0 0 24 24" strokeWidth="1.5"
                                       stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
                                </svg>
                            }
                        </div>
                    }
                </div>
                {!!error &&
                    <span
                        className="font-medium px-1 mb-1 text-sm text-red-800 rounded-lg dark:bg-gray-800 dark:text-red-400">
                    {error.message}
                </span>
                }
            </div>
        </div>
    )
}