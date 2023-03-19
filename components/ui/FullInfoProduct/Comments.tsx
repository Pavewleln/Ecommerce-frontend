import {Comment} from "@/components/ui/FullInfoProduct/Comment";
import {useRestrictTyping} from "@/hooks/useRestrictTyping";
import {useComment} from "@/hooks/useComment";
import {FC} from "react";

export const Comments: FC<{ productId: string }> = ({productId}) => {
    const {
        text,
        handleChangeTextarea,
        handleClickAddTweet,
        disabledButtonCondition,
        progress,
        setText
    } = useRestrictTyping(150)
    const {isLoading, comments, onSubmit} = useComment({text, setText, productId})
    return !isLoading ? (
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Отзывы</h2>
                </div>
                <form onSubmit={(event) => onSubmit(event)}>
                    <div
                        className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <label htmlFor="comment" className="sr-only">Ваш отзыв</label>
                        <textarea id="comment"
                                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                  placeholder="Минимум 10 символов"
                                  required
                                  value={text}
                                  onChange={(event) => handleChangeTextarea(event)}
                        />
                    </div>
                    <div className="flex items-center">
                        <button type="submit"
                                className="inline-flex items-center py-2.5 px-4 text-xs
                            font-medium text-center text-white bg-primary-700 rounded-lg
                            focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900
                            hover:bg-primary-800 disabled:bg-blue-200 disabled:cursor-not-allowed"
                                disabled={disabledButtonCondition}
                        >
                            Оставить отзыв
                        </button>
                        {text.length > 30
                            && <svg xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6 mx-2 text-red-600 cursor-pointer hover:bg-gray-100 transition-all rounded-xl"
                                    onClick={handleClickAddTweet}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        }
                    </div>
                    {progress()}
                </form>
                {comments && comments.length
                    ? comments.map((comment) => (
                        <Comment comment={comment} key={comment._id}/>
                    ))
                    : <h2>Нет комментариев</h2>
                }
            </div>
        </section>
    ) : (
        <div>

        </div>
    )
}