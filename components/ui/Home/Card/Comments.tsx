import {formatDate} from "@/utils/formatDate";

const comments = {
    createdAt: '2023-03-16T19:00:37.409+00:00',
    text: "Very straight-to-point article. Really worth\n" +
        "                            time reading. Thank you! But tools are just the\n" +
        "                            instruments for the UX designers. The knowledge of the design tools are as important as the\n" +
        "                            creation of the design strategy.",
    author: "Michael Gough",
    avatar: "https://flowbite.com/docs/images/people/profile-picture-2.jpg"
}
export const Comments = () => {
    const {createdAt, text, author, avatar} = comments
    console.log(createdAt)
    return (
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
                                  placeholder="Напишите отзыв о данном товаре" required></textarea>
                    </div>
                    <button type="submit"
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Оставить отзыв
                    </button>
                </form>
                <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
                            className="mr-2 w-6 h-6 rounded-full"
                            src={avatar}
                            alt={author}/>{author}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <time dateTime={createdAt}
                                  title={createdAt}>{formatDate(createdAt)}
                            </time>
                        </p>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">{text}</p>
                </article>
            </div>
        </section>
    )
}