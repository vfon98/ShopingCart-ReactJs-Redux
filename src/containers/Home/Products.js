import React, { PureComponent } from "react";
import OneProduct from "../../components/OneProduct";
import LoadingButton from "../../components/LoadingButton";
import { connect } from "react-redux";
import {
  searchByCategory
} from "../../actions/products.actions";
import { withRouter } from "react-router-dom";
import EmptyButton from "../../components/EmptyButton";

class Products extends PureComponent {
  componentDidMount() {
    console.log("FETCHING API");

    const {
      match: { params }
    } = this.props;
    this.props.searchByCategory(params.category);
  }

  deformatURL = url => {
    return url.replace(/-/g, ' ');
  }

  componentDidUpdate(prevProps) {
    const {
      match: { params },
      categories,
      history
    } = this.props;
    // Prevent infinite loops
    if (prevProps.categories.currentSelected !== categories.currentSelected) {
      this.props.searchByCategory(this.deformatURL(params.category));
    }
    // Redirect when category not matched
    if (!categories.isLoading && this.isCategoryNotFound()) {
      history.replace("/404");
    }
  }

  isCategoryNotFound = () => {
    const {
      match: { params },
      categories: { categories }
    } = this.props;
    return !categories.find(category => category.name === this.deformatURL(params.category));
  };

  render() {
    // product: {id: number, name: string, image: string, price: number, created_at: string, category: string}
    const { isLoading, products } = this.props.products;
    const { currentSelected } = this.props.categories;

    let productsList = products.map(product => {
      return <OneProduct {...product} key={product.id} />;
    });

    return (
      <div>
        <h2>Category: {currentSelected && currentSelected.name}</h2>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <div className="row">
            {productsList.length ? productsList : <EmptyButton />}
          </div>
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
    searchByCategory: category => dispatch(searchByCategory(category))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Products));
