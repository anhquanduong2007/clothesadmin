import { Redirect, Route, Switch } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import React from "react";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.comom);
  return (
    <div className="App">
      
      <Switch>
        <Redirect exact from="/" to="/home/dashboard" />
        <Route path="/login">
          {
            token.token ? <Redirect to="/home/dashboard" /> : <Login />
          }
        </Route>
        {token.token ?  (
          <>
           
            <Route path="/home" component={Home} />
          </>
        ) : <Redirect to="/login" />}
      </Switch>
    </div>
  );
}

export default App;
