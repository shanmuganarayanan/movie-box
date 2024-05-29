import React from 'react';
import { HashRouter } from 'react-router-dom'; 
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/store';
import Main from './Main/Main';

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    </HashRouter>
  );
}

export default App;
