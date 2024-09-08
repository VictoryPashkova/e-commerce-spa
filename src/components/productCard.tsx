import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import CardActionArea from '@mui/material/CardActionArea'; // Импортируем CardActionArea
import { Product } from '../types';

type ProductCardProps = {
  product: Product;
  handleFavoriteClick: (id: number) => void;
  handleRemoveCard: (id: number) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, handleFavoriteClick, handleRemoveCard }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ width: 320, height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10px' }}>
        <CardActionArea component={Link} to={`/products/${product.id}`}>
          <CardMedia
            component="img"
            alt={product.title}
            image={product.images[0]}
            height="200"
            sx={{ objectFit: 'contain', padding: '10px' }}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {product.title}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions>
          <IconButton aria-label="favorite" size="small" onClick={(e) => {
              e.stopPropagation();
              handleFavoriteClick(product.id);
            }}
            sx={{ color: product.isFavorite ? 'red' : 'inherit' }}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="delete" size="small" onClick={(e) => {
              e.stopPropagation();
              handleRemoveCard(product.id);
            }}
            sx={{ color: 'inherit' }}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;