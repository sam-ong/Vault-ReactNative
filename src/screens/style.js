import {StyleSheet} from 'react-native';
import { fonts } from "../utils/fonts";

export default {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  segment: {
    paddingVertical: 6,
    paddingBottom: 110,
  },
  text: {
    fontSize: 100
  },
  textInput: {
    height: 50,
    fontSize:20,
    width: '80%',
    borderColor: '#B3B3B3',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 20,
    fontFamily: fonts.AvenirRegular,
    color: '#3D3D3D'
  },
  imageThumbnail: {
    margin: 8,
    height: 270,
    width: 160,
    borderRadius: 4
  },
  grid: {
    marginTop: 10,
    marginBottom: 60,
  },
}
