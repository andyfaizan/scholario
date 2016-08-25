import React, { PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'

import ChapterTabs from '../../components/ChapterTabs/ChapterTabs'

const propTypes = {

}

function NewCourse() {
  const styles = getStyles()

  return (
    <div>
      <div style={styles.rootCourse} >
        <br />
        <ChapterTabs />
      </div>
    </div>
    )
}

function getStyles() {
  return {
    rootCourse: {
      backgroundColor: '#FBF6EC',
      minHeight: '100vh',
    },
  }
}

NewCourse.propTypes = propTypes

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(NewCourse))
