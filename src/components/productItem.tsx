import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/system';
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
    <Box
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    sx={{ 
      minHeight: '100vh',
      mx: 'auto',
      maxWidth: 'lg',
      gap: 4 
    }}
    >
    <Grid container spacing={4} justifyContent='center' alignItems='center'>
      <Grid size={{ xs: 6, md: 4 }}>
        <MainImage src={selectedImage} alt="Product" />
        <Grid container spacing={1} justifyContent='center' alignItems='center'>
          {images.map((image, index) => (
            <Grid key={index}>
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
      <Grid size={{ xs: 12, md: 6 }}>
        <Box padding={2} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography 
          variant="h2" 
          gutterBottom 
          fontWeight='bold'
          sx={{ 
            overflow: 'hidden',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
          }}>
            {currentProduct?.title}
          </Typography>
          <Typography 
          variant="body1" 
          gutterBottom
          sx={{ 
            overflow: 'hidden',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
          }}
          >
            {currentProduct?.description}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom fontWeight='bold'>
            ${currentProduct?.price}
          </Typography>
        </Box>
      </Grid>
    </Grid>
    </Box>
  );
};

export default ProductItem;