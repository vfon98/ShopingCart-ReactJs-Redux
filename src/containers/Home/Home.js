import React, { Component } from "react";
import Categories from "./Categories";
import Products from "./Products";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return (
      <div>
        {!this.props.isLoading && <Categories />}
        <hr />
        <Products />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.productsReducer.isLoading
});

export default connect(mapStateToProps)(Home);
