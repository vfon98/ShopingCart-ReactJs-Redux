/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth.actions";
import useInput from "./useInput";

const LoginForm = props => {
  const [username, bindUsername] = useInput("quocduby1238667@gmail.com");
  const [password, bindPassword] = useInput("adward");

  const dispatch = useDispatch();
  const auth = useSelector(state => state.authReducer);

  useEffect(() => {
    auth.isLogin && props.history.push("/cart");
  }, [auth.isLogin]);

  useEffect(() => {
    console.log(auth.token);
  }, [auth]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <div>
      <div className='row justify-content-center'>
        <div className='col-sm-5'>
          <div className='card text-center'>
            <div className='card-header bg-success text-white'>
              <strong>You need to login first!</strong>
            </div>
            <div className='card-body'>
              <form role='form' onSubmit={handleSubmit}>
                <fieldset>
                  <div className='row'>
                    <div className='mx-auto'>
                      <img
                        className='mb-3 rounded-circle'
                        src='https://img.icons8.com/cute-clipart/100/000000/forgot-password.png'
                        alt='Missing'
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-sm-12 col-md-10 offset-md-1 px-0'>
                      <div className='form-group'>
                        <div className='input-group'>
                          <span className='input-group-prepend'>
                            <span className='input-group-text'>
                              <i className='fa fa-user'></i>
                            </span>
                          </span>
                          <input
                            className='form-control'
                            placeholder='Username'
                            type='text'
                            {...bindUsername}
                            autoFocus
                          />
                        </div>
                      </div>
                      <div className='form-group'>
                        <div className='input-group'>
                          <span className='input-group-prepend'>
                            <span className='input-group-text'>
                              <i className='fa fa-lock'></i>
                            </span>
                          </span>
                          <input
                            className='form-control'
                            placeholder='Password'
                            type='password'
                            {...bindPassword}
                          />
                        </div>
                        {/* LOGIN ERROR */}
                        <div className='error-input'>
                          {auth.loginError && auth.loginError.email}
                        </div>
                      </div>
                      <div className='form-group'>
                        <input
                          type='submit'
                          className='btn btn-lg btn-primary btn-block'
                          value='Sign in'
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
            <div className='card-footer'>
              Don't have an account! <br />
              <Link to='/signup'>Sign Up Here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
