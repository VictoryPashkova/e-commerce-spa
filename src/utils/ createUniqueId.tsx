import { Product } from "../types";

const createUniqId = (products: Product[]): number => {
    const id: number = Date.now() + Math.floor(Math.random() * 1000);
    if (products.some((product: Product) => product.id === id)) {
        return createUniqId(products);
    }
    return id;
}

export default createUniqId;
