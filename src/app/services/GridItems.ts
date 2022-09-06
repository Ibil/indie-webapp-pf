
export const getProducts = async () => {
    const result = await fetch("https://api-store-indielisboa.herokuapp.com/v1/products?limit=100&page=0&stock=false");
    console.log(result.json);
}

const deleteProduct = () => {
}