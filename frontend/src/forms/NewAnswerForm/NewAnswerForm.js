import React from 'react'
import { reduxForm } from 'redux-form'
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import CardHeader from 'material-ui/Card/CardHeader';
import Avatar from 'material-ui/Avatar';
import CardActions from 'material-ui/Card/CardActions';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


export const fields = [ 'content' ]

const validate = (values) => {
  const errors = {}
  return errors
}

type Props = {
  handleSubmit: Function,
  fields: Object,
  initialValues: Object,
  onCancel: Function,
}

export class NewAnswer extends React.Component {
  props: Props;

  defaultProps = {
    fields: { },
  }

  render() {
    const { fields: { content }, handleSubmit, onCancel } = this.props

    const textStyle = {
      paddingLeft: 70,
      paddingRight: 50
    }
    const actionPadding = {
      paddingLeft: 52
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
            title={"Frage beantworten"}
          />
          <form onSubmit={handleSubmit}>
          <CardText style={textStyle}>
            <TextField
              {...content}
              floatingLabelText="Deine Antwort"
              multiLine={true}
              rows={2}
              fullWidth={true}
              floatingLabelStyle={floatingLabel}
              underlineFocusStyle={underlineColor}
            />
          </CardText>
          <CardActions style={actionPadding}>
            <FlatButton label="Senden" linkButton={true}
                   onTouchTap={handleSubmit} hoverColor="#26A65B" />
            <FlatButton
              label="Abbrechen" linkButton={true}
              onTouchTap={onCancel} hoverColor="#26A65B" />
          </CardActions>
          </form>
        </Card>
      </div>
    )
  }
}

NewAnswer = reduxForm({
  form: 'NewAnswer',
  fields,
  validate
})(NewAnswer)

export default NewAnswer
