import React, { PropTypes } from 'react'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardHeader from 'material-ui/lib/card/card-header'
import CardTitle from 'material-ui/lib/card/card-title'
import FlatButton from 'material-ui/lib/flat-button'
import CardText from 'material-ui/lib/card/card-text'
import Divider from 'material-ui/lib/divider'
import FontIcon from 'material-ui/lib/font-icon'
import ActionHome from 'material-ui/lib/svg-icons/action/home'

type Props = {

  firstNameUser: string,
  lastNameUser: string,
  universityName: string,
  programmeName:number,
  imageUrl: string,
  shortInformation: string,
  facebookUrl: string,
  twitterUrl: string,
  instagramUrl: string,
  mediumUrl: string,
  filterArray: array
};

export class TeacherProfileBar extends React.Component {
  static propTypes = {
      firstNameUser: PropTypes.string.isRequired,
      lastNameUser: PropTypes.string.isRequired,
      universityName: PropTypes.string.isRequired,
      programeName: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
      shortInformation: PropTypes.string,
      facebookUrl: PropTypes.string,
      twitterUrl: PropTypes.string,
      instagramUrl: PropTypes.string,
      mediumUrl: PropTypes.string,
      filterArray: PropTypes.array
    };

  render () {

    //Card Header Title Variables
    //var firstNameUser = 'Prof Jan ' ;
    //var lastNameUser = 'Brochers' ;
    var cardTitle = `${this.props.firstNameUser}  ${this.props.lastNameUser}`;

    //Card Header Subtitle Variables
    //var universityName = 'RWTH Aachen' ;
    //var programeName = 'Media Informatics' ;
    var cardSubtitle = this.props.universityName + '( ' + this.props.programeName + ' )' ;

    //Url for image icon 
    var imageIcon = '' ;

    //Variable for Card Text -> Little Bit Bio about the user
    var shortInformation = 'I am a Professor at Computer Science Department in RWTH Aachen.I am the Chair and founding person of the i9 Media Computing group. I am Human Computer Interaction Maestro.I am a Professor at Computer Science Department in RWTH Aachen.I am the Chair and founding person of the i9 Media Computing group. I am Human Computer Interaction Maestro.I am a Professor at Computer Science Department in RWTH Aachen.I am the Chair and founding person of the i9 Media Computing group. I am Human Computer Interaction Maestro.I am a Professor at Computer Science Department in RWTH Aachen.I am the Chair and founding person of the i9 Media Computing group. I am Human Computer Interaction Maestro.';

    //Card Action variables for HREF
    var facebookUrl = '#' ;
    var twitterUrl = '#' ;
    var mediumUrl = '#' ;
    var instagramUrl = '#' ;
    var filterArray = [] ;

    return (
      <div>
        <Card>
          <CardHeader
            title={cardTitle}
            subtitle={cardSubtitle}
            avatar="http://lorempixel.com/100/100/nature/"
            actAsExpander={true}
            showExpandableButton={true}
          >
          </CardHeader>
          <Divider />
          <CardText expandable={true}>
            {shortInformation}
          </CardText>
          <CardActions expandable={true} >
            <FlatButton label="Facebook" linkButton={true} href={facebookUrl}  icon={<ActionHome />} />
            <FlatButton label="Twitter" linkButton={true} href={twitterUrl}  icon={<ActionHome />} />
            <FlatButton label="Medium" linkButton={true} href={mediumUrl}  icon={<ActionHome />} />
            <FlatButton label="Instagram" linkButton={true} href={instagramUrl}  icon={<ActionHome />} />
          </CardActions>
        </Card>

      </div>
    )
  }
}

export default TeacherProfileBar

