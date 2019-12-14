import React from 'react';

const OneProduct = () => {
    
    return (
        <div className="col-md-3 col-sm-4 mb-md-4">
            <div className="card shadow">
                <img className="card-img-top" src="https://via.placeholder.com/250" alt="Click to buy" />
                <div className="card-body">
                    <h4 className="card-title">Lorem ipsum</h4>
                    <p className="card-text font-weight-bold mb-1">Price: $50</p>
                    <p className="">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-half-o"></i>
                    </p>
                    <button className="btn btn-success"><i className="fa fa-cart-plus mr-2"></i>Add to cart</button>
                </div>
            </div>
        </div>
    );
}

export default React.memo(OneProduct);
