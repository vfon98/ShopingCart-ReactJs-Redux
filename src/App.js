/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./containers/Home/Home";
import Wrapper from "./components/Wrapper";
import LoginForm from "./containers/Form/LoginForm";
import { Switch, Route } from "react-router-dom";
import SignupForm from "./containers/Form/SignupForm";
import Cart from "./containers/Cart/Cart";
import UserInfo from "./components/UserInfo";
import { checkLogin, fetchCartFromAPI } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "react-stripe-elements";
import Checkout from "./containers/Checkout/Checkout";

function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userReducer);
  useEffect(() => {
    if (!userInfo.isLogin) {
      dispatch(checkLogin());
    } else {
      dispatch(fetchCartFromAPI(userInfo.userID));
    }
  }, [userInfo.isLogin]);

  return (
    <React.Fragment>
      <Navbar />
      <Wrapper>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' exact component={LoginForm} />
          <Route path='/signup' exact component={SignupForm} />
          <Route path='/cart' exact component={Cart} />
          <Route path='/user' exact component={UserInfo} />
          <Elements>
            <Route path='/checkout' exact component={Checkout} />
          </Elements>
        </Switch>
      </Wrapper>
    </React.Fragment>
  );
}

export default App;
