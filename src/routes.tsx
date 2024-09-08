const routes = {
    products: () => '/products',
    product: (id: string | ':id' = ':id') => `/products/${id}`,
    createProduct: () => '/create- product',
  };
  
  export default routes;