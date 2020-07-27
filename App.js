import React from "react";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import { View, SafeAreaView, StatusBar } from "react-native";
import CustomCard from "./src/components/Card";
import Deck from "./src/Deck";
import { styles } from "./src/styles/main";
import { DATA } from "./src/deckItems";
const customFonts = {
  Montserrat: require("./assets/fonts/montserrat.ttf"),
};

const App = () => {
  const [isLoaded] = useFonts(customFonts);

  const renderCard = (item) => {
    return <CustomCard item={item} handleReset={handleReset} />;
  };
  const deckElement = React.createRef();
  const handleReset = () => {
    deckElement.current.resetCards();
  };

  if (!isLoaded) {
    return <AppLoading />;
  }
  return (
    <React.Fragment>
      <StatusBar style={{ color: styles.heading.color }} />
      <SafeAreaView backgroundColor={styles.container.backgroundColor} />
      <View style={styles.container}>
        <Deck ref={deckElement} renderCard={renderCard} data={DATA} />
      </View>
    </React.Fragment>
  );
};

export default App;
