import React, { PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import { hide } from '../redux/modules/modal'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

const propTypes = {

}

export class <%= pascalEntityName %> extends React.Component {

  render() {
    const styles = getStyles()
    const title = ''

    const actions = [
      <FlatButton
        label="Abbrechen"
        secondary
        labelStyle={styles.labelStyle2}
        onTouchTap={this.props.hide}
      />,
      <RaisedButton
        label="Fertig"
        primary={false}
        backgroundColor="#446CB3"
        labelStyle={styles.labelStyle1}
        onTouchTap={}
      />,
    ]

    return (
      <div>
        <Dialog
          title={title}
          actions={actions}
          modal
          open={this.props.modal.visible}
          autoScrollBodyContent
          autoDetectWindowHeight
        />
      </div>
    )
  }
}

function getStyles() {
  return {
    labelStyle1: {
      color: 'white',
      fontWeight: 'bold',
    },
    labelStyle2: {
      color: 'black',
    },
  }
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

<%= pascalEntityName %>.propTypes = propTypes

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(<%= pascalEntityName %>))
