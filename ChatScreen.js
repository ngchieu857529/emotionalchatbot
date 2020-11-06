import 'react-native-gesture-handler';
import React, { Component } from 'react';
import axios from 'axios';
import KeyboardListener from 'react-native-keyboard-listener';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';

import { ModeContext } from './ModeContext';
import CustomView from './CustomView'

class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
            {
                _id: 1,
                text: `Hello! I am here to assist you and make your day better. \n\nHow are you doing?`,
                createdAt: new Date(),
                user: BOT_USER
            }
            ],
            returnedData: null,
            hideLoading: true,
            gifPos: -10,
        };
    }

    componentDidMount() {

    }

    sendBotResponse(text) {
        var self = this;
        let msg = {
        _id: this.state.messages.length + 1,
        text,
        createdAt: new Date(),
        user: BOT_USER
        };
        
        setTimeout(function(){
            self.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, [msg])
            }));
            self.setState({
                hideLoading: true,
            });
        }, 3000)
    }

    onSend(messages = []) {
        var self = this;
        const currentMode = this.context.currentMode;
        const friendlyDomain = "816f892908aa";
        const debateDomain = "816f892908aa";

        this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages)
        }));
        
        this.setState({
            hideLoading: false,
        });

        let message = messages[0].text;
        var url = "";
        if (currentMode == "Friendly One") {
            url = "http://" + friendlyDomain + ".ngrok.io/api/v1/chat?msg=" + message
        } else if (currentMode == "Friendly Two") {
            url = "http://" + friendlyDomain + ".ngrok.io/api/v1/autochat?topic=" + message
        } else if (currentMode == "Debate One") {
            url = "http://" + debateDomain + ".ngrok.io/api/v1/chat1?msg=" + message
        } else if (currentMode == "Debate Two") {
            url = "http://" + debateDomain + ".ngrok.io/api/v1/chat2?msg=" + message
        } else { //currentMode == "Debate Three"
            url = "http://" + debateDomain + ".ngrok.io/api/v1/autochat?topic=" + message
        }

        axios.get(url)
            .then(response => {
                console.log(response.data);
                self.setState({
                    returnedData: response.data
                });
                self.sendBotResponse(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
        <View style={styles.mainContainer}>
            <View>
                <KeyboardListener
                    onDidShow={() => { this.setState({ gifPos: -500 }); }}
                    onDidHide={() => { this.setState({ gifPos: -500 }); }}
                />
            </View>
			{console.log(this.state.gifPos)}
            <CustomView hide={this.state.hideLoading}>
                <ImageBackground source={require('./public/img/typing.gif')} style={{width: 50, height: 50, justifyContent: 'center', alignContent: 'center',}}/>
            </CustomView>
            <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            isTyping={true}
            placeholder={"Type a message"}
            timeFormat={'h:mm A'}
            dateFormat={'DD MMM YYYY'}
            loadEarlier={true}
            scrollToBottom={true}
            infiniteScroll={true}
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
    gifView: {
        justifyContent: 'flex-end',
        alignContent: "flex-start",
        // marginBottom: -500,
        width: 100,
        height: 100,
    }
})

export default ChatScreen;