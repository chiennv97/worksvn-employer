
// export default App;
import React, { Component } from "react";
import App from "./src/navigation/app";
import { Provider } from 'react-redux';
import store from './src/redux/store'
export default class EmployerApp extends Component {
  render() {
    return (<Provider store={store}>
      <App />
    </Provider>)
  }
}