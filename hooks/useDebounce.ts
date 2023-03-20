import { TypeDataFilters } from "@/services/products/products.interface";
import { useEffect, useState } from "react";

export const useDebounce = (
    value: TypeDataFilters,
    delay = 300
): TypeDataFilters => {
    const [debounced, setDebounced] = useState<TypeDataFilters>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounced(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debounced;
};
