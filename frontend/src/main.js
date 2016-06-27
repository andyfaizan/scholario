import React from 'react'
import ReactDOM from 'react-dom'
import { syncHistoryWithStore } from 'react-router-redux'
import makeRoutes from './routes'
import Root from './containers/Root'
import configureStore from './redux/configureStore'
import { browserHistory } from './history'
import injectTapEventPlugin from 'react-tap-event-plugin'

// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the key "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.

let initialState
const localStore = window.localStorage.getItem('scholario:store')
if (localStore && typeof localStore !== 'undefined') {
  initialState = JSON.parse(localStore)
  if (initialState.user) {
    initialState.user.fetchedData = false
  }
}

const store = configureStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router,
})

// Now that we have the Redux store, we can create our routes. We provide
// the store to the route definitions so that routes have access to it for
// hooks such as `onEnter`.
const routes = makeRoutes(store)

// Now that redux and react-router have been configured, we can render the
// React application to the DOM!
injectTapEventPlugin()
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
)
