import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { Product } from '../types';
import { selectProducts } from '../redux/reducers/selectors';
import { setProducts, removeProduct, addFavoriteProduct, removeFavoriteProduct } from '../redux/reducers/app/productsSlice';
import ProductCard from '../components/productCard';
import routes from '../routes';
import UIButton from '../ui/buttons/button';

const ProductsPage: React.FC = () => {
  let products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const [isFiltredFavorites, setIsFiltredFavorites] = useState<boolean>(false);
  const navigate = useNavigate();

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
};

 if (isFiltredFavorites) {
   products = products.filter(product => product.isFavorite);
 }

 return (
   <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
    <UIButton btnText="Create product" onClick={() => navigate(routes.createProduct())} startIcon={<AddCircleOutlineIcon />} variant='outlined' sx={{ mb: 2 }}/>
     <FormControlLabel
       control={
         <Switch
           name="favorites"
           checked={isFiltredFavorites}
           onChange={() => setIsFiltredFavorites(!isFiltredFavorites)}
         />
       }
       label="Favorites"
       sx={{ mb: 2, ml: 4 }}
     />
     <Grid container spacing={2}>
       {products.map((product: Product) => (
         <ProductCard
           key={product.id}
           product={product}
           handleFavoriteClick={handleFavoriteClick}
           handleRemoveCard={handleRemoveCard}
         />
       ))}
     </Grid>
   </Container>
 );
};

export default ProductsPage;
  