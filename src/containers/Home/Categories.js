/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { fetchCategories, changeSelectedCategory } from "../../actions";
import { Link, withRouter } from "react-router-dom";

class Categories extends PureComponent {
  componentDidMount = () => {
    this.props.fetchCategories();
  };

  componentDidUpdate = prevProps => {
    const {
      match: { params },
      categories
    } = this.props;

    if (prevProps.categories.isLoading !== categories.isLoading) {
      this.props.changeSelectedCategory(params.category);
    }
  };

  render() {
    const { categories } = this.props.categories;
    const currentCategory = this.props.match.params.category;

    const formatURL = url => url.replace(/\s/g, '-');

    const categoriesList = categories.map(category => {
      const { id, name } = category;
      return (
        <li className="nav-item text-nowrap" key={id}>
          <Link
            className={
              // Check active link
              currentCategory === name ? "nav-link active" : "nav-link border"
            }
            to={`/products/${formatURL(name)}`}
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
    fetchCategories: () => dispatch(fetchCategories())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Categories));
