import React, { Component } from "react";
import Categories from "./Categories";
import Products from "./Products";
import { connect } from "react-redux";
import Pagination from "../../components/Pagination";
import { fetchCategories } from "../../actions";

class Home extends Component {
  componentDidMount() {
    // I put fetchCategories here instead of inside Categories.js for the reasons of boosting loading time and UX
    this.props.fetchCategories();
  }

  render() {
    return (
      <div>
        {/* Categories only appear right after products list loaded */}
        {!this.props.isLoading && <Categories />}
        <hr />
        <Products />
        <hr />
        <Pagination />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.productsReducer.isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
