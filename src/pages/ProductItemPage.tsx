import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProducts } from '../redux/reducers/selectors';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Container } from '@mui/material';
import routes from '../routes';
import ProductItem from '../components/productItem';
import UIButton from '../ui/buttons/button';

const ProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const products = useSelector(selectProducts);
  const currentProduct = products.find((product) => product.id === Number(id));

  if (currentProduct) {
    return (
      <>
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <UIButton btnText="Back to products" onClick={() => navigate(routes.products())} startIcon={<ArrowBackIcon />} variant='outlined'/>
          <ProductItem currentProduct={currentProduct} />
        </Container>
      </>
    );
  }
};

export default ProductPage;
