import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import {Navbar} from "./Component";
import {Home , Sukses} from "./Pages";

export default class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Navbar />
            <Switch>
              <Route path="/" component={Home}  exact/>
              <Route path="/sukses" component={Sukses} />
            </Switch>
        </BrowserRouter>
      )
  }
}
