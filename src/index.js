import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import DevTools from './containers/DevTools'
import App from './components/App'
import reducer from './reducers'
import 'todomvc-app-css/index.css'

const store = createStore(reducer,
  // stock redux devtools
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

  // our custom devtools
  DevTools.instrument()
)

render(
  <Provider store={store}>
    <>
      <App />
      <DevTools />
    </>
  </Provider>,
  document.getElementById('root')
)
