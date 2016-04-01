import React from 'react'
import NavBarLandingPage from '../../components/NavBarLandingPage/NavBarLandingPage'
import classes from './LandingView.scss'
import Divider from 'material-ui/lib/divider'
import Paper from 'material-ui/lib/paper'

type Props = {

};
export class LandingView extends React.Component {
  props: Props;
  render () {
    const style = {
      height: '100',
      width: '100',
      margin: '20',
      textAlign: 'center',
      display: 'inline-block'
    }
    return (
      <div className={classes.landing}>
        <div className='navBar'>
          <NavBarLandingPage />
        </div>
        <div className={classes.container}>
          <Paper style={style} zDepth={3} circle={1} />
        </div>
        <div className={classes.footer}>
          <div className={classes.mainfoot}>
            <Divider />
          </div>
          <div className={classes.endNote}>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingView
