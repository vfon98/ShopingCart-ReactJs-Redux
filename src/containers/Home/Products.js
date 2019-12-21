import React, { PureComponent } from "react";
import OneProduct from "../../components/OneProduct";
import LoadingButton from "../../components/LoadingButton";
import { connect } from "react-redux";
import { fetchProducts, filterByCategory } from "../../actions";
import { withRouter } from "react-router-dom";

class Products extends PureComponent {
  componentDidMount() {
    console.log("FETCHING API");
    const {
      match: { params },
      history
    } = this.props;
    this.props.fetchProducts(params.category).then(() => {
      if (this.isCategoryNotFound(params.category)) {
        history.push("/404");
      }
    });
  }

  componentDidUpdate(prevProps) {
    const {
      match: { params },
      categories
    } = this.props;
    // Prevent infinite loops
    if (prevProps.categories.currentSelected !== categories.currentSelected) {
      this.props.filterByCategory(params.category);
    }
  }

  isCategoryNotFound = categoryName => {
    const { categories } = this.props.categories;
    // Check if is there any category matching
    return !categories.find(category => category.name === categoryName);
  };

  render() {
    // product: {id: number, name: string, image: string, price: number, created_at: string, category: string}
    const { isLoading, products } = this.props.products;
    const { currentSelected } = this.props.categories;
    const { userID } = this.props.userInfo;

    let productsList = products.map(product => {
      return <OneProduct {...product} userID={userID} key={product.id} />;
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
    categories: state.categoriesReducer,
    userInfo: state.userReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: category => dispatch(fetchProducts(category)),
    filterByCategory: category => dispatch(filterByCategory(category))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Products));
