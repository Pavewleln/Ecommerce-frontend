import { IProduct } from "@/services/products/products.interface";

export const groupCategories = (products?: IProduct[]) => {
    if (products) {
        // Создаем массив, где будем потом хранить данные
        const categories: Array<{ label: string; matches: number }> = [];
        // Объект для подсчета
        let sortCategories: { [key: string]: number } = {};
        for (let card of products) {
            // Если такого ключа нет в объекте, то добавлем со значением 1
            if (sortCategories[card.type.toLowerCase()] === undefined) {
                sortCategories[card.type.toLowerCase()] = 1;
            } else {
                // иначе ++
                sortCategories[card.type.toLowerCase()]++;
            }
        }
        // переводим в удобным формат
        for (let key in sortCategories) {
            categories.push({ label: key, matches: sortCategories[key] });
        }
        return categories;
    } else {
        return [];
    }
};
