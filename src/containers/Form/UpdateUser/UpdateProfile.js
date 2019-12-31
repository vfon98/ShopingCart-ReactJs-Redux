/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import avatar from '../../../assets/user.jpg';
import useInput from '../../../components/useInput';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateProfile } from '../../../actions/user.actions';

const UpdateProfile = () => {
  const user = useSelector(state => state.userReducer);
  const auth = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current.value = user.email;
    !auth.isLogin && history.push('/login');
  }, [user.email, auth.isLogin]);

  const [firstName, bindFirstName] = useInput(user.firstName);
  const [lastName, bindLastName] = useInput(user.lastName);
  const [city, bindCity] = useInput(user.city);

  const handleSubmit = e => {
    e.preventDefault();
    const newProfile = { firstName, lastName, city };
    dispatch(updateProfile(auth.token, newProfile)).then(res => {
      history.push('user');
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row text-center">
          <img
            className="mb-3 w-25 rounded-circle mx-auto"
            src={avatar}
            alt="missing"
          />
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-10 offset-md-1 px-0">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                ref={emailRef}
                defaultValue="Loading..."
                className="form-control"
                readOnly
              />
            </div>
            <div className="form-group">
              <label>First name</label>
              <input
                className="form-control"
                placeholder="Ex: John"
                type="text"
                {...bindFirstName}
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <label>Last name</label>
              <input
                className="form-control"
                placeholder="Ex: Doe"
                type="text"
                {...bindLastName}
                required
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                className="form-control"
                placeholder="Ex: Can Tho"
                type="text"
                {...bindCity}
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-lg btn-success btn-block"
              >
                <i className="fa fa-pencil-square-o mr-2"></i>
                Update profile
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
