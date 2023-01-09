import { product } from "./interfaces";

const addCart = (id: string, list: product[], cart: number[]): number[] => {
  let c: number[] = [];
  let products: product[] = JSON.parse(localStorage.getItem("cart") + "");
  let product: product = list.filter((e: { id: number }) => {
    return e.id === parseInt(id);
  })[0];
  if (cart.includes(parseInt(id))) {
    products = products.filter((e: { id: number }) => e.id !== parseInt(id));
  } else {
    product.amount = 1;
    products.push(product);
  }

  products.forEach((e: { id: number }) => {
    c.push(e.id);
  });

  localStorage.setItem("cart", JSON.stringify(products));

  return c;
};

const getCartList = (): number[] => {
  let c: number[] = [];
  let products: product[] = JSON.parse(localStorage.getItem("cart") + "");
  products.forEach((e: { id: number }) => {
    c.push(e.id);
  });
  return c;
};
export { getCartList };
export { addCart };
