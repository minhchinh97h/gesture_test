import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, Easing } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler'

export default class App extends React.Component {

  old_translationY = 0

  _onGestureEvent = Animated.event([
    {
      nativeEvent: {
        // translationY: this.state._translationY
      },

    }
  ],
    {listener: ({nativeEvent}) => {
      this._record_height -= nativeEvent.translationY - this.old_translationY
      this.old_translationY = nativeEvent.translationY
      this._height.setValue(this._record_height)
    }}
  )

  _height = new Animated.Value(500)
  _record_height = 500

  _onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      this.old_translationY = 0
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          opacity: 0.5,
          position: "relative"
        }}
      >
        <Animated.View
          style={{
            position: "absolute",
            height: this._height,
            width: Dimensions.get("window").width,
            bottom: 0,
            backgroundColor: "white",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
        >
          <PanGestureHandler
            onGestureEvent={this._onGestureEvent}
            onHandlerStateChange={this._onHandlerStateChange}
          >
            <View
              style={{
                height: 50,
                width: Dimensions.get("window").width,
                backgroundColor: "red",
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}
            >
            </View>
          </PanGestureHandler>
        </Animated.View>

      </View >
    )
  }
}
