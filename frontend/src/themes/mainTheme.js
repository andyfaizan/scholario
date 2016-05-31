import Colors from 'material-ui/styles/colors';
import ColorManipulator from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';
import zIndex from 'material-ui/styles/zIndex';

export default {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color:  "#26A65B",
    primary2Color: "#22A7F0",
    primary3Color: "#EF4836",
    accent1Color:  "ffffff",
    accent2Color:  "#EF4836",
    accent3Color:  "#26A65B",
    textColor:  "#ffffff",
    alternateTextColor:  "#1690DB",
    canvasColor:  "#1690DB",
    borderColor:  "#ffffff",
    //disabledColor: ColorManipulator.fade( "#1690DB", 0.3),
    pickerHeaderColor:  "#1690DB",
  },
  card: {
      //titleColor: ColorManipulator.fade( "#ffffff", 0.8),
      subtitleColor:"#000000"
  }
};
