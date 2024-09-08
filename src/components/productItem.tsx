import React, { useState } from 'react';
import { Box, Typography, Button, Grid, IconButton, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import { selectProducts } from '../redux/reducers/selectors';
import { Product } from '../types';

const MainImage = styled('img')({
  height: 400,
  borderRadius: 10,
  objectFit: 'contain',
});

const Thumbnail = styled('img')(({ selected }: { selected: boolean }) => ({
  width: 80,
  height: 80,
  cursor: 'pointer',
  border: selected ? '2px solid #1976d2' : 'none',
  borderRadius: 8,
  objectFit: 'contain',
}));

type Props = {
  currentProduct: Product;
}

const ProductItem: React.FC<Props> = ({currentProduct}) => {
  const images = currentProduct?.images || [];
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <Grid container spacing={4} display="flex" justifyContent="center" alignItems='center' padding={4} height='100vh'>
      <Grid item xs={12} md={6} display="flex" justifyContent="center" flexDirection='column'>
        <MainImage src={selectedImage} alt="Product" />
        <Grid container spacing={2} justifyContent="center" marginTop={2}>
          {images.map((image, index) => (
            <Grid item key={index}>
              <Thumbnail
                src={image}
                alt={`Thumbnail ${index}`}
                selected={selectedImage === image}
                onClick={() => setSelectedImage(image)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box padding={2}>
          <Typography variant="h2" gutterBottom fontWeight='bold'>
            {currentProduct?.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {currentProduct?.description}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom fontWeight='bold'>
            ${currentProduct?.price}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductItem;