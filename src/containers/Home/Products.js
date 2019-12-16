import React, { Component } from "react";
import OneProduct from "../../components/OneProduct";
import { connect } from "react-redux";
import { fetchProducts } from "../../actions";

class Products extends Component {
  componentDidMount() {
    console.log("FETCH API");
    this.props.fetchProducts();
    console.log("FETCHED");
  }

  render() {
    // product: {id: number, name: string, image: string, price: number, created_at: string}
    const { isLoading, products } = this.props.products;
    const { currentSelected } = this.props.categories;
    let productsList = products.map(product => {
      return <OneProduct {...product} key={product.id}/>;
    });
    return (
      <div>
        <h1>{currentSelected.name}</h1>
        {isLoading ? (
          <button className='btn btn-lg btn-danger font-weight-bold'>
            <i className='fa fa-cog fa-spin mr-2 fa-lg'></i>Loading...
          </button>
        ) : (
          <div className='row'>{productsList}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.productsReducer,
    categories: state.categoriesReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => {
      dispatch(fetchProducts());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
