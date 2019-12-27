/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  fetchCategories,
  changeSelectedCategory,
} from "../../actions";
import { Link, withRouter } from "react-router-dom";

class Categories extends PureComponent {
  state = {
    currentCategory: "All"
  };

  componentDidMount = () => {
    this.props.fetchCategories();
    const {
      match: { params }
    } = this.props;
    this.setState({
      currentCategory: params.category
    });
  };
  
  componentDidUpdate = (prevProps) => {
    const {
      match: { params },
      categories: { currentSelected },
      categories
    } = this.props;
    if (prevProps.categories.currentSelected !== currentSelected) {
      this.setState({
        currentCategory: params.category
      });
    }
    
    if (prevProps.categories.isLoading !== categories.isLoading) {
      this.props.changeSelectedCategory(params.category)
    }
  };

  render() {
    const { categories } = this.props.categories;
    const { currentCategory } = this.state;

    const categoriesList = categories.map(category => {
      // category entries: {id: number, name: string}
      const { id, name } = category;
      return (
        <li className="nav-item text-nowrap" key={id}>
          <Link
            className={
              // Check active link
              currentCategory === name ? "nav-link active" : "nav-link border"
            }
            to={`/products/${name}`}
            onClick={() => this.props.changeSelectedCategory(name)}
          >
            {name}
          </Link>
        </li>
      );
    });

    return (
      // Not display until loading done
      !this.props.categories.isLoading && (
        <ul className="nav nav-pills nav-justified" id="category-bar">
          <li className="nav-item text-nowrap">
            <a className="nav-link">Filter by:</a>
          </li>
          {categoriesList}
        </ul>
      )
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
    changeSelectedCategory: name => dispatch(changeSelectedCategory(name)),
    fetchCategories: () => dispatch(fetchCategories()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Categories));
