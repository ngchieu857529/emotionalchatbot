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
                <View style={[{ width: "65%", margin: 10}]}>
                    <Button
                        title="User vs. Bot"
                        onPress={() =>
                            this.updateModeDebateOne()
                        }
                        color="#3C3B6E"
                    />
                </View>
				<View style={[{ width: "65%", margin: 10}]}>
                    <Button
                        title="Bot vs. Bot"
                        onPress={() =>
                            this.updateModeDebateTwo()
                        }
                        color="#B22234"
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
        color: "skyblue",
        fontSize: 30,
		backgroundColor: 'white',
		marginBottom: 50,
		borderStyle: "solid",
		borderColor: 'skyblue',
		borderWidth: 1,
        textAlign: 'center',
		borderRadius: 5,
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