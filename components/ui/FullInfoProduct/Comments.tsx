import { ICreateCommentResponse } from "@/services/comments/comments.interface";
import { CommentsSkeleton } from "@/components/ui/Skeletons/CommentsSkeleton";
import { CommentRating } from "@/components/ui/FullInfoProduct/CommentRating";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TextareaField } from "@/components/ui/Form-components/TextareaField";
import { ButtonForm } from "@/components/ui/Form-components/ButtonForm";
import { CommentsService } from "@/services/comments/comments.service";
import { Comment } from "@/components/ui/FullInfoProduct/Comment";
import { descriptionValidation } from "@/utils/validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { FC, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";

export const Comments: FC<{ productId: string }> = ({ productId }) => {
    const [rating, setRating] = useState(5);
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const {
        data: comments,
        isLoading,
        refetch
    } = useQuery(
        ["get all comments"],
        async () => await CommentsService.getAll(productId),
        {
            select: ({ data }) => data,
            staleTime: 12000
        }
    );
    const createComment = useMutation(
        (newComment: ICreateCommentResponse) =>
            CommentsService.create(newComment),
        {
            onSuccess: () => queryClient.invalidateQueries(["get all comments"])
        }
    );
    useEffect(() => {
        refetch();
    }, [productId]);

    const {
        handleSubmit,
        control,
        reset,
        formState: { isValid }
    } = useForm<ICreateCommentResponse>({
        defaultValues: {
            author: user?.name,
            avatarUrl: user?.avatarUrl,
            product: productId,
            text: ""
        },
        mode: "onChange"
    });

    useEffect(() => {
        if (user) {
            reset({
                author: user.name,
                avatarUrl: user.avatarUrl,
                product: productId,
                text: ""
            });
        }
    }, [user]);

    const onSubmit: SubmitHandler<
        ICreateCommentResponse
    > = async newComment => {
        try {
            await createComment.mutate({ ...newComment, rating });
        } catch (err) {
            toast.error("Ошибка. Попробуйте позже");
        } finally {
            setRating(0.5);
        }
    };
    return !isLoading ? (
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
            <div className="max-w-2xl mx-auto px-4">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    Отзывы
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="py-2 px-4 mb-4 bg-white">
                        <TextareaField
                            id={"text"}
                            control={control}
                            label={"Отзыв"}
                            name={"text"}
                            placeholder={"Не менее 10 символов"}
                            validation={descriptionValidation}
                        />
                        <div className={"flex items-center ml-2"}>
                            <p
                                className={
                                    "font-semibold leading-none text-gray-900 dark:text-white"
                                }
                            >
                                Оценка:
                            </p>
                            <CommentRating
                                action={true}
                                rating={rating}
                                setRating={setRating}
                            />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className={"w-[170px] m-auto"}>
                            <ButtonForm
                                label={"Оставить отзыв"}
                                isValid={isValid}
                            />
                        </div>
                    </div>
                </form>
                <div className={"max-h-[400px] overflow-y-auto"}>
                    {comments && comments.length ? (
                        comments.map(comment => (
                            <Comment comment={comment} key={comment._id} />
                        ))
                    ) : (
                        <h2 className={"text-center text-gray-300 mt-20"}>
                            Нет комментариев
                        </h2>
                    )}
                </div>
            </div>
        </section>
    ) : (
        <CommentsSkeleton />
    );
};
