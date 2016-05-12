import React from 'react'
import DashboardToolBar from '../../containers/DashboardToolBar'
import PreviewMaterial from '../../containers/PreviewMaterial'

type Props = {

};

export class MaterialView extends React.Component {
  props: Props;

  render () {
    return (
      <div>
        <DashboardToolBar />
        <PreviewMaterial />
      </div>
    )
  }
}

export default MaterialView
