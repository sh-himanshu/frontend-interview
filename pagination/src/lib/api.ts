import { ProductResponse } from './types';

export const getProducts = async (limit: number = 10, skip: number = 0) => {
  try {
    const resp = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    const value = await resp.json();
    return value as ProductResponse;
  } catch (error) {
    console.log(error);
  }
};
