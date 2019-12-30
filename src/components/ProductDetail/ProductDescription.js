import React from 'react';

const ProductDescription = props => {
  return (
    <div className="col p-0">
      <div className="card mt-3 shadow">
        <div className="card-header text-center bg-info p-0 overflow-hidden">
          <button
            className="btn text-white font-weight-bold btn-block"
            data-target="#description-body"
            data-toggle="collapse"
          >
            Click to show full description
          </button>
        </div>
        <div className="collapse hide overflow-hidden" id="description-body">
          <div className="card-body">
            <div dangerouslySetInnerHTML={{ __html: props.description }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
