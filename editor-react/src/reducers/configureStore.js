import { createStore, applyMiddleware,compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage/session'
//import { composeWithDevTools } from "redux-devtools-extension"
import thunk from 'redux-thunk'

import rootReducer from './rootReducer'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose

export default () => {
    const store = createStore(persistedReducer,
        composeEnhancers(applyMiddleware(thunk))
    )
    const persistor = persistStore(store)
    return { store, persistor }
}