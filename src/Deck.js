import React, { Component } from "react";
import { View, Animated, PanResponder, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_TRESHOLD = 0.25 * SCREEN_WIDTH;

class Deck extends Component {
  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        const { dx, dy } = gesture;
        position.setValue({ x: dx, y: dy });
      },
      onPanResponderRelease: (event, gesture) => {
        const { dx } = gesture;
        if (dx > SWIPE_TRESHOLD) {
          console.log("Swipped Right");
        } else if (dx < -SWIPE_TRESHOLD) {
          console.log("Swipped Left");
        } else {
          this.resetPosition();
        }
      }
    });
    this.state = { panResponder, position };
  }

  resetPosition = () => {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  };

  // unpure
  getCardStyle = () => {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.7, 0, SCREEN_WIDTH * 1.7],
      outputRange: ["-120deg", "0deg", "120deg"]
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  };

  // pure
  getCardStyle = (pos, input, output, animation) => {
    const rotate = pos.x.interpolate({
      inputRange: [...input],
      outputRange: [...output]
    });
    return { ...pos.getLayout(), [animation]: [{ rotate }] };
  };

  renderCards() {
    return this.props.data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View
            key={item.id}
            style={this.getCardStyle(
              this.state.position,
              [-SCREEN_WIDTH * 1.7, 0, SCREEN_WIDTH * 1.7],
              ["-120deg", "0deg", "120deg"],
              "transform"
            )}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }
      return this.props.renderCard(item);
    });
  }
  render() {
    return <View>{this.renderCards()}</View>;
  }
}

export default Deck;
