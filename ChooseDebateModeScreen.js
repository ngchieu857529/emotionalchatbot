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
                <Image source={require('./public/img/US_Flag.jpg')} style={styles.backgroundImage}/>
                <Text style={styles.headerText}>Choose a mode to continue the debate!</Text>
                <View style={styles.userVBotButton}>
                    <Button
                        title="User vs. Bot"
                        onPress={() =>
                            this.updateModeDebateOne()
                        }
                    />
                </View>
				<View style={styles.botVBotButton}>
                    <Button
                        title="Bot vs. Bot"
                        onPress={() =>
                            this.updateModeDebateTwo()
                        }
                    />
                </View>
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
		opacity: 1,
    },
    headerText: {
        color: "white",
        fontSize: 30
    },
    userVBotButton: {
        width: "65%",
        height: "10%",
        backgroundColor: "blue"
    },
    botVBotButton: {
        width: "65%",
        height: "10%",
        backgroundColor: "red"
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
		position: "absolute",
		top: 0,
		left:0,
		bottom:0,
        right:0,
        opacity: 0.5,
    }
})

export default ChooseDebateModeScreen;