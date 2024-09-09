import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { object, string, number } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import routes from '../routes';
import { addNewProduct } from '../redux/reducers/app/productsSlice';
import { selectProducts } from '../redux/reducers/selectors';
import createUniqId from '../utils/ createUniqueId';
import { FormValues } from '../types';

const schema = object({
  title: string().required('Title is required'),
  price: number().required('Price is required').positive('Price must be positive'),
  description: string().required('Description is required'),
  category: string().required('Category is required'),
  mainImage: string().required('Main image URL is required').url('Invalid URL'),
  secondaryImage: string().required('Secondary image URL is required').url('At least one additional image URL is required'),
  additionalImage: string().url('Invalid URL').required('Additional image URL is required'),
  brand: string().required('Brand is required'),
});

const CreateProductPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(selectProducts);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    const { title, price, description, category, mainImage, secondaryImage, additionalImage, brand } = data;
    const images = [mainImage, secondaryImage, additionalImage];
    const id = createUniqId(products);
    const newProduct = { title, price: Number(price), description, category, images, id, brand, isFavorite: false };
    dispatch(addNewProduct(newProduct));
    navigate(routes.products());
  };

  return (
    <Container maxWidth="xl">
      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        onClick={() => navigate(routes.products())}
        sx={{ mt: 4 }}
      >
        Back to products
      </Button>
      <Box sx={{ mt: 4, p: 3, border: '1px solid #ddd', borderRadius: '8px' }}>
        <Typography variant="h4" gutterBottom>
          Create New Product
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                {...register('title')}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Brand"
                variant="outlined"
                {...register('brand')}
                error={!!errors.brand}
                helperText={errors.brand?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Price"
                variant="outlined"
                type="number"
                {...register('price')}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                {...register('description')}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Category"
                variant="outlined"
                {...register('category')}
                error={!!errors.category}
                helperText={errors.category?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Main Image URL"
                variant="outlined"
                {...register('mainImage')}
                error={!!errors.mainImage}
                helperText={errors.mainImage?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Secondary Image URL"
                variant="outlined"
                {...register('secondaryImage')}
                error={!!errors.secondaryImage}
                helperText={errors.secondaryImage?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Additional Image URL"
                variant="outlined"
                {...register('additionalImage')}
                error={!!errors.additionalImage}
                helperText={errors.additionalImage?.message}
              />
            </Grid>
            <Grid size={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default CreateProductPage;
