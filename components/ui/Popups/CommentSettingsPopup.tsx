import { CommentsService } from "@/services/comments/comments.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IComment } from "@/services/comments/comments.interface";
import { classNames } from "@/utils/classNames";
import { toast } from "react-toastify";
import { FC } from "react";

interface ICommentSettingsPopup {
    showModal: boolean;
    comment: IComment;
}

export const CommentSettingsPopup: FC<ICommentSettingsPopup> = ({
    showModal,
    comment
}) => {
    const queryClient = useQueryClient();
    const deleteComment = useMutation(
        (id: string) => CommentsService.delete(id),
        {
            onSuccess: () => queryClient.invalidateQueries(["get all comments"])
        }
    );
    const onDeleteCommentSubmit = async () => {
        try {
            await deleteComment.mutate(comment._id);
            toast.success("Комментарий успешно удален");
        } catch (err) {
            toast.error("Ошибка. Попробуйте позже");
        }
    };
    return (
        <div
            id="dropdownComment"
            className={classNames(
                showModal ? "absolute" : "hidden",
                "z-10 w-28 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 right-20"
            )}
        >
            <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownMenuIconHorizontalButton"
            >
                <li>
                    <button
                        onClick={() => onDeleteCommentSubmit()}
                        className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                    >
                        Удалить
                    </button>
                </li>
            </ul>
        </div>
    );
};
