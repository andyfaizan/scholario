import React, { PropTypes }  from 'react'
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import AutoComplete from 'material-ui/AutoComplete';
import classes from './DashboardTitleComponent.scss'
import AddCircle from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ModalRoot from '../../containers/ModalRoot'

export class DashboardTitleComponent extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    whichFilter: PropTypes.string.isRequired,
    openModal: PropTypes.func,
    modal: PropTypes.object,
    course_modal: PropTypes.string
  }

  render () {

    const filterDataSource = [
      'Red',
      'Orange',
      'Yellow',
      'Green',
      'Blue',
      'Purple',
      'Black',
      'White',
    ]

    const style = {
      backgroundColor:'#E74C3C',
    }

    var floatingLabelTextState = 'Search Your Courses'
    const studentRole = 'Student'
    const teacherRole = 'Prof'
    var addCourse

    if (this.props.role === teacherRole) {
      addCourse =
        <div className={classes.addCourseAction}>
          <FloatingActionButton onTouchTap={this.props.openModal} backgroundColor='#E74C3C' primary={false}>
            <AddCircle  color="white" />
          </FloatingActionButton>
          {this.props.modal.visible ? <ModalRoot {...this.props.course_modal} /> : null}
        </div>
    }

    return (
      <div>
      <Card>
          {/*<div className={classes.divSearchField}>
            <AutoComplete
            floatingLabelText= {floatingLabelTextState}
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={filterDataSource}
            //style={classes.autoComplete}
            />
          </div>*/}
                    {addCourse}

        </Card>
      </div>
    )
  }
}

export default DashboardTitleComponent
