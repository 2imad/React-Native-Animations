import React, { Component } from "react";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { styles } from "../src/styles/main";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SWIPE_TRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;
const DEGS = {
  MIN: "-120deg",
  N: "0deg",
  MAX: "120deg",
};
const TRANSFORM = "transform";

class Deck extends Component {
  /**
   * Load a map of custom fonts to use in textual elements.
   * The map keys are used as font names, and can be used with `fontFamily: <name>;`.
   * It returns a boolean describing if all fonts are loaded.
   *
   * Note, the fonts are not "reloaded" when you dynamically change the font map.
   *
   * @see https://docs.expo.io/versions/latest/sdk/font/
   * @example const [isLoaded] = useFonts(...);
   */
  static defaultProps = {
    onSwipeLeft: () => {},
    onSwipeRight: () => {},
  };
  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        const { dx, dy } = gesture;
        position.setValue({ x: dx, y: dy });
      },
      onPanResponderRelease: (_, gesture) => {
        const { position } = this.state;
        const { dx } = gesture;
        if (dx > SWIPE_TRESHOLD) {
          this.forceSwipe(position, SCREEN_WIDTH, SWIPE_OUT_DURATION);
        } else if (dx < -SWIPE_TRESHOLD) {
          this.forceSwipe(position, -SCREEN_WIDTH, SWIPE_OUT_DURATION);
        } else {
          this.resetPosition(position);
        }
      },
    });
    this.state = { panResponder, position, currentIndex: 0 };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ currentIndex: 0 });
    }
  }
  //------------------------- Animation ---------------------------//
  // unpure code

  resetCards = () => {
    this.setState({ currentIndex: 0 });
  };

  getCardStyle = () => {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.7, 0, SCREEN_WIDTH * 1.7],
      outputRange: [...Object.values(DEGS)],
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };

  onSwipeComplete = (destination) => {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.currentIndex];
    Math.sign(destination) ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({ currentIndex: this.state.currentIndex + 1 });
  };

  // pure code
  getCardStyle = (pos, input, output, animation) => {
    const rotate = pos.x.interpolate({
      inputRange: [...input],
      outputRange: [...output],
    });
    return { ...pos.getLayout(), [animation]: [{ rotate }] };
  };

  forceSwipe = (position, destination, duration) => {
    Animated.timing(position, {
      toValue: { x: destination, y: 0 },
      duration,
    }).start(() => this.onSwipeComplete(destination));
  };

  resetPosition = (position) => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
    }).start();
  };
  // ---------------------------------------------------------------- //

  renderCards() {
    if (this.state.currentIndex >= this.props.data.length) {
      return <View>{this.props.renderCard(null)}</View>;
    }
    return this.props.data
      .map((item, index) => {
        if (index < this.state.currentIndex) {
          return null;
        }
        if (index === this.state.currentIndex) {
          return (
            <Animated.View
              key={item.id}
              style={[
                this.getCardStyle(
                  this.state.position,
                  [-SCREEN_WIDTH * 1.7, 0, SCREEN_WIDTH * 1.7],
                  [...Object.values(DEGS)],
                  TRANSFORM
                ),
                styles.deckStyle,
                {
                  ...zIndexWorkaround(100),
                },
              ]}
              {...this.state.panResponder.panHandlers}
            >
              {this.props.renderCard(item)}
            </Animated.View>
          );
        }
        return (
          <Animated.View
            key={item.id}
            style={[
              styles.deckStyle,
              { top: 20 * (index - this.state.currentIndex) },
            ]}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  render() {
    return (
      <LinearGradient
        colors={["#457b9d", "#1d3557"]}
        start={[0.1, 0.1]}
        style={styles.linearGradient}
      >
        <View style={styles.deckStyle}>{this.renderCards()}</View>
      </LinearGradient>
    );
  }
}

zIndexWorkaround = (val) => {
  return Platform.select({
    ios: { zIndex: val },
    android: { elevation: val },
  });
};

export default Deck;
