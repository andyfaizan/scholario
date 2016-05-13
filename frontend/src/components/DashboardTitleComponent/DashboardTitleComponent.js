import React, { PropTypes }  from 'react'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import AutoComplete from 'material-ui/lib/auto-complete'
import classes from './DashboardTitleComponent.scss'
import AddCircle from 'material-ui/lib/svg-icons/content/add'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ModalRoot from '../../containers/ModalRoot' 

export class DashboardTitleComponent extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    whichFilter: PropTypes.string.isRequired,
    openModal: PropTypes.Function,
    modal: PropTypes.Object,
    course_modal: PropTypes.string
  };

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
    ];

    const style = {
      backgroundColor:'#E74C3C' 
    }

    var floatingLabelTextState = 'Search Your Courses';

    return (
      <div>
            <div className={classes.addCourseAction}>
              <FloatingActionButton onTouchTap={this.props.openModal} backgroundColor='#E74C3C' primary={false}>
                <AddCircle  color="white" />
              </FloatingActionButton>
              {this.props.modal.visible ? <ModalRoot {...this.props.course_modal} /> : null}
            </div>
      	    <div className={classes.divSearchField}>
		   	      <AutoComplete 
              floatingLabelText= {floatingLabelTextState}
              filter={AutoComplete.caseInsensitiveFilter}
              dataSource={filterDataSource}
              style={classes.autoComplete}
              />
            </div>
      </div>
    )
  }
}

export default DashboardTitleComponent

