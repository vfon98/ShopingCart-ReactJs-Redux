/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";
import { changeSelectedCategory } from "../../actions";

class Categories extends Component {
  render() {
    const { currentSelected, categories } = this.props.categories;

    const categoriesList = categories.map(category => {
      // category entries: {id: number, name: string}
      const { id, name } = category;
      return (
        <li className='nav-item' key={id}>
          <a
            className={
              currentSelected.id === id ? "nav-link active" : "nav-link"
            }
            href='#'
            onClick={() => this.props.changeSelected(id)}
          >
            {name}
          </a>
        </li>
      );
    });

    return (
      <ul className='nav nav-pills nav-justified'>
        <li className="nav-item"><a className="nav-link">Filter:</a></li>
        {categoriesList}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categoriesReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSelected: id => dispatch(changeSelectedCategory(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
