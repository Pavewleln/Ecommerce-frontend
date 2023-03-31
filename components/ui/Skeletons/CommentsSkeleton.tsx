export const CommentsSkeleton = () => {
    return (
        <div className="animate-pulse max-w-2xl m-auto">
            <div className="text-center mt-2 bg-gray-200 rounded-xl dark:bg-gray-700 mb-2.5 w-56 h-14 m-auto"></div>
            <div className="text-center mt-2 bg-gray-200 rounded-xl dark:bg-gray-700 mb-2.5 w-100 h-44 m-auto"></div>
            <div className="text-center mt-2 bg-gray-200 rounded-xl dark:bg-gray-700 mb-2.5 w-52 h-14 m-auto"></div>
            <div className={"flex flex-col align-center justify-center"}>
                {[...Array(3)].map((value, index) => (
                    <div
                        key={index}
                        className={
                            "h-12 bg-gray-200 rounded-xl dark:bg-gray-700 w-100 h-36 m-2"
                        }
                    ></div>
                ))}
            </div>
        </div>
    );
};
