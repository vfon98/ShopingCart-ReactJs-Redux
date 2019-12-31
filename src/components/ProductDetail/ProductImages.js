/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';

const ProductImages = props => {
  const [thumbnail, setThumbnail] = useState(props.image);

  const renderFeeds = () => {
    return props.feeds.map(feed => (
      <div className="feed border" key={feed.id}>
        <img
          src={feed.url}
          className="img-fluid rounded"
          alt="Product"
          onClick={() => setThumbnail(feed.url)}
        />
      </div>
    ));
  };

  return (
    <div className="col-md-4 border overflow-hidden">
      <div className="d-flex justify-content-center mt-2 shadow">
        <img
          id="prod-image"
          src={thumbnail || 'https://place-hold.it/300'}
          className="img-fluid img-thumbnail"
          alt="Product image"
        />
      </div>
      <hr className="mb-1" />
      <div className="row px-3 d-flex justify-content-center" id="feeds">
        {renderFeeds()}
      </div>
    </div>
  );
};

export default ProductImages;
