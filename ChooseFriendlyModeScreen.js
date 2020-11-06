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
                <Image source={require('./public/img/welcome.gif')} style={styles.backgroundImage}/>
                <Text style={styles.headerText}>Choose a mode to continue!</Text>
                <View style={styles.userVBotButton}>
                    <Button
                        title="User vs. Bot"
                        onPress={() =>
                            this.updateModeFriendlyOne()
                        }
                    />
                </View>
                <View style={styles.botVBotButton}>
                    <Button
                        title="Bot vs. Bot"
                        onPress={() =>
                            this.updateModeFriendlyTwo()
                        }
                    />
                </View>
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
    },
    headerText: {
        color: "white",
        fontSize: "30px"
    },
    userVBotButton: {
        width: "65%",
        height: "10%",
        backgroundColor: "blue"
    },
    botVBotButton: {
        width: "65%",
        height: "10%",
        backgroundColor: "green"
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

export default ChooseFriendlyModeScreen;