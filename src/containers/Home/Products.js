import React, { PureComponent } from "react";
import OneProduct from "../../components/OneProduct";
import LoadingButton from "../../components/LoadingButton";
import { connect } from "react-redux";
import {
  fetchProducts,
  searchByCategory
} from "../../actions/products.actions";
import { withRouter } from "react-router-dom";

class Products extends PureComponent {
  componentDidMount() {
    console.log("FETCHING API");

    const {
      match: { params },
      history
    } = this.props;
    this.props.searchByCategory(params.category);
    if (this.isCategoryNotFound()) {
      // history.push("/404");
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match: { params },
      categories
    } = this.props;
    // Prevent infinite loops
    if (prevProps.categories.currentSelected !== categories.currentSelected) {
      this.props.searchByCategory(params.category);
    }
  }

  isCategoryNotFound = () => {
    const {
      match: { params },
      categories: { categories }
    } = this.props;
    console.log("CATE", categories, params.category)
    // Check if is there any category matching
    return !categories.find(category => category.name === params.category);
  };

  render() {
    // product: {id: number, name: string, image: string, price: number, created_at: string, category: string}
    const { isLoading, products } = this.props.products;
    const { currentSelected } = this.props.categories;

    let productsList = products.map(product => {
      return <OneProduct {...product} /* userID={userID} */ key={product.id} />;
    });

    return (
      <div>
        <h2>Category: {currentSelected.name}</h2>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <div className="row">{productsList}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.productsReducer,
    categories: state.categoriesReducer,
    auth: state.authReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: category => dispatch(fetchProducts(category)),
    searchByCategory: category => dispatch(searchByCategory(category))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Products));
