import React, { Component } from 'react';
import { connect } from 'react-redux';
import './detail.style.scss';
import ProductImages from '../../components/ProductDetail/ProductImages';
import ProductInfo from '../../components/ProductDetail/ProductInfo';
import ProductDescription from '../../components/ProductDetail/ProductDescription';
import OtherProducts from '../../components/ProductDetail/OtherProducts';
import CompanyInfo from '../../components/ProductDetail/CompanyInfo';
import { detailProduct } from '../../actions/products.actions';
import LoadingButton from '../../components/LoadingButton'

export class ProductDetail extends Component {
  componentDidMount() {
    console.log(this.props);
    const {
      match: { params }
    } = this.props;
    this.props.detailProduct(params.id);
  }

  render() {
    const { details, isLoading } = this.props;
    
    return ( 
      isLoading ? <LoadingButton /> :
      <React.Fragment>
        <div className="row shadow">
          <ProductImages image={details.product.image} feeds={details.feeds} />
          <ProductInfo product={details.product} />
          <CompanyInfo company={details.company} />
        </div>
        <div className="row">
          <ProductDescription description={details.product.full_description} />
        </div>
        <div className="row">
          <OtherProducts />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  details: state.productsReducer.details,
  isLoading: state.productsReducer.isLoading,
});

const mapDispatchToProps = dispatch => ({
  detailProduct: id => dispatch(detailProduct(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
