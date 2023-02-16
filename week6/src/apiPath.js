const { VITE_API, VITE_API_PATH } = import.meta.env;

const baseApiUrl = VITE_API;
const apiName = VITE_API_PATH;
const urlStart = `${baseApiUrl}/${apiName}`;
const checkUrl = `${baseApiUrl}/user/check`;
const getProductsUrl = `${urlStart}/admin/products`;
const operationProductsUrl = `${urlStart}/admin/product`;
const uploadImageUrl = `${urlStart}/admin/upload`;

const userGetProductsUrl = `${urlStart}/products`;
const userGetProductUrl = `${urlStart}/product`;
const userOptCartUrl = `${urlStart}/cart`;
const userOptCartsUrl = `${urlStart}/carts`;
const userOptOrder = `${urlStart}/order`;

export {
  checkUrl,
  getProductsUrl,
  operationProductsUrl,
  uploadImageUrl,
  userGetProductsUrl,
  userGetProductUrl,
  userOptCartUrl,
  userOptCartsUrl,
  userOptOrder,
};
