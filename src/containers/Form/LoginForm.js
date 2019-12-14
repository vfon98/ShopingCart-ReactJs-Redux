/* eslint-disable jsx-a11y/no-redundant-roles */
import React from "react";

const LoginForm = () => {
  return (
    <div>
      <div class='row'>
        <div class='col-sm-6 col-md-4 offset-md-4'>
          <div class='card text-center'>
            <div class='card-header'>
              <strong> Sign in to continue</strong>
            </div>
            <div class='card-body'>
              <form role='form' action='#' method='POST'>
                <fieldset>
                  <div class='row'>
                    <div class='mx-auto'>
                      <img
                        class='mb-3 rounded-circle'
                        src='https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120'
                        alt=''
                      />
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col-sm-12 col-md-10 offset-md-1 px-0'>
                      <div class='form-group'>
                        <div class='input-group'>
                          <span class='input-group-prepend'>
                            <span className="input-group-text"><i class='fa fa-user'></i></span>
                          </span>
                          <input
                            class='form-control'
                            placeholder='Username'
                            name='loginname'
                            type='text'
                            autoFocus
                          />
                        </div>
                      </div>
                      <div class='form-group'>
                        <div class='input-group'>
                          <span class='input-group-prepend'>
                            <span className="input-group-text"><i class='fa fa-lock'></i></span>
                          </span>
                          <input
                            class='form-control'
                            placeholder='Password'
                            name='password'
                            type='password'
                            value=''
                          />
                        </div>
                      </div>
                      <div class='form-group'>
                        <input
                          type='submit'
                          class='btn btn-lg btn-primary btn-block'
                          value='Sign in'
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
            <div class='card-footer'>
              Don't have an account!&nbsp;
              <a href='#' onClick=''>
                Sign Up Here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
