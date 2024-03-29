export interface IProduct {
    // id
    _id: string;
    // Имя
    title: string;
    // Цена
    price: number;
    // Количество на складе
    kol: number;
    // Описание
    description: string;
    // Картинка
    images: string[];
    // Тип товара(По этому типу будет фильтрация)
    type: string;
    // id покупателя
    seller: string;
    // Рейтинг
    rating: number;
}

export interface ICreateProductResponse {
    // Имя
    title: string;
    // Цена
    price: number;
    // Количество на складе
    kol: number;
    // Описание
    description: string;
    // Картинка
    images: string[];
    // Тип товара(По этому типу будет фильтрация)
    type: string;
}

export type TypeDataFilters = {
    sort: EnumProductSort;
    searchItem: string;
    page: string | number;
    categories: string[];
    fromPrice: string;
    beforePrice: string;
};

export enum EnumProductSort {
    HIGH_PRICE = "high-price",
    LOW_PRICE = "low-price",
    NEWEST = "newest",
    OLDEST = "oldest"
}
