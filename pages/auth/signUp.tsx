import {AuthLayout} from "@/components/layouts/AuthLayout";
import { ButtonForm } from "@/components/ui/form-components/ButtonForm";
import { TextField } from "@/components/ui/form-components/TextField";
import Link from "next/link";
import {useRouter} from "next/router";
import { useEffect } from "react";

const SignUp = () => {
    // настройка
    // const dispatch = useAppDispatch()
    // const router = useRouter()
    // const [register, {
    //     isLoading: isLoadingRegister,
    //     data: token,
    //     isSuccess: isRegisterSuccess,
    //     isError: isRegisterError,
    //     error: registerError
    // }] = useRegisterMutation()
    //
    // const {
    //     handleSubmit,
    //     control,
    //     formState: {isValid}
    // } = useForm<ISignUpForm>({
    //     defaultValues: {
    //         fullname: '',
    //         email: '',
    //         password: ''
    //     },
    //     mode: "onChange"
    // });
    // const {errors} = useFormState({
    //     control
    // })
    //
    // // Если успешно
    // useEffect(() => {
    //     if (isRegisterSuccess && token) {
    //         dispatch(setToken({token}))
    //         setTimeout(() => {
    //             router.push('/')
    //         }, 1000)
    //         toast.success("Вы успешно авторизованы!")
    //     }
    // }, [isRegisterSuccess])
    //
    // // Если ошибка
    // useEffect(() => {
    //     if (isRegisterError) {
    //         toast.error((registerError as any).data.message)
    //     }
    // }, [isRegisterError])
    //
    // const onSubmit: SubmitHandler<ISignUpForm> = async (registerData) => {
    //     try {
    //         await register(registerData)
    //     } catch (err) {
    //         toast.error('Ошибка. Попробуйте позже')
    //     }
    // };
    // return (
    //     <AuthLayout title={"Регистрация"}>
    //         <section className="bg-gray-50 dark:bg-gray-900">
    //             <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    //                 <div
    //                     className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    //                     <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
    //                         <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
    //                             Зарегистрироваться
    //                         </h1>
    //                         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
    //                             {/*Имя*/}
    //                             <TextField
    //                                 name={"fullname"}
    //                                 type={"text"}
    //                                 control={control}
    //                                 validation={fullnameValidation}
    //                                 label={"Имя"}
    //                                 placeholder={"Иван Иванов"}
    //                                 error={errors.fullname}
    //                                 id={"fullname"}
    //                             />
    //                             {/*Почта*/}
    //                             <TextField
    //                                 name={"email"}
    //                                 type={"email"}
    //                                 control={control}
    //                                 validation={emailValidation}
    //                                 label={"Почта"}
    //                                 placeholder={"@"}
    //                                 error={errors.email}
    //                                 id={"email"}
    //                             />
    //                             {/*Пароль*/}
    //                             <TextField
    //                                 name={"password"}
    //                                 type={"password"}
    //                                 control={control}
    //                                 validation={passwordValidation}
    //                                 label={"Пароль"}
    //                                 placeholder={"******"}
    //                                 error={errors.password}
    //                                 id={"password"}
    //                             />
    //                             <ButtonForm isLoading={isLoadingRegister} isValid={isValid} label={"Зарегистрироваться"}/>
    //                             <p className="text-sm font-light text-gray-500 dark:text-gray-400">
    //                                 Уже есть аккаунт?
    //                                 <Link href={"/signIn"}
    //                                       className="font-medium text-primary-600 hover:underline dark:text-primary-500">
    //                                     Войти
    //                                 </Link>
    //                             </p>
    //                         </form>
    //                     </div>
    //                 </div>
    //             </div>
    //         </section>
    //     </AuthLayout>
    // )
}
export default SignUp