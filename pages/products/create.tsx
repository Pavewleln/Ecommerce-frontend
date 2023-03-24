import { ICreateProductResponse } from "@/services/products/products.interface";
import { TextareaField } from "@/components/ui/Form-components/TextareaField";
import { ButtonForm } from "@/components/ui/Form-components/ButtonForm";
import { ProductsService } from "@/services/products/products.service";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import { TextField } from "@/components/ui/Form-components/TextField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MainLayout } from "@/components/layouts/MainLayout";
import { ChangeEvent, useEffect, useState } from "react";
import { Back } from "@/components/ui/Back";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Image from "next/image";
import {
    descriptionValidation,
    kolValidation,
    priceValidation,
    titleValidation,
    typeValidation
} from "@/utils/validation";
import axios from "axios";

const Create = () => {
    const [drag, setDrag] = useState(false);
    const [files, setFiles] = useState<string[]>([]);
    const queryClient = useQueryClient();
    const { back } = useRouter();
    const { user } = useAuth();
    useEffect(() => {
        if (user?.isAdmin === false) {
            back();
            toast.error("Вы не продавец");
        }
    }, [user]);
    const createProduct = useMutation(
        (newProduct: ICreateProductResponse) =>
            ProductsService.create(newProduct),
        { onSuccess: () => queryClient.invalidateQueries(["get all products"]) }
    );
    // настройка
    const {
        handleSubmit,
        control,
        reset,
        formState: { isValid }
    } = useForm<ICreateProductResponse>({
        defaultValues: {
            type: "",
            description: "",
            price: 0,
            title: "",
            kol: 0,
            images: files
        },
        mode: "onChange"
    });

    useEffect(() => {
        reset({
            images: files
        });
    }, [files]);

    const { errors } = useFormState({
        control
    });

    const deleteFile = (file: string) => {
        setFiles(files.filter(fileUrl => fileUrl !== file));
    };

    const handleChangeFiles = async (event: ChangeEvent<HTMLInputElement>) => {
        try {
            if (event.target.files) {
                const files = Array.from(event.target.files);
                const urls: string[] = [];
                for (const file of files) {
                    const formData = new FormData();
                    formData.append("images", file);
                    const { data } = await axios.post(
                        `${process.env.SERVER_URL}upload`,
                        formData
                    );
                    urls.push(`${process.env.SERVER_URL}${data.url}`);
                }
                setFiles(prevFiles => prevFiles.concat(urls));
            }
        } catch (err) {
            toast.error("Ошибка при загрузке файла");
        }
    };

    // eslint-disable-next-line
    const dragStartHandler = (e: any) => {
        e.preventDefault();
        setDrag(true);
    };

    // eslint-disable-next-line
    const dragLeaveHandler = (e: any) => {
        e.preventDefault();
        setDrag(false);
    };

    // eslint-disable-next-line
    const onDrag = async (event: any) => {
        event.preventDefault();
        try {
            if (event.dataTransfer.files) {
                const files = [...event.dataTransfer.files];
                const urls: string[] = [];
                for (const file of files) {
                    const formData = new FormData();
                    formData.append("images", file);
                    const { data } = await axios.post(
                        `${process.env.SERVER_URL}upload`,
                        formData
                    );
                    urls.push(`${process.env.SERVER_URL}${data.url}`);
                }
                setFiles(prevFiles => prevFiles.concat(urls));
            }
        } catch (err) {
            toast.error("Ошибка при загрузке файла");
        }
    };

    const onSubmit: SubmitHandler<
        ICreateProductResponse
    > = async createData => {
        try {
            if (user) {
                await createProduct.mutate(createData);
                toast.success("Продукт успешно создан");
            }
        } catch (err) {
            toast.error("Ошибка. Попробуйте позже");
        } finally {
            reset({
                type: "",
                description: "",
                price: 0,
                title: "",
                kol: 0,
                images: files
            });
        }
    };

    return (
        <MainLayout title={"Создать свой продукт"}>
            <Back />
            <div>
                <section className="bg-white dark:bg-gray-900">
                    <div className="py-8 px-4 mx-auto max-w-7xl lg:py-16">
                        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white m-2 text-center">
                            Создать новый продукт
                        </h2>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className={"flex justify-around"}
                        >
                            <div>
                                <label
                                    htmlFor="images"
                                    className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                                >
                                    Загрузить фото с компьютера
                                </label>
                                <div
                                    className="flex items-center justify-center"
                                    onDragStart={e => dragStartHandler(e)}
                                    onDragLeave={e => dragLeaveHandler(e)}
                                    onDragOver={e => dragStartHandler(e)}
                                    onDrop={e => onDrag(e)}
                                >
                                    <label
                                        htmlFor="dropzone-file"
                                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                    >
                                        <div className="flex flex-col items-center justify-center py-6 px-28">
                                            <svg
                                                aria-hidden="true"
                                                className="w-10 h-10 mb-3 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                ></path>
                                            </svg>
                                            {drag ? (
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">
                                                        Сюда
                                                    </span>
                                                </p>
                                            ) : (
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">
                                                        Кликните{" "}
                                                    </span>
                                                    или перетащите
                                                </p>
                                            )}
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                SVG, PNG, JPG or GIF (MAX.
                                                800x400px)
                                            </p>
                                        </div>
                                        <input
                                            id="dropzone-file"
                                            type="file"
                                            className="hidden"
                                            multiple
                                            onChange={handleChangeFiles}
                                        />
                                    </label>
                                </div>
                                <div className="row mx-0 flex items-center">
                                    {files &&
                                        files.map((file, index) => (
                                            <Image
                                                loader={() => file}
                                                key={index}
                                                src={file}
                                                alt={file}
                                                className={
                                                    "img-thumbnail rounded-lg border p-2 w-24 h-24 m-1 cursor-pointer hover:bg-red-100"
                                                }
                                                height={20}
                                                width={20}
                                                onClick={() => deleteFile(file)}
                                            />
                                        ))}
                                </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div className="sm:col-span-2">
                                    <TextField
                                        id={"title"}
                                        control={control}
                                        label={"Название"}
                                        name={"title"}
                                        type={"text"}
                                        placeholder={"Название"}
                                        validation={titleValidation}
                                        error={errors.title}
                                    />
                                </div>
                                <div className="w-full">
                                    <TextField
                                        id={"type"}
                                        control={control}
                                        label={"Бренд"}
                                        name={"type"}
                                        type={"text"}
                                        placeholder={"Бренд"}
                                        validation={typeValidation}
                                        error={errors.type}
                                    />
                                </div>
                                <div className="w-full">
                                    <TextField
                                        id={"price"}
                                        control={control}
                                        label={"Цена"}
                                        name={"price"}
                                        type={"number"}
                                        placeholder={"Цена"}
                                        validation={priceValidation}
                                        error={errors.price}
                                    />
                                </div>
                                <div className="w-full">
                                    <TextField
                                        id={"kol"}
                                        control={control}
                                        label={"Количество"}
                                        name={"kol"}
                                        type={"number"}
                                        placeholder={"Количество"}
                                        validation={kolValidation}
                                        error={errors.kol}
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <TextareaField
                                        id={"description"}
                                        control={control}
                                        label={"Описание"}
                                        name={"description"}
                                        placeholder={"Не менее 10 символов"}
                                        validation={descriptionValidation}
                                    />
                                </div>
                                <div className={"w-[100px] m-2"}>
                                    <ButtonForm
                                        label={"Создать"}
                                        isValid={isValid}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
};
export default Create;
