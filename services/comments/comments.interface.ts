export interface IComment {
    _id: string;
    avatarUrl: string;
    text: string;
    author: string;
    product: string;
    createdAt: string;
    updatedAt: string;
    rating: number;
    authorId: string;
}
export interface ICreateCommentResponse {
    avatarUrl: string;
    text: string;
    author: string;
    product: string;
    rating?: number;
    authorId: string;
}
