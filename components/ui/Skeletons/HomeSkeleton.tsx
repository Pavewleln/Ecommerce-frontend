export const HomeSkeleton = () => {
    return (
        <div className="animate-pulse flex justify-around">
            <div className="text-center mt-2 bg-gray-200 rounded-xl dark:bg-gray-700 mb-2.5 w-56 h-96 mr-2">
            </div>
            <div className={"flex items-center flex-wrap justify-center max-w-6xl"}>
                {[...Array(12)].map((index) => (
                    <div key={index} className={"h-12 bg-gray-200 rounded-xl dark:bg-gray-700 w-[260px] h-[300px] m-2"}></div>
                ))}
            </div>
        </div>
    )
}