export interface ICard {
    // id
    _id: string,
    // Имя
    title: string,
    // Цена
    price: number,
    // Количество на складе
    kol: number,
    // Описание
    description: string,
    // Картинка
    imageUrl: string,
    // Тип товара(По этому типу будет фильтрация)
    type: string,
    // id покупателя
    seller: string
}