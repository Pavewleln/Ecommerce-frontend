import {CommentsService} from "@/services/comments/comments.service";
import {useQuery} from "@tanstack/react-query";
import {formatDate} from "@/utils/formatDate";
import {FC, FormEvent, useState} from "react";
import {classNames} from "@/utils/classNames";

export const Comments: FC<{ productId: string }> = ({productId}) => {
    const {data, isLoading} = useQuery(['get all comments'], async () => await CommentsService.getAll(productId), {
        select: ({data}) => data,
        staleTime: 12000
    })
    const [text, setText] = useState<string>('')
    const textLimitPercent = Math.round(text.length / 80 * 100)

    const handleChangeTextarea = (e: FormEvent<HTMLTextAreaElement>) => {
        if (e.currentTarget && e.currentTarget.value.length <= 95) {
            setText(e.currentTarget.value)
        }
    }
    const handleClickAddTweet = (): void => {
        setText('')
    }
    return !isLoading ? (
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Отзывы</h2>
                </div>
                <form className="mb-6">
                    <div
                        className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <label htmlFor="comment" className="sr-only">Ваш отзыв</label>
                        <textarea id="comment"
                                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                  placeholder="Минимум 10 символов"
                                  required
                                  value={text}
                                  onChange={(e) => handleChangeTextarea(e)}
                        />
                    </div>
                    <div className={"flex items-center"}>
                        <button type="submit"
                                className="inline-flex items-center py-2.5 px-4 text-xs
                            font-medium text-center text-white bg-primary-700 rounded-lg
                            focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900
                            hover:bg-primary-800 disabled:bg-blue-200 disabled:cursor-not-allowed"
                                disabled={textLimitPercent >= 119 || text.length <= 10}
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
                    {textLimitPercent > 0
                        && <div className="w-[120px] bg-gray-200 rounded-xl h-1 mb-4 dark:bg-gray-700 mt-2">
                            <div
                                className={classNames(textLimitPercent < 50 ? "bg-green-500" : textLimitPercent < 90 ? "bg-orange-500" : "bg-red-500", " h-1 rounded-xl")}
                                style={{width: textLimitPercent}}></div>
                        </div>
                    }
                </form>
                {data && data.length
                    ? data.map(({text, author, avatarUrl, _id, createdAt}) => (
                        <article key={_id} className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
                                    className="mr-2 w-6 h-6 rounded-full"
                                    src={avatarUrl}
                                    alt={author}/>{author}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <time dateTime={createdAt}
                                          title={createdAt}>{formatDate(createdAt)}
                                    </time>
                                </p>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400">{text}</p>
                        </article>
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