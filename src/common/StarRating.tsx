import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import { Box } from '@mui/material';

type StarRatingProps = {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = Array(rating).fill(<StarIcon color="primary" />);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {stars}
    </Box>
  );
};

export default StarRating;