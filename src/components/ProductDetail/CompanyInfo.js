import React from 'react';

const CompanyInfo = props => {
  const { company } = props;
  return (
    <div className="col-md-3 border pt-2" id="company">
      <div className="row justify-content-center">
        <img
          src={company.logo || 'https://place-hold.it/100'}
          className="img-fluid img-thumbnail rounded-circle w-75"
          alt=""
        />
      </div>
      <dl className="col">
        <dd>
          <h3 className="text-center">{company.store_name}</h3>
        </dd>
      </dl>
      <hr />
      <dl className="col">
        <dt>Address</dt>
        <dd>{company.address}</dd>
      </dl>
      <dl className="col">
        <dt>Phone number</dt>
        <dd>{company.phone_number}</dd>
      </dl>
      <dl className="col">
        <dt>Products</dt>
        <dd>
          {company.productgroup &&
            company.productgroup.map(product => product.name).join(', ')}
        </dd>
      </dl>
      <hr />
      <div className="social-links">
        <p>
          <i className="fa fa-2x fa-fw fa-facebook-square text-info"></i>
          {company.social_link && company.social_link.facebook}
        </p>
        <p>
          <i className="fa fa-2x fa-fw fa-instagram text-danger"></i>
          {company.social_link && company.social_link.instagram}
        </p>
        <p>
          <i className="fa fa-2x fa-fw fa-twitter text-primary"></i>
          {company.social_link && company.social_link.twitter || 'unknown'}
        </p>
      </div>
    </div>
  );
};

export default CompanyInfo;
