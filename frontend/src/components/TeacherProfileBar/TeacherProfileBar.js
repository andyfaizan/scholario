import React, { PropTypes } from 'react'
import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardTitle from 'material-ui/Card/CardTitle';
import FlatButton from 'material-ui/FlatButton';
import CardText from 'material-ui/Card/CardText';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import ActionHome from 'material-ui/svg-icons/action/home';
import Avatar from 'material-ui/Avatar';
import classes from './TeacherProfileBar.scss'
import TextField from 'material-ui/TextField';
import ChangePasswordForm from '../../forms/ChangePasswordForm/ChangePasswordForm'

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
      bio: PropTypes.string,
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
    var shortInformation = this.props.bio;

    //Card Action variables for HREF
    var facebookUrl = '#' ;
    var twitterUrl = '#' ;
    var mediumUrl = '#' ;
    var instagramUrl = '#' ;
    var filterArray = [] ;

    var nameInitial = ''
    if (this.props.firstNameUser)
      nameInitial = this.props.firstNameUser[0]

    const floatingLabel = {

      color:'#26A65B'
    }

    const underlineColor = {

      borderColor:'#446CB3'
    }

    return (
      <div>
        <Card>
          <CardHeader
            title={cardTitle}
            subtitle={cardSubtitle}
            avatar={<Avatar backgroundColor='#446CB3'>{nameInitial}</Avatar>}
            actAsExpander={true}
            showExpandableButton={true}
            titleColor="#26A65B"
          >
          </CardHeader>
          <Divider />
          <CardText expandable={true}>
            {/*shortInformation*/}
            <ChangePasswordForm
              onSubmit={this.props.onChangePassword}
            />
          </CardText>
          <CardActions  expandable={true} >
          {/*
            <FlatButton label="Facebook" linkButton={true} href={facebookUrl} hoverColor="#26A65B" icon={<ActionHome color="#26A65B" />} />
            <FlatButton label="Twitter" linkButton={true} href={twitterUrl}   hoverColor="#26A65B"  icon={<ActionHome color="#26A65B" />} />
            <FlatButton label="Medium" linkButton={true} href={mediumUrl}  hoverColor="#26A65B" icon={<ActionHome  color="#26A65B" />} />
            <FlatButton label="Instagram" linkButton={true} hoverColor="#26A65B" href={instagramUrl}  icon={<ActionHome  color="#26A65B"/>} />
            */}
          </CardActions>
        </Card>

      </div>
    )
  }
}

export default TeacherProfileBar

