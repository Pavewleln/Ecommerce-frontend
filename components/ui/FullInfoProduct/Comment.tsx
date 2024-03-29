import { CommentSettingsPopup } from "@/components/ui/Popups/CommentSettingsPopup";
import { IComment } from "@/services/comments/comments.interface";
import { CommentRating } from "./CommentRating";
import { formatDate } from "@/utils/formatDate";
import { useAuth } from "@/hooks/useAuth";
import { FC, useState } from "react";
import Image from "next/image";

export const Comment: FC<{ comment: IComment }> = ({ comment }) => {
    const { user } = useAuth();
    const { text, author, avatarUrl, createdAt, authorId } = comment;

    // Модальное окно commentSettings
    const [showCommentSettingsModal, setShowCommentSettingsModal] =
        useState(false);

    return (
        <article className="p-6 mb-6 text-base bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2 relative">
                <div className="flex items-center flex-wrap">
                    <div className="flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                        {avatarUrl ? (
                            <Image
                                loader={() => avatarUrl}
                                className="mr-2 w-6 h-6 rounded-full"
                                src={avatarUrl}
                                alt={author}
                                width={30}
                                height={30}
                            />
                        ) : (
                            <p className="mr-2 w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                                {author.slice(0, 1)}
                            </p>
                        )}
                        {author}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                        <time dateTime={createdAt} title={createdAt}>
                            {formatDate(createdAt)}
                        </time>
                    </p>
                    <CommentRating element={comment} />
                </div>
                {user?._id === authorId && (
                    <button
                        id="dropdownCommentButton"
                        data-dropdown-toggle="dropdownComment"
                        onClick={() =>
                            setShowCommentSettingsModal(
                                !showCommentSettingsModal
                            )
                        }
                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        type="button"
                    >
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                        </svg>
                        <span className="sr-only">Comment settings</span>
                    </button>
                )}
                <CommentSettingsPopup
                    showModal={showCommentSettingsModal}
                    comment={comment}
                />
            </footer>
            <p>{text}</p>
        </article>
    );
};
