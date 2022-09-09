import { ProductCategory } from "@app/model/Product";

const LIMIT = 100;

export const getProducts = async (category: ProductCategory | undefined) => {
    const response = await fetch(`https://api-store-indielisboa.herokuapp.com/v1/products?limit=100&page=0&stock=false${category ? `&category=${category}` : ``}`);
    if (response.status >= 200 && response.status < 300) {
        const result = await response.json();
        return result.data;
    }
}


/*
ex
  const myHeaders = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${btEdit.dataset.token}`
        })
*/
