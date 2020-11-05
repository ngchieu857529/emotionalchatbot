import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';

import { dialogflowConfig } from './env';
import { ModeContext } from './ModeContext';

class ChatScreen extends Component {
    state = {
        messages: [
        {
            _id: 1,
            text: `Hello! I am here to assist you and make your day better. \n\nHow are you doing?`,
            createdAt: new Date(),
            user: BOT_USER
        }
        ]
    };

    componentDidMount() {
        Dialogflow_V2.setConfiguration(
        dialogflowConfig.client_email,
        dialogflowConfig.private_key,
        Dialogflow_V2.LANG_ENGLISH_US,
        dialogflowConfig.project_id
    );
    }

    handleGoogleResponse(result) {
        let text = result.queryResult.fulfillmentMessages[0].text.text[0];
        this.sendBotResponse(text);
    }

    sendBotResponse(text) {
        let msg = {
        _id: this.state.messages.length + 1,
        text,
        createdAt: new Date(),
        user: BOT_USER
        };

        this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, [msg])
        }));
    }

    onSend(messages = []) {
        this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages)
        }));

        let message = messages[0].text;
        Dialogflow_V2.requestQuery(
        message,
        result => this.handleGoogleResponse(result),
        error => console.log(error)
        );
    }

    render() {
        return (
        <View style={styles.mainContainer}>
            <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
                _id: 1
            }}
            />
        </View>
        );
    }
}

ChatScreen.contextType = ModeContext;

const BOT_USER = {
    _id: 2,
    name: 'Chat Bot',
    avatar: 'https://i.imgur.com/7k12EPD.png'
};
  
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mode: {
        color: 'red',
    }
})

export default ChatScreen;