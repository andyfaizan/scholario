import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import DashboardToolBar from '../../containers/DashboardToolBar'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import QuestionToolBar from '../../components/QuestionToolBar/QuestionToolBar'
import QuestionListInDetailsView from '../../components/QuestionListInDetailsView/QuestionListInDetailsView'
import * as selectors from '../../redux/selectors'


type Props = {

};

export class DetailQuestionList extends React.Component {
  props: Props;

  render () {
    return (
      <div>
      	  <DashboardToolBar />
		      	<Grid>
		      		<Row>
		      			<br/>
		      			<Col xs={20} md={8}>
		      				<QuestionToolBar />
		      			</Col>
		      			<br/>
		      			<Col xs={20} md={8}>
		      				<QuestionListInDetailsView />
		      			</Col>
		      		</Row>
		      	</Grid>
      </div>
    )
  }
}

export default DetailQuestionList
