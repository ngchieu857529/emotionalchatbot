import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import { ModeContext } from './ModeContext';

class ModeScreen extends Component {
    render() {
        return (
            <View style={styles.mainContainer}>
                <ImageBackground source={require('./public/img/welcome.gif')} style={styles.backgroundImage}/>
                <Text>Get started by selecting the mode of the chat bot!</Text>
                <Button
                    title="Friendly Mode"
                    onPress={() =>
                        this.props.navigation.navigate('ChooseFriendlyMode')
                    }
                    style={styles.button}
                />
                <Button
                    title="Critical Mode"
                    onPress={() =>
                        this.props.navigation.navigate('ChooseDebateMode')
                    }
                    style={styles.button}
                />
            </View>
        );
    }
}

ModeScreen.contextType = ModeContext;

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

export default ModeScreen;