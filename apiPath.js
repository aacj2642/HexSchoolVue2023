const baseApiUrl = `https://vue3-course-api.hexschool.io/v2/api`;
const apiName = `weiyang`;
const urlStart = `${baseApiUrl}/${apiName}`;
const checkUrl = `${baseApiUrl}/user/check`;
const getProductsUrl = `${urlStart}/admin/products`;
const operationProductsUrl = `${urlStart}/admin/product`;
const uploadImageUrl = `${urlStart}/admin/upload`;

export {
  checkUrl,
  getProductsUrl,
  operationProductsUrl,
  uploadImageUrl,
};
