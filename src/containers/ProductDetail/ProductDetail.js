import React, { Component } from 'react';
import { connect } from 'react-redux';
import './detail.style.scss';
import ProductImages from '../../components/ProductDetail/ProductImages';
import ProductInfo from '../../components/ProductDetail/ProductInfo';
import ProductDescription from '../../components/ProductDetail/ProductDescription';
import OtherProducts from '../../components/ProductDetail/OtherProducts';
import CompanyInfo from '../../components/ProductDetail/CompanyInfo';
import { detailProduct } from '../../actions/products.actions';
import LoadingButton from '../../components/LoadingButton';

export class ProductDetail extends Component {
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.props.detailProduct(params.id);
  }

  componentDidUpdate(prevProps) {
    const {
      match: { params }
    } = this.props;
    if (prevProps.match.params.id !== params.id) {
      this.props.detailProduct(params.id);
    }
  }

  render() {
    const { details, isLoading } = this.props;

    return isLoading ? (
      <LoadingButton />
    ) : (
      <React.Fragment>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => this.props.history.push('/products')}
        >
          <i className="fa fa-chevron-left fa-lg mr-2"></i>Back
        </button>
        <div className="row shadow">
          <ProductImages image={details.product.image} feeds={details.feeds} />
          <ProductInfo product={details.product} />
          <CompanyInfo company={details.company} />
        </div>
        <div className="row">
          <ProductDescription description={details.product.full_description} />
        </div>
        <div className="row">
          <OtherProducts products={details.other_products} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  details: state.productsReducer.details,
  isLoading: state.productsReducer.isLoading
});

const mapDispatchToProps = dispatch => ({
  detailProduct: id => dispatch(detailProduct(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
