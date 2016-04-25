import React from 'react'
import { connect } from 'react-redux'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator'
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Divider from 'material-ui/lib/divider'
import FlatButton from 'material-ui/lib/flat-button'
import {show, CREATE_COURSE_MODAL as course_modal} from '../redux/modules/Modal'
import ModalRoot from './ModalRoot'


type Props = {
  modal : Boolean,
  show : Function
};
export class DashboardToolBar extends React.Component {
  props : Props;

  render () {

  const styles = {
      iconStyle: {
        marginTop: '4',
      },
      titleStyle: {
        color: 'white'
      },
      toolbarStyle: {
        backgroundColor: '#1abc9c',
        color:'white'
      },
      buttonStyle: {
        color:'white'
      },
      separator: {
        backgroundColor:'white'
      }
    }

    return (
      <div>
         <Toolbar style={styles.toolbarStyle}>
          <ToolbarGroup float='Right'>
            <ToolbarTitle text='Scholario' style={styles.titleStyle}/>
          </ToolbarGroup>
          <ToolbarGroup float="left">
            <FlatButton style={styles.buttonStyle} label="Courses" onClick={this.props.show}>
            </FlatButton>
            {this.props.modal.visible ? <ModalRoot {...course_modal} /> : null}
            <FlatButton style={styles.buttonStyle} label="Connects">
            </FlatButton>
            <FlatButton style={styles.buttonStyle} label="Feed">
            </FlatButton>
            <ToolbarSeparator style={styles.separator} />
            <IconMenu style={styles.iconStyle}
            iconButtonElement={ <IconButton  touch={true}> <NavigationMenu color='white'  /> </IconButton> } >
                <MenuItem primaryText="User Settings" />
                <MenuItem primaryText="Feed Settings" />
             </IconMenu>
          </ToolbarGroup>
        </Toolbar>
      </div>
    )


}
}

const mapStateToProps = (state) => ({
  modal: state.modal
})
export default connect((mapStateToProps), {
  show: () => show(course_modal)
})(DashboardToolBar)
