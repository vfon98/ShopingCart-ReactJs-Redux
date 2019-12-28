import React from 'react';

const StarRating = props => {
  const RatingStars = () => {
    // Rounded to nearest 0.5
    let rating = Math.round(props.rating * 2) / 2;
    let starIcons = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= 1)
        starIcons.push(<i key={i} className='fa fa-star'></i>); // Full star
      else if (rating === 0.5)
        starIcons.push(<i key={i} className='fa fa-star-half-o'></i>); // Half star
      else
        starIcons.push(<i key={i} className='fa fa-star-o'></i>); // None star
      rating--;
    }
    
    return starIcons;
  };

  return <React.Fragment>{RatingStars()}</React.Fragment>;
};

export default StarRating;
