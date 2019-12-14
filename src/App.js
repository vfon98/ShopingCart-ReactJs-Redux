import React from "react";
import Navbar from "./components/Navbar";
import Home from "./containers/Home/Home";
import Wrapper from "./components/Wrapper";
import LoginForm from "./containers/Form/LoginForm";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Wrapper>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' exact component={LoginForm} />
        </Switch>
      </Wrapper>
    </React.Fragment>
  );
}

export default App;
