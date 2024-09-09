import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProducts } from '../redux/reducers/selectors';
import { useNavigate } from 'react-router-dom';
import routes from '../routes';
import ProductItem from '../components/productItem';

const ProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const products = useSelector(selectProducts);
  const currentProduct = products.find((product) => product.id === Number(id));

  if (currentProduct) {
    return (
      <>
        <Grid container spacing={2}>
          <Grid size={12} sx={{ mt: 4, ml: 4 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              variant="outlined"
              onClick={() => navigate(routes.products())}
            >
              Back to products
            </Button>
            <ProductItem currentProduct={currentProduct} />
          </Grid>
        </Grid>
      </>
    );
  }
};

export default ProductPage;
