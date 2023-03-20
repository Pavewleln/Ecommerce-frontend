export const formatPrice = (price: number): string => {
    return price.toLocaleString("ru-RU", {
        style: "currency",
        currency: "RUB"
    });
};
