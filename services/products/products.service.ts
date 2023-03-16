import {ICreateProductResponse, IProduct, TypeDataFilters} from "@/services/products/products.interface";
import {instance} from "@/api/api.interceptors";

export const ProductsService = {
    async getAll(queryData: TypeDataFilters = {}) {
        return await instance<IProduct[]>({
            url: 'products',
            method: 'GET',
            params: queryData
        })
    },
    async getById(id: string) {
        return await instance<IProduct>({
            url: `products/${id}`,
            method: 'GET'
        })
    },
    async create(data: ICreateProductResponse) {
        return await instance<IProduct>({
            url: 'products',
            method: 'POST',
            data
        })
    },
    async update(id: string, data: ICreateProductResponse) {
        return await instance<IProduct>({
            url: `products/${id}`,
            method: 'PATCH',
            data
        })
    },
    async delete(id: string) {
        return await instance<IProduct>({
            url: `products/${id}`,
            method: 'DELETE'
        })
    }
}