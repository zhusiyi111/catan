import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./utils/ws";

import store from "./models";
import Game from "./pages/Game";
import LoginPage from "./pages/LoginPage";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Route exact path="/" component={LoginPage} />
          <Route path="/game" component={Game} />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
