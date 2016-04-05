import React from 'react'
import DashboardToolBar from '../../components/DashBoardToolBar/DashBoardToolBar'

type Props = {

};
export class DashboardView extends React.Component {
  props: Props;

  render () {
    return (
      <div>
        <DashboardToolBar />
      </div>
    )
  }
}

export default DashboardView
