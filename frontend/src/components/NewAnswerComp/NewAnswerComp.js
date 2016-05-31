import React, { PropTypes } from 'react'
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import CardHeader from 'material-ui/Card/CardHeader';
import Avatar from 'material-ui/Avatar';
import CardActions from 'material-ui/Card/CardActions';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

type Props = {

  personWhoAnswered: PropTypes.Object,
  dateAnswered: PropTypes.string,
  answerText: PropTypes.string,
  user: PropTypes.Object,
  courseInstance: PropTypes.Object,
  onClickDelAnswer: PropTypes.func,

};

export class NewAnswerComp extends React.Component {
  props: Props;

  render () {

  	const { personWhoAnswered, user, courseInstance, onClickDelAnswer } = this.props

    var nameInitial = ''
    if (personWhoAnswered)
      nameInitial = personWhoAnswered.firstname[0]

    const textStyle = {

      paddingLeft: 70,
      paddingRight: 50

    }

    const actionPadding = {
        
      paddingLeft: 52

    }

    const teacherVerify = {

      postion: 'relative',
      marginTop: 0,
      float:'right'
    }

    const StudentVerify = {

      postion: 'relative',
      margin:'auto',
      marginTop: 0,
      marginRight:10,
      float:'right'
    }

    const nodeHeader = [
      <Avatar style={teacherVerify} backgroundColor="grey">T</Avatar>,
      <Avatar style={StudentVerify} backgroundColor="grey">S</Avatar>
    ]

    var actions = []
    if (user && personWhoAnswered && user._id === personWhoAnswered._id) {
      actions.push(<FlatButton key='answerEditingButton' label="Antwort bearbeiten" linkButton={true}
                   hoverColor="#26A65B" />)
      actions.push(<FlatButton key='answerDeletingButton' label="Antwort löschen" linkButton={true}
                   onTouchTap={onClickDelAnswer} hoverColor="#26A65B" />)
    }
    if (user && courseInstance && user.role === 'Prof' && user._id === courseInstance.prof._id) {
      actions.push(<FlatButton key='answerApprovingButton' label="überprüfen Antwort" linkButton={true}
                   hoverColor="#26A65B" />)
    }

    const floatingLabel = {

    	color:'#26A65B'
    }

    const underlineColor = {

  		borderColor:'#446CB3'
    }


    return (
      <div>
      	<Card>
          <CardHeader
            title={"Antwort"}
          />
          <CardText style={textStyle}>
			     <TextField
				      floatingLabelText="Deine Antwort"
				      multiLine={true}
				      rows={2}
				      fullWidth={true}
				      floatingLabelStyle={floatingLabel}
				      underlineFocusStyle={underlineColor}
				    />
          </CardText>
          <CardActions style={actionPadding}>
            <FlatButton key='answerApprovingButton' label="Abschicken" linkButton={true}
                   hoverColor="#26A65B" />
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default NewAnswerComp

