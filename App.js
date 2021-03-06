import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ModeContext } from './ModeContext';

import ModeScreen from './ModeScreen';
import ChatScreen from './ChatScreen';
import ChooseDebateModeScreen from './ChooseDebateModeScreen'
import ChooseFriendlyModeScreen from './ChooseFriendlyModeScreen'

const Stack = createStackNavigator();
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMode: "Default",
    }
  }

  updateMode = (mode) => {
    this.setState({
      currentMode: mode,
    })
  }

  render() {
    return (
      <ModeContext.Provider
        value={
          {
            currentMode: this.state.currentMode,
            updateMode: this.updateMode,
          }
        }
      >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home Screen"
              component={ModeScreen}
            />
            <Stack.Screen
              name="Choose a Friendly Mode"
              component={ChooseFriendlyModeScreen}
            />
            <Stack.Screen
              name="Choose a Critical Mode"
              component={ChooseDebateModeScreen}
            />
            <Stack.Screen
              name="Chat Screen"
              component={ChatScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ModeContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default App;