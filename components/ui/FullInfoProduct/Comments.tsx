import { CommentsSkeleton } from "@/components/ui/Skeletons/CommentsSkeleton";
import { CommentRating } from "@/components/ui/FullInfoProduct/CommentRating";
import { Comment } from "@/components/ui/FullInfoProduct/Comment";
import { useRestrictTyping } from "@/hooks/useRestrictTyping";
import { useComment } from "@/hooks/useComment";
import { classNames } from "@/utils/classNames";
import { FC, useState } from "react";

export const Comments: FC<{ productId: string }> = ({ productId }) => {
    const [rating, setRating] = useState(0.5);
    const {
        text,
        handleChangeTextarea,
        handleClickAddTweet,
        disabledButtonCondition,
        textLimitPercent,
        setText
    } = useRestrictTyping(150);
    const { isLoading, comments, onSubmit } = useComment({
        text,
        setText,
        productId,
        rating,
        setRating
    });
    return !isLoading ? (
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                        Отзывы
                    </h2>
                </div>
                <form onSubmit={event => onSubmit(event)}>
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <label htmlFor="comment" className="sr-only">
                            Ваш отзыв
                        </label>
                        <textarea
                            id="comment"
                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                            placeholder="Минимум 10 символов"
                            required
                            value={text}
                            onChange={event => handleChangeTextarea(event)}
                        />
                        <div className={"flex items-center"}>
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
                        <button
                            type="submit"
                            className="inline-flex items-center py-2.5 px-4 text-xs
                            font-medium text-center text-white bg-primary-700 rounded-lg
                            focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900
                            hover:bg-primary-800 disabled:bg-blue-200 disabled:cursor-not-allowed dark:disabled:bg-blue-300"
                            disabled={disabledButtonCondition}
                        >
                            Оставить отзыв
                        </button>
                        {text.length > 30 && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 mx-2 text-red-600 cursor-pointer hover:bg-gray-100 transition-all rounded-xl dark:hover:bg-gray-600"
                                onClick={handleClickAddTweet}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        )}
                    </div>
                    {textLimitPercent > 0 && (
                        <div className="w-[120px] bg-gray-200 rounded-xl h-1 mb-4 dark:bg-gray-700 mt-2">
                            <div
                                className={classNames(
                                    textLimitPercent < 70
                                        ? "bg-green-500"
                                        : textLimitPercent < 90
                                        ? "bg-orange-500"
                                        : "bg-red-500",
                                    " h-1 rounded-xl"
                                )}
                                style={{ width: textLimitPercent }}
                            ></div>
                        </div>
                    )}
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
