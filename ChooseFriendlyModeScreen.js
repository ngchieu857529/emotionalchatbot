import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import { ModeContext } from './ModeContext';

class ChooseFriendlyModeScreen extends Component {
    updateModeFriendlyOne() {
        this.context.updateMode("Friendly One");
        this.props.navigation.navigate('Chat Screen')
    }

    updateModeFriendlyTwo() {
        this.context.updateMode("Friendly Two");
        this.props.navigation.navigate('Chat Screen')
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Image source={require('./public/img/friendly.jpg')} style={styles.backgroundImage}/>
                <Text style={styles.headerText}>Choose a mode to continue the discussion!</Text>
                <View style={[{ width: "65%", margin: 10}]}>
                    <Button
                        title="User vs. Bot"
                        onPress={() =>
                            this.updateModeFriendlyOne()
                        }
                        color="#3C3B6E"
                    />
                </View>
                <View style={[{ width: "65%", margin: 10}]}>
                    <Button
                        title="Bot vs. Bot"
                        onPress={() =>
                            this.updateModeFriendlyTwo()
                        }
                        color="green"
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
        color: "skyblue",
        fontSize: 30,
		backgroundColor: 'white',
		marginBottom: 50,
		borderStyle: "solid",
		borderColor: 'skyblue',
		borderWidth: 1,
        textAlign: 'center',
        borderRadius: 5,
        padding: 5,
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