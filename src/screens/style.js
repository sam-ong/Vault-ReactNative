import { fonts } from "../utils/fonts";

export default {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA'
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
  imageThumbnailSwipe: {
    margin: 8,
    height: 400,
    width: 300,
    borderRadius: 4,
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
      fontWeight: '900',
      color: "white",
      fontSize: 20,
      letterSpacing: 3,
  },
  errorMessage: {
    color: "#f53b57",
    fontFamily: fonts.AvenirHeavy,
    paddingHorizontal: 30,
    paddingBottom: 20,
    textAlign: 'center',
  },
  successMessage: {
    color: "#51cfb1",
    fontFamily: fonts.AvenirHeavy,
    paddingHorizontal: 30,
  },
  aboutText: {
    textAlign: 'center',
    fontFamily: fonts.AvenirRegular,
    color: '#6B6B6B',
    paddingHorizontal: 30,
    fontSize: 20,
    lineHeight: 30,
  }
}
