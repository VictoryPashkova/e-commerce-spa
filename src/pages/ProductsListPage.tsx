import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Grid from '@mui/material/Grid2';
import { Container, Switch, FormControlLabel, OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, Checkbox, Input, InputAdornment } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import createProductItem from '../utils/createProductItem';
import SearchIcon from '@mui/icons-material/Search';
import { Product } from '../types';
import { selectProducts, selectCategories } from '../redux/reducers/selectors';
import { setProducts, removeProduct, addFavoriteProduct, removeFavoriteProduct } from '../redux/reducers/app/productsSlice';
import ProductCard from '../components/productCard';
import routes from '../routes';
import UIButton from '../ui/buttons/button';

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
      },
    },
  };

  const dispatch = useDispatch();
  const [isFiltredFavorites, setIsFiltredFavorites] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const promises = categories.map(category => axios.get(`${dataLink}${category.categoryName}`));
        const results = await Promise.all(promises);
        const allProducts = results.flatMap(result => result.data.products.map(createProductItem));
        dispatch(setProducts(allProducts));
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchProducts();
  }, [dispatch, categories]);

  const handleFavoriteClick = (productId: number) => {
    if (products?.some((product: Product) => (product?.id === productId) && (product?.isFavorite))) {
      dispatch(removeFavoriteProduct(productId));
    } else {
      dispatch(addFavoriteProduct(productId));
    }
  };

  const handleRemoveCard = (productId: number) => {
    if (productId) {
      dispatch(removeProduct(productId));
    }
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
    ?.filter(product => selectedCategories.length === 0 || selectedCategories.includes(product?.category))
    .filter(product => !isFiltredFavorites || product?.isFavorite)
    .filter(product => product?.title?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2} justifyContent="flex-end" alignItems="center">
        <Grid>
          <UIButton
            btnText="Create product"
            onClick={() => navigate(routes.createProduct())}
            startIcon={<AddCircleOutlineIcon />}
            variant="outlined"
            sx={{ mb: 2, minWidth: 150 }}
          />
        </Grid>

        <Grid>
          <FormControlLabel
            control={
              <Switch
                name="favorites"
                checked={isFiltredFavorites}
                onChange={() => setIsFiltredFavorites(!isFiltredFavorites)}
              />
            }
            label="Favorites"
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, sm: 8, md: 9 }}>
          <FormControl fullWidth variant="standard">
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
        </Grid>

        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
          <FormControl fullWidth>
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
              {categories?.map((category) => (
                <MenuItem key={category.categoryId} value={category.categoryName}>
                  <Checkbox checked={selectedCategories.indexOf(category.categoryName) > -1} />
                  <ListItemText primary={category.categoryName} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {filteredProducts?.map((product: Product) => (
          <ProductCard
            key={product?.id}
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