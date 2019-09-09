
// export default App;
import React, { Component } from "react";
import App from "./navigation/app";
import { Provider } from 'react-redux';
import store from './redux/store'
export default class EmployerApp extends Component {
  render() {
    return (<Provider store={store}>
      <App />
    </Provider>)
  }
}