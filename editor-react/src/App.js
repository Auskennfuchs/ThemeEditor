import React, { Component } from 'react';

import { PersistGate } from 'redux-persist/lib/integration/react'
import { Provider } from 'react-redux'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faIgloo, faInfoCircle, faVial, faCodeBranch, faPalette, faPen, faMobileAlt, faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Editor from './components/editor/Editor'
import PagePreview from './PagePreview'
import AppContainer from './components/AppContainer'
import configureStore from './reducers/configureStore'

const { store, persistor } = configureStore()

library.add(faIgloo, faInfoCircle, faVial, faCodeBranch, faPalette, faPen, faMobileAlt, faTrashAlt, faTimes)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<span>Loading...</span>} persistor={persistor}>
          <AppContainer>
            <BrowserRouter>
              <Switch>
                <Route path="/editor" exact component={Editor} />
                <Route path="/preview" exact component={PagePreview} />
                <Route path="*" component={Editor} />
              </Switch>
            </BrowserRouter>
          </AppContainer>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
