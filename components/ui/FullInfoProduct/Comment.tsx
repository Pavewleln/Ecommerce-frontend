import {CommentSettingsPopup} from "@/components/ui/Popups/CommentSettingsPopup";
import {IComment} from "@/services/comments/comments.interface";
import {formatDate} from "@/utils/formatDate";
import {FC, useState} from "react";
import Image from "next/image";

export const Comment: FC<{ comment: IComment }> = ({comment}) => {
    const {text, author, avatarUrl, _id, createdAt, updatedAt, product} = comment

    // Модальное окно commentSettings
    const [showCommentSettingsModal, setShowCommentSettingsModal] = useState(false);

    return (
        <article
            className="p-6 mb-6 text-base bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                        {avatarUrl
                            ? <Image
                                loader={() => avatarUrl}
                                className="mr-2 w-6 h-6 rounded-full"
                                src={avatarUrl}
                                alt={author}
                                width={30}
                                height={30}
                            />
                            : <div className="mr-2 w-6 h-6 rounded-full bg-gray-200"></div>
                        }
                        {author}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <time dateTime={createdAt}
                              title={createdAt}>{formatDate(createdAt)}
                        </time>
                    </p>
                </div>
                <button id="dropdownCommentButton"
                        data-dropdown-toggle="dropdownComment"
                        onClick={() => setShowCommentSettingsModal(!showCommentSettingsModal)}
                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        type="button">
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                        </path>
                    </svg>
                    <span className="sr-only">Comment settings</span>
                </button>
                <CommentSettingsPopup showModal={showCommentSettingsModal} setShowModal={setShowCommentSettingsModal}
                                      comment={comment}/>
            </footer>
            <p>{text}</p>
        </article>
    )
}