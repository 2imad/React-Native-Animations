import React from "react";
import { styles } from "../styles/main";
import { Button, Card } from "react-native-elements";
import { View, Text, Image } from "react-native";

const endCard = require("../../assets/images/end.jpeg");

const CustomCard = ({ item, handleReset }) => {
  if (!item) {
    return (
      <Card containerStyle={styles.card}>
        <View style={styles.cardContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={endCard} />
          </View>
          <View style={styles.contentView}>
            <View style={styles.content}>
              <Text style={styles.heading}>WEB STACK</Text>
              <Text style={styles.subHeading}>
                FULL STACK DEVELOPER is an engineer who works on both
                client-side and server-side software. This type of software
                developer works on the Full Stack of an application meaning
                Front End Technology, Back End Development Languages, Database,
                Server, API, and version Controlling Systems. Hence, the name
                "Full Stack" Developer.
              </Text>
            </View>
            <View style={styles.bottomButton}>
              <Button
                onPress={handleReset}
                raised
                backgroundColor="#03A9F4"
                title="View again"
              />
            </View>
          </View>
        </View>
      </Card>
    );
  }
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={item.path} />
        </View>
        <View style={styles.contentView}>
          <View style={styles.content}>
            <Text style={styles.heading}>{item.heading}</Text>
            <Text style={styles.subHeading}>{item.description} </Text>
          </View>
          <View style={styles.bottomButton}>
            <Button
              raised
              icon={{ name: "code", color: "#fff" }}
              backgroundColor="#03A9F4"
              title="View Now"
            />
          </View>
        </View>
      </View>
    </Card>
  );
};
export default CustomCard;
