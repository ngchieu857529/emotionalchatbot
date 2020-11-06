import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground} from 'react-native';

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
                <Image source={require('./public/img/US_Flag.jpg')} style={styles.bg}/>
                <Text>Choose a mode to continue the debate!</Text>
                <Button style={styles.mainButton}
                    title="User vs Bot"
                    onPress={() =>
                        this.updateModeDebateOne()
                    }
					color = 'blue'
                    
                />
				<View style={{height: 10}}></View>
                <Button
                    title="2 Bots Fighting!"
                    onPress={() =>
                        this.updateModeDebateTwo()
                    }
					
					color = "darkred"
					size = "100"
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
		opacity: 1,
    },
    mainButton: {
        margin: 100,
		opacity: 0.7,
		color:'red',
		backgroundColor: 'red'
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.5,
    },
	bg: {
		width: '100%',
        height: '100%',
		position: "absolute",
		top: 0,
		left:0,
		bottom:0,
		right:0, opacity: 0.5
	}
})

export default ChooseDebateModeScreen;