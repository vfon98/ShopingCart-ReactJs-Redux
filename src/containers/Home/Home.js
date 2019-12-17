import React, { Component } from "react";
import Categories from "./Categories";
import Products from "./Products";

class Home extends Component {
  render() {
    return (
      <div>
        <Categories />
        <hr/>
        <Products />
      </div>
    );
  }
}

export default Home;