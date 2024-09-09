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
import { selectProducts, selectCategories } from '../redux/reducers/selectors';
import { setProducts, removeProduct, addFavoriteProduct, removeFavoriteProduct } from '../redux/reducers/app/productsSlice';
import ProductCard from '../components/productCard';
import routes from '../routes';
import UIButton from '../ui/buttons/button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import createProductItem from '../utils/createProductItem';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const ProductsPage: React.FC = () => {
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const dataLink = 'https://dummyjson.com/products/category/';
  const itemHeight = 48;
  const itemPaddingTop = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: itemHeight * 4.5 + itemPaddingTop,
        width: 250,
      },
    },
  };

  const dispatch = useDispatch();
  const [isFiltredFavorites, setIsFiltredFavorites] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryProducts = async (category: string) => {
      const response = await axios.get(`${dataLink}${category}`);
      return response.data.products.map((product: Product) => (
        createProductItem(product)));
    };

    Promise.all(categories.map(category => fetchCategoryProducts(category.categoryName)))
      .then(results => {
        const allProducts = results.flat();
        dispatch(setProducts(allProducts));
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, [dispatch, categories]);

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

  const handleChange = (event: SelectChangeEvent<typeof selectedCategories>) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products
    .filter(product => selectedCategories.length === 0 || selectedCategories.includes(product.category))
    .filter(product => !isFiltredFavorites || product.isFavorite)
    .filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <UIButton
        btnText="Create product"
        onClick={() => navigate(routes.createProduct())}
        startIcon={<AddCircleOutlineIcon />}
        variant='outlined'
        sx={{ mb: 2 }}
      />
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="categories">Categories</InputLabel>
        <Select
          labelId="categories-select"
          id="categories-select"
          multiple
          value={selectedCategories}
          onChange={handleChange}
          input={<OutlinedInput label="Categories" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {categories.map((category) => (
            <MenuItem key={category.categoryId} value={category.categoryName}>
              <Checkbox checked={selectedCategories.indexOf(category.categoryName) > -1} />
              <ListItemText primary={category.categoryName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
      <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
        <InputLabel htmlFor="search">
          Search
        </InputLabel>
        <Input
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <Grid container spacing={2}>
        {filteredProducts.map((product: Product) => (
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
  