import { ProductCategory } from "@app/model/Product";

export const getProducts = async (category: ProductCategory | undefined) => {
    const response = await fetch("https://api-store-indielisboa.herokuapp.com/v1/products?limit=100&page=0&stock=false");
    if (response.status >= 200 && response.status < 300) {
        const result = await response.json();
        console.log(result.data);
        return result.data;
    }
}
