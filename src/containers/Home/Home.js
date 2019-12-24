import React, { Component } from "react";
import Categories from "./Categories";
import Products from "./Products";
import { connect } from "react-redux";
import Pagination from "../../components/Pagination";

class Home extends Component {
  render() {
    return (
      <div>
        {!this.props.isLoading && <Categories />}
        <hr />
        <Products />
        <hr/>
        <Pagination />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.productsReducer.isLoading
});

export default connect(mapStateToProps)(Home);
