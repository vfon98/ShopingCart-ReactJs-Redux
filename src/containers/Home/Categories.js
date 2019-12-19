/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { changeSelectedCategory, filterByCategory } from "../../actions";

class Categories extends PureComponent {
  componentDidUpdate = () => {
    const { currentSelected } = this.props.categories;
    this.props.filterByCategory(currentSelected.name);
  };

  render() {
    const { currentSelected, categories } = this.props.categories;

    const categoriesList = categories.map(category => {
      // category entries: {id: number, name: string}
      const { id, name } = category;
      return (
        <li className='nav-item' key={id}>
          <a
            className={
              currentSelected.id === id ? "nav-link active" : "nav-link border"
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
      <ul className='nav nav-pills nav-justified' id='category-bar'>
        <li className='nav-item'>
          <a className='nav-link'>Tags:</a>
        </li>
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
    changeSelected: id => dispatch(changeSelectedCategory(id)),
    filterByCategory: category => dispatch(filterByCategory(category))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
