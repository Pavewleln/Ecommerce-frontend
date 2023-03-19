import {ICreateCommentResponse} from "@/services/comments/comments.interface";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {CommentsService} from "@/services/comments/comments.service";
import {useAuth} from "@/hooks/useAuth";
import {toast} from "react-toastify";
import {FormEvent} from "react";

export const useComment = ({productId, text, setText}: { productId: string, text: string, setText: any }) => {
    const {user} = useAuth()
    const queryClient = useQueryClient()
    const {data: comments, isLoading} = useQuery(['get all comments'], async () => await CommentsService.getAll(productId), {
        select: ({data}) => data,
        staleTime: 12000
    })
    const createComment = useMutation((newComment: ICreateCommentResponse) => CommentsService.create(newComment), {
        onSuccess: () => queryClient.invalidateQueries(['get all comments'])
    })

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (user) {
                const newComment = {
                    author: user?.name,
                    text,
                    avatarUrl: user?.avatarUrl,
                    product: productId
                }
                await createComment.mutate(newComment)
                setText("")
            }
        } catch (err) {
            toast.error('Ошибка. Попробуйте позже')
        }
    }
    return {
        onSubmit,
        comments,
        isLoading
    }
}