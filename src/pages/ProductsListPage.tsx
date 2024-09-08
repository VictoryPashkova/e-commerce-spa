import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid2';
import { Container } from '@mui/material';

import axios, { isCancel, AxiosError } from 'axios';

import { Product } from '../types';
import { selectProducts } from '../redux/reducers/selectors';
import { setProducts, removeProduct, addFavoriteProduct, removeFavoriteProduct } from '../redux/reducers/app/productsSlice';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import ProductCard from '../components/productCard';

const ProductsPage: React.FC = () => {
    let products = useSelector(selectProducts);
    const dispatch = useDispatch();
    const [isFiltredFavorites, setIsFiltredFavorites] = useState<boolean>(false);
  
    useEffect(() => {
      const categories = [
          'fragrances',
          'womens-bags',
          'sunglasses',
          'womens-watches',
          'womens-jewellery'
      ];
      
      const fetchCategoryProducts = async (category: string) => {
          const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
          console.log(response.data.products);
          return response.data.products.map((product: Product) => ({
              id: product.id,
              title: product.title,
              images: product.images,
              price: product.price,
              description: product.description,
              brand: product.brand,
              dimensions: product.dimensions,
              rating: product.rating,
              category: product.category,
              isFavorite: false,
          }));
      };

      Promise.all(categories.map(category => fetchCategoryProducts(category)))
          .then(results => {
              const allProducts = results.flat();
              dispatch(setProducts(allProducts));
          })
          .catch(error => {
              console.error('Error fetching data', error);
          });
  }, [dispatch]);


  const handleFavoriteClick = (productId: number) => {
    if (products.some((product: Product) => (product.id === productId) && (product.isFavorite))) {
      dispatch(removeFavoriteProduct(productId));
    } else {
      dispatch(addFavoriteProduct(productId));
    }
  };

  const handleRemoveCard = (productId: number) => {
    dispatch(removeProduct(productId));
  }

   if (isFiltredFavorites) {
     products = products.filter(product => product.isFavorite);
     if (!products) {
       return <div>No products found</div>;
     }
   }

    if (products) {      
      return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <FormControlLabel
          control={
            <Switch name="favorites" checked={isFiltredFavorites} onChange={() => setIsFiltredFavorites(!isFiltredFavorites)}/>
          }
          label="Favorites"
        />
            <Grid container spacing={2}>
                {products.map((product: Product) => (
                    <ProductCard key={product.id} product={product} handleFavoriteClick={handleFavoriteClick} handleRemoveCard={handleRemoveCard}></ProductCard>
                ))}
            </Grid>
        </Container>
    );
    }
  };
  
  export default ProductsPage;