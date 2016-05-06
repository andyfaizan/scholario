import React, { PropTypes }  from 'react'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import AutoComplete from 'material-ui/lib/auto-complete'
import classes from './DashboardTitleComponent.scss'


type Props = {
	title: string,
	whichFilter: string
};

export class DashboardTitleComponent extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    whichFilter: PropTypes.string.isRequired
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

    var floatingLabelTextState = 'Search Your Courses';

    return (
      <div>
      
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

