import createBrowserHistory from 'history/lib/createBrowserHistory'
import { useRouterHistory } from 'react-router'


export const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__,
})
