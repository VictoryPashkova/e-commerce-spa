import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import routes from '../routes';
import CreateProductForm from '../components/сreateProductForm';

const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();

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
        <CreateProductForm />
      </Box>
    </Container>
  );
};

export default CreateProductPage;
