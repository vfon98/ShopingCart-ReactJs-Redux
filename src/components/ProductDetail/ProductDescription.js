import React from 'react';

const ProductDescription = props => {
  return (
    <div className="col p-0">
      <div className="card mt-3">
        <div className="card-header text-center bg-info p-0">
          <a
            href="#description-body"
            className="text-decoration-none d-block text-white h5 mb-0 p-2"
            data-toggle="collapse"
          >
            Click to show full description
          </a>
        </div>
        <div className="card-body collapse hide" id="description-body">
          <div dangerouslySetInnerHTML={{ __html: props.description }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
