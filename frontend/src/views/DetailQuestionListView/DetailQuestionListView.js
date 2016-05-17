import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import DashboardToolBar from '../../containers/DashboardToolBar'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import QuestionToolBar from '../../components/QuestionToolBar/QuestionToolBar'
import QuestionListInDetailsView from '../../components/QuestionListInDetailsView/QuestionListInDetailsView'


type Props = {

};

export class DetailQuestionList extends React.Component {
  props: Props;

  render () {
    return (
      <div>
      	  <DashboardToolBar />
		      	<Grid>
		      		<br/>
		      		<Row>
		      			<Col xs={24} md={12}>
		      				<QuestionToolBar />
		      			</Col>
		      		</Row>
		      		<br/>
		      		<br/>
		      		<Row>
		      			<Col xs={24} md={12}>
		      				<QuestionListInDetailsView />
		      			</Col>
		      		</Row>
		      	</Grid>
      </div>
    )
  }
}

export default DetailQuestionList