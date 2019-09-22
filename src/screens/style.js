import {StyleSheet} from 'react-native';
import { fonts } from "../utils/fonts";

export default {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
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
  missing: {
    fontFamily: fonts.AvenirHeavy,
    color: '#4F4F4F'
  },
  button: {
    paddingVertical: 15,
    backgroundColor: "#51cfb1",
    borderRadius: 50,
    width: '100%',
    marginVertical: 20,
    
  },
  buttonTitle: {
      fontFamily: fonts.AvenirHeavy,
      color: "white",
      fontSize: 20,
      letterSpacing: 4,
  },
  errorMessage: {
    color: "#f53b57",
    fontFamily: fonts.AvenirHeavy,
    paddingHorizontal: 30,
    paddingBottom: 20,

  }
}
