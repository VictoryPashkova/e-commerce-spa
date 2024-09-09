import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import routes from '../routes';
import CreateProductForm from '../components/сreateProductForm';
import UIButton from '../ui/buttons/button';

const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl">
      <UIButton btnText="Back to products" onClick={() => navigate(routes.products())} startIcon={<ArrowBackIcon />} variant='outlined' sx={{ mt: 4 }}/>
      <Box sx={{ mt: 4, p: 3, border: '1px solid #ddd', borderRadius: '8px' }}>
        <Typography variant="h4" gutterBottom>
          Create New Product
        </Typography>
        <CreateProductForm />
      </Box>
    </Container>
  );
};

export default CreateProductPage;