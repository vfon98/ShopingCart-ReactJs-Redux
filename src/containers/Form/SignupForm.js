/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerAccount } from "../../actions/auth.actions";
import useInput from "./useInput";

const SignupForm = props => {
  const [firstName, bindFirstName] = useInput("Phong");
  const [lastName, bindLastName] = useInput("To");
  const [email, bindEmail] = useInput("quocduby@gmail.com");
  const [password, bindPassword] = useInput("password");
  const [confirmPassword, bindConfirmPassword] = useInput("password");
  const [city, bindCity] = useInput("Can Tho");

  const dispatch = useDispatch();
  const auth = useSelector(state => state.authReducer);
  const error = auth.registerError;

  useEffect(() => {
    if (auth.registerSuccess) {
      props.history.push("/login");
    }
  }, [auth.registerSuccess]);

  const handleSubmit = e => {
    console.log("HANDLED");
    console.log(auth.registerError);
    e.preventDefault();
    // Object key based on API input data
    const account = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      confirm_password: confirmPassword,
      city
    };
    dispatch(registerAccount(account));
  };

  return (
    <div>
      <div className='row'>
        <div className='col-sm-8 col-md-6 offset-sm-2 offset-md-3'>
          <div className='card text-center'>
            <div className='card-header bg-success text-white'>
              <strong>First time with us? Sign up now!</strong>
            </div>
            <div className='card-body'>
              <form role='form' onSubmit={handleSubmit}>
                <fieldset>
                  <div className='row'>
                    <div className='mx-auto'>
                      <img
                        className='mb-3 rounded-circle'
                        src='https://img.icons8.com/bubbles/100/000000/user.png'
                        alt='missing'
                      />
                    </div>
                  </div>
                  <div className='row text-left'>
                    <div className='col-sm-12 col-md-10 offset-md-1 px-0'>
                      <div className='form-group'>
                        <label>First name</label>
                        <input
                          className='form-control'
                          placeholder='Ex: John'
                          type='text'
                          {...bindFirstName}
                          autoFocus
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label>Last name</label>
                        <input
                          className='form-control'
                          placeholder='Ex: Doe'
                          type='text'
                          {...bindLastName}
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label>Email</label>
                        <input
                          className='form-control'
                          placeholder='Ex: example@mail.com'
                          type='email'
                          {...bindEmail}
                          required
                        />
                        <div className='error-input'>
                          {error && error.email && error.email[0]}
                        </div>
                      </div>
                      <div className='form-group'>
                        <label>Password</label>
                        <input
                          className='form-control'
                          placeholder='At least 4 characters'
                          type='password'
                          {...bindPassword}
                          required
                        />
                        <div className='error-input'>
                          {error && error.password && error.password[0]}
                        </div>
                      </div>
                      <div className='form-group'>
                        <label>Confirm password</label>
                        <input
                          className='form-control'
                          placeholder='At least 4 characters'
                          type='password'
                          {...bindConfirmPassword}
                          required
                        />
                        <div className='error-input'>
                          {error &&
                            error.confirm_password &&
                            error.confirm_password[0]}
                        </div>
                      </div>
                      <div className='form-group'>
                        <label>City (For shipping)</label>
                        <input
                          className='form-control'
                          placeholder='Ex: Can Tho'
                          type='text'
                          {...bindCity}
                        />
                      </div>
                      <div className='form-group'>
                        <button
                          type='submit'
                          className='btn btn-lg btn-primary btn-block'
                        >
                          <i className='fa fa-user-plus mr-2'></i>
                          Sign up
                        </button>
                      </div>
                      <hr className='mb-1' />
                      <div className='text-center'>Or</div>
                      <Link
                        to='/login'
                        className='btn btn-success btn-lg btn-block'
                      >
                        <i className='fa fa-sign-in mr-2'></i>
                        Login
                      </Link>
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

export default SignupForm;
