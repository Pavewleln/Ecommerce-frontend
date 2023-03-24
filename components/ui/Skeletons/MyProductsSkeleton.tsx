export const MyProductsSkeleton = () => {
    return (
        <div className="animate-pulse flex justify-around">
            <div
                className={
                    "flex items-center flex-wrap justify-center max-w-6xl"
                }
            >
                {[...Array(12)].map((value, index) => (
                    <div
                        key={index}
                        className={
                            "h-12 bg-gray-200 rounded-xl dark:bg-gray-700 w-[260px] h-[300px] m-2"
                        }
                    ></div>
                ))}
            </div>
        </div>
    );
};
