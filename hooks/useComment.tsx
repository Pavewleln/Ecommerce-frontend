import {ICreateCommentResponse} from "@/services/comments/comments.interface";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {CommentsService} from "@/services/comments/comments.service";
import {useAuth} from "@/hooks/useAuth";
import {toast} from "react-toastify";
import {FormEvent} from "react";

interface IUseComment {
    productId: string,
    text: string,
    setText: any,
    rating?: number,
    setRating?: (rating: number) => void
}

export const useComment = ({
                               productId,
                               text,
                               setText,
                               rating,
                               setRating
                           }: IUseComment) => {
    const {user} = useAuth()
    const queryClient = useQueryClient()
    const {
        data: comments,
        isLoading
    } = useQuery(['get all comments'], async () => await CommentsService.getAll(productId), {
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
                    avatarUrl: user?.avatarUrl,
                    product: productId,
                    authorId: user._id,
                    rating,
                    text,
                }
                await createComment.mutate(newComment)
            }
        } catch (err) {
            toast.error('Ошибка. Попробуйте позже')
        }
        setText("")
        if (setRating) {
            setRating(0.5)
        }
    }
    return {
        onSubmit,
        comments,
        isLoading
    }
}