/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import useInput from '../../../components/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updatePassword, logout } from '../../../actions/auth.actions';
import { Input } from 'reactstrap'

const UpdatePassword = () => {
  const [oldPassword, bindOldPassword] = useInput();
  const [newPassword, bindNewPassword] = useInput();
  const [confirmPassword, bindConfirmPassword] = useInput();
  const [passwordError, setPasswordError] = useState('');

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
    if (newPassword !== confirmPassword) {
      setPasswordError('Password does not match');
      return;
    }

    dispatch(
      updatePassword(auth.token, { oldPassword, newPassword, confirmPassword })
    );
  };

  const resetError = () => setPasswordError('');

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-10 offset-md-1 px-0">
            <div className="form-group">
              <label>Old Password</label>
              <Input
                type="password"
                placeholder="Your old password"
                {...bindOldPassword}
                required
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <Input
                type="password"
                placeholder="At least 4 character"
                {...bindNewPassword}
                minLength="4"
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <Input
                onBlur={resetError}
                onInput={resetError}
                type="password"
                placeholder="At least 4 character"
                {...bindConfirmPassword}
                minLength="4"
                required
              />
              <div className="error-input">
                {passwordError}
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
