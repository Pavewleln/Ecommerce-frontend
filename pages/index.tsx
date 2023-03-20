import { HomeSkeleton } from "@/components/ui/Skeletons/HomeSkeleton";
import { SearchProduct } from "@/components/ui/Home/SearchProduct";
import { CardsFilter } from "@/components/ui/Home/CardsFilter";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Card } from "@/components/ui/Home/Card/Card";
import { useSearch } from "@/hooks/useSearch";

const HomePage = () => {
    const {
        search,
        isLoading,
        data,
        handleSearch,
        handleBeforePrice,
        handleFromPrice,
        handleChangeCategories,
        handleSort
    } = useSearch();
    return (
        <MainLayout title={"Главная"}>
            {/*Появляется здесь после 800px*/}
            {data && data.length && (
                <div className={"block md:hidden"}>
                    <CardsFilter
                        products={data}
                        search={search}
                        handleBeforePrice={handleBeforePrice}
                        handleFromPrice={handleFromPrice}
                        handleChangeCategories={handleChangeCategories}
                    />
                </div>
            )}
            <SearchProduct
                search={search}
                handleSearch={handleSearch}
                handleSort={handleSort}
            />
            {!isLoading ? (
                <div className={"flex justify-around"}>
                    {data && data.length ? (
                        <>
                            {/*Исчезает после 800px*/}
                            <div className={"hidden md:block"}>
                                <CardsFilter
                                    products={data}
                                    search={search}
                                    handleBeforePrice={handleBeforePrice}
                                    handleFromPrice={handleFromPrice}
                                    handleChangeCategories={
                                        handleChangeCategories
                                    }
                                />
                            </div>
                            <div
                                className={
                                    "flex items-center flex-wrap justify-center"
                                }
                            >
                                {data.map(product => (
                                    <Card key={product._id} product={product} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <h1>По вашему запросу ничего не найдено :(</h1>
                    )}
                </div>
            ) : (
                <HomeSkeleton />
            )}
        </MainLayout>
    );
};
export default HomePage;
