import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Card from 'material-ui/Card/Card'
import CardActions from 'material-ui/Card/CardActions'
import CardHeader from 'material-ui/Card/CardHeader'
import CardText from 'material-ui/Card/CardText'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import ChangePasswordForm from '../forms/ChangePasswordForm/ChangePasswordForm'
import * as selectors from '../redux/selectors'
import { putUser, PUT_USER_OK, PUT_USER_ERR } from '../redux/modules/user'

const propTypes = {
  firstNameUser: PropTypes.string,
  lastNameUser: PropTypes.string,
  universityName: PropTypes.string,
  programmeName: PropTypes.number,
  imageUrl: PropTypes.string,
  shortInformation: PropTypes.string,
  putUserOk: PropTypes.string,
  putUserErr: PropTypes.string,
  dispatch: PropTypes.func,
}

function TeacherProfileBar({ putUserOk, putUserErr }) {
  const cardTitle = `${this.props.firstNameUser}  ${this.props.lastNameUser}`
  const cardSubtitle = `${this.props.universityName} (${this.props.programeName})`
  const shortInformation = this.props.bio

  let nameInitial = ''
  if (this.props.firstNameUser) nameInitial = this.props.firstNameUser[0]

  let changePasswordFeedback = -1
  if (putUserOk) changePasswordFeedback = 0
  else if (putUserErr) changePasswordFeedback = 1

  return (
    <div>
      <Card>
        <CardHeader
          title={cardTitle}
          subtitle={cardSubtitle}
          avatar={<Avatar backgroundColor="#446CB3">{nameInitial}</Avatar>}
          actAsExpander
          showExpandableButton
          titleColor="#26A65B"
        />
        <Divider />
        <CardText expandable>
          {shortInformation}
          <ChangePasswordForm
            onSubmit={(data) => this.props.dispatch(putUser('', '', '', data.password))}
            feedbackTrue={changePasswordFeedback}
          />
        </CardText>
        <CardActions expandable >
        {/*
          <FlatButton
            label="Facebook" linkButton={true} href={facebookUrl}
            hoverColor="#26A65B" icon={<ActionHome color="#26A65B" />}
          />
          <FlatButton
            label="Twitter" linkButton={true} href={twitterUrl}
            hoverColor="#26A65B"  icon={<ActionHome color="#26A65B" />}
          />
          <FlatButton
            label="Medium" linkButton={true} href={mediumUrl}
            hoverColor="#26A65B" icon={<ActionHome  color="#26A65B" />}
          />
          <FlatButton
            label="Instagram" linkButton={true} hoverColor="#26A65B"
            href={instagramUrl}  icon={<ActionHome  color="#26A65B"/>}
          />
          */}
        </CardActions>
      </Card>

    </div>
  )
}

const mapStateToProps = (state) => ({
  putUserOk: selectors.getRequest(state, PUT_USER_OK),
  putUserErr: selectors.getRequest(state, PUT_USER_ERR),
})

TeacherProfileBar.propTypes = propTypes

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(TeacherProfileBar)
