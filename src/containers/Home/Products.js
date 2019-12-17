import React, { PureComponent } from "react";
import OneProduct from "../../components/OneProduct";
import LoadingButton from "../../components/LoadingButton";
import { connect } from "react-redux";
import { fetchProducts } from "../../actions";

class Products extends PureComponent {
  componentDidMount() {
    console.log("FETCHING API");
    this.props.fetchProducts();
  }

  render() {
    // product: {id: number, name: string, image: string, price: number, created_at: string, category: string}
    const { isLoading, products } = this.props.products;
    const { currentSelected } = this.props.categories;
    let productsList = products.map(product => {
      return <OneProduct {...product} key={product.id} />;
    });
    return (
      <div>
        <h2>Category: {currentSelected.name}</h2>
        {isLoading ? (
          <LoadingButton />
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
