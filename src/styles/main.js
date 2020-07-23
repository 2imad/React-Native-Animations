import { StyleSheet, Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const COLORS = {
  HEADING_FONT_SIZE: 25,
  DESCRIPTION_FONT_SIZE: 17,
  FONT: "#1d1b50",
  BACKGROUND: "#294c60",
};

const applyBorder = (color, width) => {
  return {
    borderColor: color,
    borderWidth: width,
  };
};

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.29,
  shadowRadius: 4.65,
  elevation: 7,
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND,
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  card: {
    ...shadow,
    flex: 1,
    minHeight: SCREEN_HEIGHT - 50,
    borderRadius: 10,
    maxWidth: SCREEN_WIDTH,
  },
  cardContainer: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: "center",
  },
  contentView: {
    flex: 2,
    marginVertical: "auto",
  },
  content: {
    paddingTop: 7,
    paddingHorizontal: 7,
    paddingBottom: 20,
    marginBottom: 17,
    marginTop: 10,
    flex: 1,
  },
  heading: {
    fontFamily: "Montserrat",
    textAlign: "center",
    fontSize: COLORS.HEADING_FONT_SIZE,
    color: COLORS.FONT,
    fontWeight: "900",
    marginBottom: 15,
  },
  subHeading: {
    textAlign: "justify",
    fontFamily: "Montserrat",
    flexShrink: 1,
    color: "#979dac",
    lineHeight: 24,
    fontSize: COLORS.DESCRIPTION_FONT_SIZE,
  },
  bottomButton: {},
});
