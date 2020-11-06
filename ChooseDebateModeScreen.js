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

    render() {
        return (
            <View style={styles.mainContainer}>
                <ImageBackground source={require('./public/img/US_Flag.jpg')} style={styles.backgroundImage}/>
                <Text>Choose a mode to continue the debate!</Text>
                <Button
                    title="User vs Bot"
                    onPress={() =>
                        this.updateModeDebateOne()
                    }
                    style={styles.button}
                />
                <Button
                    title="2 Bots Fighting!"
                    onPress={() =>
                        this.updateModeDebateTwo()
                    }
                    style={styles.button}
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
    },
    button: {
        margin: 20
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.5,
    }
})

export default ChooseDebateModeScreen;