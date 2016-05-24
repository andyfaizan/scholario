import React from 'react'
import { reduxForm } from 'redux-form'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import CardHeader from 'material-ui/lib/card/card-header'
import Avatar from 'material-ui/lib/avatar'
import CardActions from 'material-ui/lib/card/card-actions'
import FlatButton from 'material-ui/lib/flat-button'
import TextField from 'material-ui/lib/text-field'


export const fields = [ 'content' ]

const validate = (values) => {
  const errors = {}
  return errors
}

type Props = {
  handleSubmit: Function,
  fields: Object,
  initialValues: Object,
}

export class NewAnswer extends React.Component {
  props: Props;

  defaultProps = {
    fields: { },
  }

  render() {
    const { fields: { content }, handleSubmit } = this.props

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
            title={"Stellen Sie die Antwort"}
          />
          <form onSubmit={handleSubmit}>
          <CardText style={textStyle}>
            <TextField
              {...content}
              floatingLabelText="In Antwort"
              multiLine={true}
              rows={2}
              fullWidth={true}
              floatingLabelStyle={floatingLabel}
              underlineFocusStyle={underlineColor}
            />
          </CardText>
          <CardActions style={actionPadding}>
            <FlatButton label="Stellen Sie die Antwort" linkButton={true}
                   onTouchTap={handleSubmit} hoverColor="#26A65B" />
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
