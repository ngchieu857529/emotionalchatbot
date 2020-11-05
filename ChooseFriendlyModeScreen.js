import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import { ModeContext } from './ModeContext';

class ChooseFriendlyModeScreen extends Component {
    updateModeFriendlyOne() {
        this.context.updateMode("Friendly One");
        this.props.navigation.navigate('Chat')
    }

    updateModeFriendlyTwo() {
        this.context.updateMode("Friendly Two");
        this.props.navigation.navigate('Chat')
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text>Choose a mode to continue!</Text>
                <Button
                    title="User vs. Bot"
                    onPress={() =>
                        this.updateModeFriendlyOne()
                    }
                />
                <Button
                    title="Bot vs. Bot"
                    onPress={() =>
                        this.updateModeFriendlyTwo()
                    }
                />
            </View>
        );
    }
}

ChooseFriendlyModeScreen.contextType = ModeContext;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default ChooseFriendlyModeScreen;