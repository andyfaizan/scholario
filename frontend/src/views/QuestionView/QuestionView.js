import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as selectors from '../../redux/selectors'
import TeacherProfileBar from '../../components/TeacherProfileBar/TeacherProfileBar'
import DashboardToolBar from '../../containers/DashboardToolBar'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import QuestionItem from '../../components/QuestionItem/QuestionItem'
import QuestionToolBar from '../../components/QuestionToolBar/QuestionToolBar'
import QuestionListInDetailsView from '../../components/QuestionListInDetailsView/QuestionListInDetailsView'
import AnswerItem from '../../components/AnswerItem/AnswerItem'
import Card from 'material-ui/lib/card/card'

type Props = {

};

export class Question extends React.Component {
  props: Props;

  render () {
    return (
      <div>
      	<DashboardToolBar />
        
      	<TeacherProfileBar
          firstNameUser={this.props.user.firstname}
          lastNameUser={this.props.user.lastname}
          universityName={this.props.userUniversity.name}
          programeName={this.props.userProgram.name}
        />
		      	<Grid>
		      		<br/>
		      		<Row>
		      			<Col xs={24} md={12}>
                  <Card>
                    <QuestionItem questionStatement="What is Neuclear Physics ?" datePosted ="Jan 17, 2014"  questionUrl="" />
                  </Card>
                </Col>
		      		</Row>
		      		<br/>
		      		<br/>
		      		<Row>
		      			<Col xs={24} md={12}>
                  <AnswerItem />
		      			</Col>
		      		</Row>
		      	</Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: selectors.getUser(state),
    userUniversity: selectors.getUserUniversity(state),
    userProgram: selectors.getUserProgram(state),
    questions: selectors.getUserQuestions(state),
    connects: selectors.getUserFollowings(state),
  }
}

export default connect(
  mapStateToProps
  )(Question)

