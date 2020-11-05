import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import { ModeContext } from './ModeContext';

class ChooseDebateModeScreen extends Component {
    updateModeDebateOne() {
        this.context.updateMode("Debate One"),
        this.props.navigation.navigate('Chat')
    }

    updateModeDebateTwo() {
        this.context.updateMode("Debate Two"),
        this.props.navigation.navigate('Chat')
    }

    updateModeDebateThree() {
        this.context.updateMode("Debate Three"),
        this.props.navigation.navigate('Chat')
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text>Choose a mode to continue the debate!</Text>
                <Button
                    title="Biden Supporter"
                    onPress={() =>
                        this.updateModeDebateOne()
                    }
                />
                <Button
                    title="Trump Supporter"
                    onPress={() =>
                        this.updateModeDebateTwo()
                    }
                />
                <Button
                    title="2 Bots Fighting!"
                    onPress={() =>
                        this.updateModeDebateThree()
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