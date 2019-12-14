/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";

class Categories extends Component {
  state = {
    currentActiveId: 0
  };

  changeActive = id => {
      this.setState({
          currentActiveId: id
      });
  }

  render() {
    const { categories } = this.props;
    const activeId = this.state.currentActiveId;

    const categoriesList = categories.map(category => {
      // category entries: {id: number, name: string}
      const { id, name } = category;
      return (
        <li className='nav-item' key={id}>
          <a
            className={activeId === id ? "nav-link active" : "nav-link"}
            href='#'
            onClick={() => this.changeActive(id)}
          >
            {name}
          </a>
        </li>
      );
    });
    return <ul className='nav nav-pills nav-justified'>{categoriesList}</ul>;
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categoriesReducer
  };
};

export default connect(mapStateToProps)(Categories);
