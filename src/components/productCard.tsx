import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import CardActionArea from '@mui/material/CardActionArea';
import { Product } from '../types';
import IconButtonUI from '../ui/buttons/iconButton';

type ProductCardProps = {
  product: Product;
  handleFavoriteClick: (id: number) => void;
  handleRemoveCard: (id: number) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, handleFavoriteClick, handleRemoveCard }) => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} justifyContent='space-between'>
      <Card
        sx={{
          height: 370,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardActionArea component={Link} to={`/products/${product.id}`}>
          <CardMedia
            component="img"
            alt={product.title}
            image={product.images[0]}
            height="200"
            sx={{ objectFit: 'contain', padding: '10px' }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                height: '4rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'normal',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                wordBreak: 'break-word'
              }}
            >
              {product.title}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButtonUI Icon={<FavoriteIcon />} ariaLabel="favorite" sx={{ color: product.isFavorite ? 'red' : 'inherit' }} onClick={() => handleFavoriteClick(product.id)}/>
            <IconButtonUI Icon={<DeleteIcon />} ariaLabel="delete" onClick={() => handleRemoveCard(product.id)} sx={{ color: 'inherit' }}/>
          </CardActions>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ProductCard;
