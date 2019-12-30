import React from 'react';
import avatar from '../../assets/user.jpg';
import useInput from '../../components/useInput';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../api/user.api';

const UpdateProfile = () => {
  const user = useSelector(state => state.userReducer);
  const auth = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  const [firstName, bindFirstName] = useInput(user.firstName);
  const [lastName, bindLastName] = useInput(user.lastName);
  const [city, bindCity] = useInput(user.city);

  const handleSubmit = e => {
    e.preventDefault();
    const newProfile = { firstName, lastName, city };
    dispatch(updateProfile(auth.token, newProfile));
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-8 col-md-6 offset-sm-2 offset-md-3">
          <div className="card text-center">
            <div className="card-header bg-success text-white">
              <strong>First time with us? Sign up now!</strong>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <fieldset>
                  <div className="row">
                    <div className="mx-auto">
                      <img
                        className="mb-3 w-25 rounded-circle"
                        src={avatar}
                        alt="missing"
                      />
                    </div>
                  </div>
                  <div className="row text-left">
                    <div className="col-sm-12 col-md-10 offset-md-1 px-0">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          className="form-control"
                          placeholder="Ex: example@mail.com"
                          type="email"
                          value={user.email}
                          disabled
                        />
                      </div>
                      <div className="form-group">
                        <label>First name</label>
                        <input
                          className="form-control"
                          placeholder="Ex: John"
                          type="text"
                          {...bindFirstName}
                          value={firstName}
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
                          className="btn btn-lg btn-primary btn-block"
                        >
                          <i className="fa fa-user-plus mr-2"></i>
                          Sign up
                        </button>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
