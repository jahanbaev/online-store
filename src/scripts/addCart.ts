import { Iproduct } from "./interfaces";

const addCart = (id: string, list: Iproduct[], cart: number[]): number[] => {
  let productListId: number[] = [];
  let products: Iproduct[] = JSON.parse(localStorage.getItem("cart") + "");
  let product: Iproduct = list.filter((e: { id: number }) => {
    return e.id === parseInt(id);
  })[0];
  if (cart.includes(parseInt(id))) {
    products = products.filter((e: { id: number }) => e.id !== parseInt(id));
  } else {
    product.amount = 1;
    products.push(product);
  }

  products.forEach((product: { id: number }) => {
    productListId.push(product.id);
  });

  localStorage.setItem("cart", JSON.stringify(products));

  return productListId;
};

const getCartList = (): number[] => {
  let productListId: number[] = [];
  let products: Iproduct[] = JSON.parse(localStorage.getItem("cart") + "");
  products.forEach((product: { id: number }) => {
    productListId.push(product.id);
  });
  return productListId;
};

export { getCartList, addCart };
