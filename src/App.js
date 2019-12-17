import React from "react";
import Navbar from "./components/Navbar";
import Home from "./containers/Home/Home";
import Wrapper from "./components/Wrapper";
import LoginForm from "./containers/Form/LoginForm";
import { Switch, Route } from "react-router-dom";
import SignupForm from "./containers/Form/SignupForm";
import Cart from "./containers/Cart/Cart";
import UserInfo from "./components/UserInfo";

function App() {
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
        </Switch>
      </Wrapper>
    </React.Fragment>
  );
}

export default App;