import { StyleSheet, Dimensions, Platform } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const COLORS = {
  HEADING_FONT_SIZE: 25,
  DESCRIPTION_FONT_SIZE: 17,
  FONT: "#1d1b50",
  BACKGROUND: "#FFF",
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
    alignContent: "center",
    flex: 1,
  },
  deckContainer: {
    ...applyBorder("yellow", 4),
    flex: 1,
    maxHeight: SCREEN_HEIGHT,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  deckStyle: {
    position: "absolute",
    width: SCREEN_WIDTH,
  },
  linearGradient: {
    width: "100%",
    height: "100%",
    opacity: 0.95,
  },
  card: {
    ...shadow,
    flex: 1,

    borderRadius: 10,
    minHeight: 500,
    maxWidth: SCREEN_WIDTH - 30,
  },
  cardContainer: {
    flexDirection: "column",
    flex: 1,
    minHeight: 500,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    height: 120,
    width: 120,
    resizeMode: "center",
  },
  contentView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  heading: {
    marginBottom: 15,
    fontFamily: "Montserrat",
    textAlign: "center",
    fontSize: COLORS.HEADING_FONT_SIZE,
    color: COLORS.FONT,
    fontWeight: "900",
  },
  subHeading: {
    textAlign: "justify",
    fontFamily: "Montserrat",
    color: "#979dac",
    fontSize: COLORS.DESCRIPTION_FONT_SIZE,
  },
  bottomButton: {
    marginVertical: "auto",
  },
});
