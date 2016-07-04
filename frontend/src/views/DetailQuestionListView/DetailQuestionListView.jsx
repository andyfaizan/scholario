import React, { PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import * as selectors from '../../redux/selectors'
import { getCourseInstance, setCurCourseInstance } from '../../redux/modules/course-instance'
import { getQuestions, voteQuestion } from '../../redux/modules/question'
import DashboardToolBar from '../../containers/DashboardToolBar'
import CourseInfoBar from '../../components/CourseInfoBar/CourseInfoBar'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import QuestionToolBar from '../../components/QuestionToolBar/QuestionToolBar'
import QuestionListInDetailsView from '../../components/QuestionListInDetailsView/QuestionListInDetailsView'
import FooterLanding from '../../components/FooterLanding/FooterLanding'

const propTypes = {
  params: PropTypes.object,
  dispatch: PropTypes.func,
  courseInstance: PropTypes.object,
  curCourseInstanceId: PropTypes.string,
  questions: PropTypes.array,
}

export class DetailQuestionList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      didGetCourseInstance: false,
    }
  }

  componentDidMount() {
    const cid = this.props.params.id
    if (!this.props.curCourseInstanceId) {
      this.props.dispatch(setCurCourseInstance(cid))
      this.props.dispatch(getCourseInstance(cid))
    }
    this.props.dispatch(getQuestions(cid))
  }

  render() {
    const styles = getStyles()

    const { courseInstance, questions } = this.props

    const questionEls = questions.map(q =>
      <div>
        <QuestionListInDetailsView
          key={q._id}
          questionId={q._id}
          questionStatement={q.title}
          listItemClickable={false}
          datePosted={q.createDate}
          questionURL={`/question/${q._id}`}
          currentLikes={q.votes.length}
          onClickVote={(qid) => this.props.dispatch(voteQuestion(qid))}
        />
        <br />
      </div>
    )
    return (
      <div>
        <div style={styles.dashboardRoot}>
          <DashboardToolBar />
          <CourseInfoBar
            courseTitle={courseInstance.course ? courseInstance.course.name : ''}
            courseUrl={`/course/${courseInstance._id}`}
            semesterInstance={
              courseInstance.semester ? `${courseInstance.semester.term} ${courseInstance.semester.year}` : ''
            }
            teachersName={courseInstance.prof ? `${courseInstance.prof.firstname} ${courseInstance.prof.lastname}` : ''}
            shortInformation={courseInstance.description}
            participantsNum={courseInstance.participantsNum}
          />
          <Grid>
            <br />
            <Row>
              <Col xs={24} md={12}>
                <QuestionToolBar />
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col xs={24} md={12}>
                {questionEls}
              </Col>
            </Row>
          </Grid>
        </div>
        <div style={styles.footer}>
          <FooterLanding />
        </div>
      </div>
    )
  }
}

function getStyles() {
  return {
    dashboardRoot: {
      backgroundColor: '#FBF6EC',
      minHeight: '100vh',
    },
    footer: {
      fontSize: '20px',
      backgroundColor: 'white',
      color: 'darkslategray',
      height: '10%',
    },
  }
}

DetailQuestionList.propTypes = propTypes

const mapStateToProps = (state) => ({
  courseInstance: selectors.getCurCourseInstance(state),
  curCourseInstanceId: selectors.getCurCourseInstanceId(state),
  questions: selectors.getCurQuestionsFactory('courseInstance', 'date', 10)(state),
})

export default connect(
  mapStateToProps
)(Radium(DetailQuestionList))
