import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Deck from "./src/Deck";
import { Card, Button } from "react-native-elements";

const DATA = [
  {
    id: 1,
    text: "Card #1",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg"
  },
  {
    id: 2,
    text: "Card #2",
    uri: "http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg"
  },
  {
    id: 3,
    text: "Card #3",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg"
  },
  {
    id: 4,
    text: "Card #4",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg"
  },
  {
    id: 5,
    text: "Card #5",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg"
  },
  {
    id: 6,
    text: "Card #6",
    uri: "http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg"
  },
  {
    id: 7,
    text: "Card #7",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg"
  },
  {
    id: 8,
    text: "Card #8",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg"
  }
];

export default class App extends Component {
  renderCard = item => {
    return (
      <View>
        <Card key={item.id} title={item.title} image={{ uri: item.uri }}>
          <Text> Customizable Text {item.id} </Text>
          <Button
            icon={{ name: "code" }}
            backgroundColor="#03A9F4"
            title="View Now"
          />
        </Card>
      </View>
    );
  };

  renderNoMoreCards = () => {
    return (
      <Card title="No Data to show">
        <Text> There are no more members to show </Text>
        <Button
          icon={{ name: "code" }}
          backgroundColor="#03A9F4"
          title="Try later"
        />
      </Card>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Deck
          renderNoMoreCards={this.renderNoMoreCards}
          renderCard={this.renderCard}
          data={DATA}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#A8F1D1",
    flex: 1
  }
});
