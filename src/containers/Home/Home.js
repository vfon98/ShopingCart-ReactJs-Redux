import React, { Component } from "react";
import Categories from "./Categories";
import Products from "./Products";
import { connect } from "react-redux";
import Pagination from "../../components/Pagination";

class Home extends Component {
  render() {
    return (
      <div>
        <Categories />
        <hr />
        <Products />
        <hr />
        <Pagination />
      </div>
    );
  }
}

export default connect()(Home);
