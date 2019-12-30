/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { useHistory } from 'react-router-dom'

const OtherProducts = props => {
  const history = useHistory();
  const { products } = props;

  const renderOtherProducts = () => {
    return products.map(product => (
      <div className="card col-md-2" key={product.id}
        onClick={() => history.push(`/products/${product.id}/detail`)}
      >
        <img
          className="card-img-top border-bottom"
          src={product.image}
          alt="Product image"
        />
        <div className="card-body">
          <p className="card-title">{product.name}</p>
          <p className="card-text text-muted font-weight-bold">
            ${product.price.toLocaleString('en-EN')}
          </p>
        </div>
        <div className="card-footer">
          <button className="btn btn-success"><i className="fa fa-info-circle mr-2"></i>Details</button>
        </div>
      </div>
    ));
  };
  return (
    <React.Fragment>
      <h2 className="mb-0 mt-3">Other products</h2>
      <div className="d-flex" id="prod-others">
        {renderOtherProducts()}
      </div>
    </React.Fragment>
  );
};

export default OtherProducts;
