/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import UpdatePassword from './UpdatePassword';
import UpdateProfile from './UpdateProfile';

const UpdateUser = () => {
  return (
    <div>
      <div className="row">
        <div className="col-sm-8 col-md-6 offset-sm-2 offset-md-3">
          <div className="card text-center">
            <div className="card-header bg-info text-white">
              <strong>Update your information</strong>
            </div>
            <div className="card-body text-left">
              <UpdateProfile />
              <UpdatePassword />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
