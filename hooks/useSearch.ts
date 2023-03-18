import {EnumProductSort, IProduct, TypeDataFilters} from "@/services/products/products.interface";
import {ProductsService} from "@/services/products/products.service";
import {useQuery} from "@tanstack/react-query";
import {ChangeEvent, useEffect, useState} from "react";
import {useDebounce} from "@/hooks/useDebounce";

export const useSearch = () => {
    const [search, setSearch] = useState<TypeDataFilters>({
        sort: EnumProductSort.NEWEST,
        searchItem: "",
        page: "1",
        categories: [],
        fromPrice: '0',
        beforePrice: '0'
    });
    const debounce = useDebounce(search, 1000)
    const {data, isLoading, refetch} = useQuery(['get all products'], () => ProductsService.getAll(debounce), {
        select: ({data}) => data as IProduct[],
        staleTime: 120000
    })

    useEffect(() => {
        refetch()
    }, [debounce])

    const handleChangeCategories = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSearch({
                ...search,
                categories: [...search.categories, event.target.value]
            });
        } else {
            setSearch({
                ...search,
                categories: [...search.categories.filter((category) => category !== event.target.value)]
            });
        }
    }
    const handleFromPrice = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch({
            ...search,
            fromPrice: event.target.value
        });
    }
    const handleBeforePrice = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch({
            ...search,
            beforePrice: event.target.value
        });
    }
    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch({
            ...search,
            searchItem: event.target.value
        });
    }
    const handleSort = (value: EnumProductSort) => {
        setSearch({
            ...search,
            sort: value
        });
    }
    return {
        search,
        data,
        isLoading,
        handleBeforePrice,
        handleFromPrice,
        handleChangeCategories,
        handleSort,
        handleSearch
    }
}