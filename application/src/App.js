import React, { Component } from "react";
import { Provider } from "react-redux";
import AppRouter from "./router/appRouter";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
