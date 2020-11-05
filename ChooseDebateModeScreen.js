import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import { ModeContext } from './ModeContext';

class ChooseDebateModeScreen extends Component {
  render() {
    return (
        <View style={styles.mainContainer}>
            <Text>Choose a mode to continue the debate!</Text>
            <Button
                title="Biden Supporter"
                onPress={() =>
                    this.props.navigation.navigate('Chat')
                }
            />
            <Button
                title="Trump Supporter"
                onPress={() =>
                    this.props.navigation.navigate('Chat')
                }
            />
            <Button
                title="2 Bots Fighting!"
                onPress={() =>
                    this.props.navigation.navigate('Chat')
                }
            />
        </View>
    );
  }
}

ChooseDebateModeScreen.contextType = ModeContext;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default ChooseDebateModeScreen;