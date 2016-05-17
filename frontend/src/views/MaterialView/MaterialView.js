import React from 'react'
import { connect } from 'react-redux'
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
        <PreviewMaterial location={this.props.location} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MaterialView)
