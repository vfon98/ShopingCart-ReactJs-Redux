/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAccount } from "../../actions";

const LoginForm = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.userReducer.isLogin);
  
  useEffect(() => {
    if (isLogin && props.history.push("/cart"));
  }, [isLogin]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loginAccount({ username, password }));
  };

  return (
    <div>
      <div className='row'>
        <div className='col-sm-6 col-md-4 offset-md-4'>
          <div className='card text-center'>
            <div className='card-header bg-success text-white'>
              <strong>You need to login first!</strong>
            </div>
            <div className='card-body'>
              <form
                role='form'
                action='#'
                method='POST'
                onSubmit={handleSubmit}
              >
                <fieldset>
                  <div className='row'>
                    <div className='mx-auto'>
                      <img
                        className='mb-3 rounded-circle'
                        // src='https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120'
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
                            name='loginname'
                            type='text'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
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
                            name='password'
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                          />
                        </div>
                        {isLogin === false ? (
                          <div className='text-danger font-italic'>
                            Wrong username or password!
                          </div>
                        ) : (
                          ""
                        )}
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
