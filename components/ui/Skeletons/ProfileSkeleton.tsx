export const ProfileSkeleton = () => {
    return (
        <div className="animate-pulse flex flex-col items-center justify-center">
            <div className="relative inline-flex items-center justify-center w-36 h-36 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"></div>
            <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                <div className="flex flex-col pb-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400"></dt>
                    <dd className="text-lg font-semibold"></dd>
                </div>
                <div className="flex flex-col pb-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400"></dt>
                    <dd className="text-lg font-semibold"></dd>
                </div>
                <div className="flex flex-col pb-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400"></dt>
                    <dd className="text-lg font-semibold"></dd>
                </div>
            </dl>
        </div>
    );
};
