import { HomeSkeleton } from "@/components/ui/Skeletons/HomeSkeleton";
import { SearchProduct } from "@/components/ui/Home/SearchProduct";
import { CardsFilter } from "@/components/ui/Home/CardsFilter";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Card } from "@/components/ui/Home/Card/Card";
import { useSearch } from "@/hooks/useSearch";
import { ButtonForm } from "@/components/ui/Form-components/ButtonForm";
import { EnumProductSort } from "@/services/products/products.interface";

const HomePage = () => {
    const {
        search,
        isLoading,
        data,
        handleSearch,
        handleBeforePrice,
        handleFromPrice,
        handleChangeCategories,
        handleSort,
        setSearch
    } = useSearch();
    return (
        <MainLayout title={"Главная"}>
            {/*Появляется здесь после 800px*/}
            <div className={"block md:hidden"}>
                <CardsFilter
                    products={data}
                    search={search}
                    handleBeforePrice={handleBeforePrice}
                    handleFromPrice={handleFromPrice}
                    handleChangeCategories={handleChangeCategories}
                />
            </div>
            <SearchProduct
                search={search}
                handleSearch={handleSearch}
                handleSort={handleSort}
            />
            {!isLoading ? (
                <div className={"flex justify-between"}>
                    {/*Исчезает после 800px*/}
                    <div className={"hidden md:block"}>
                        <CardsFilter
                            products={data}
                            search={search}
                            handleBeforePrice={handleBeforePrice}
                            handleFromPrice={handleFromPrice}
                            handleChangeCategories={handleChangeCategories}
                        />
                    </div>
                    {data && data.length ? (
                        <div
                            className={
                                "flex items-center flex-wrap justify-center"
                            }
                        >
                            {data.map(product => (
                                <Card key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className={"text-center max-w-7xl w-full"}>
                            <h1>По вашему запросу ничего не найдено :(</h1>
                            <div className={"max-w-[300px] m-auto"}>
                                <ButtonForm
                                    label={"Сбросить фильтры"}
                                    isLoading={isLoading}
                                    submit={() =>
                                        setSearch({
                                            sort: EnumProductSort.NEWEST,
                                            searchItem: "",
                                            page: "1",
                                            categories: [],
                                            fromPrice: "0",
                                            beforePrice: "0"
                                        })
                                    }
                                />
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <HomeSkeleton />
            )}
        </MainLayout>
    );
};
export default HomePage;
