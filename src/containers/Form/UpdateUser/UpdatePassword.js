/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import useInput from '../../../components/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updatePassword, logout } from '../../../actions/auth.actions';

const UpdatePassword = () => {
  const [oldPassword, bindOldPassword] = useInput();
  const [newPassword, bindNewPassword] = useInput();
  const [confirmPassword, bindConfirmPassword] = useInput();

  const auth = useSelector(state => state.authReducer);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isPasswordUpdated) {
      dispatch(logout(auth.token));
      history.push('/login');

    }
  }, [auth.isPasswordUpdated]);

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(
      updatePassword(auth.token, { oldPassword, newPassword, confirmPassword })
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-10 offset-md-1 px-0">
            <div className="form-group">
              <label>Old Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Your old password"
                {...bindOldPassword}
                required
              />
              <div className="error-input">
                {auth.passwordError && auth.passwordError.old_password}
              </div>
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="At least 4 character"
                {...bindNewPassword}
                minLength="4"
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="At least 4 character"
                {...bindConfirmPassword}
                minLength="4"
                required
              />
              <div className="error-input">
                {auth.passwordError && auth.passwordError.confirm_password}
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-danger btn-lg btn-block">
                <i className="fa fa-key mr-2"></i>
                Update password
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
