import React from 'react'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator'
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title'

type Props = {

};
export class DashboardToolBar extends React.Component {
  props: Props;

  render () {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='Right'>
            <ToolbarTitle text='Scholario' />
          </ToolbarGroup>
        </Toolbar>
      </div>
    )
  }
}

export default DashboardToolBar

