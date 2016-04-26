import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginFields from '../components/LoginFields/LoginFields'
import { requestLogin } from '../redux/modules/user'



const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: values => {
      dispatch(requestLogin(values.email, values.password))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFields)
