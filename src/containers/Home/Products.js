import React, { Component } from 'react';
import OneProduct from '../../components/OneProduct';

class Products extends Component {
    render() {
        const productList = [];
        for (let i = 0; i < 6; i++) {
            productList.push(<OneProduct key={i} />)
        }
        return (
            <div>
                <h1>Product type</h1>
                <div className="row">
                    {
                        productList
                    }
                </div>
            </div>
        );
    }
}

export default Products;