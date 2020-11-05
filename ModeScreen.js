import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import { ModeContext } from './ModeContext';

class ModeScreen extends Component {
    render() {
        return (
            <View style={styles.mainContainer}>
                <Text>Get started by selecting the mode of the chat bot!</Text>
                <Button
                    title="Friendly Mode"
                    onPress={() =>
                        this.props.navigation.navigate('ChooseFriendlyMode')
                    }
                />
                <Button
                    title="Debate Mode"
                    onPress={() =>
                        this.props.navigation.navigate('ChooseDebateMode')
                    }
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
    }
})

export default ModeScreen;