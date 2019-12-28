/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';

const ProductImages = props => {
  const [thumbnail, setThumbnail] = useState(props.image);
  return (
    <div className="col-md-4 border overflow-hidden">
      <div className="d-flex justify-content-center">
        <img
          id="prod-image"
          src={thumbnail}
          className="img-fluid img-thumbnail"
          alt="Product image"
        />
      </div>
      <div className="row px-3" id="feeds">
        {props.feeds.map(feed => (
          <div className="border col rounded flex-wrap m-1 p-0" key={feed.id}>
            <img
              src={feed.url}
              className="img-fluid rounded feed"
              alt="Product"
              onClick={() => setThumbnail(feed.url)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
