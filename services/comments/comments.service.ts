import {IComment, ICreateCommentResponse} from "./comments.interface";
import {instance} from "@/api/api.interceptors";
export const CommentsService = {
    async getAll(productId: string) {
        return await instance<IComment[]>({
            url: `comments/${productId}`,
            method: 'GET'
        })
    },
    async getById(id: string) {
        return await instance<IComment>({
            url: `comments/${id}`,
            method: 'GET'
        })
    },
    async create(data: ICreateCommentResponse) {
        return await instance<IComment>({
            url: 'comments',
            method: 'POST',
            data
        })
    },
    async update(id: string, data: ICreateCommentResponse) {
        return await instance<IComment>({
            url: `comments/${id}`,
            method: 'PATCH',
            data
        })
    },
    async delete(id: string) {
        return await instance<IComment>({
            url: `comments/${id}`,
            method: 'DELETE'
        })
    }
}