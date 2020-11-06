import 'react-native-gesture-handler';
import React, { Component } from 'react';
import axios from 'axios';
import KeyboardListener from 'react-native-keyboard-listener';
import { StyleSheet, Text, View, ImageBackground, Button, Keyboard } from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';

import { ModeContext } from './ModeContext';
import CustomView from './CustomView';

class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            returnedData: null,
            hideLoading: true,
            gifPos: -10,
            currentImageIndex: 0,
            canSendMessage: true,
			
        };
    }

    componentDidMount() {
        this.changeBotAvatar();
        this.returnBotAvatar();
    }

    changeBotAvatar() {
        const randomNumber = Math.floor(Math.random() * avatars.length);
        this.setState({
            currentImageIndex: randomNumber,
            messages: [
                {
                    _id: 1,
                    text: `Hello! I am here to assist you and make your day better. \n\nHow are you doing?`,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'null',
                        avatar: avatars[randomNumber][2]
                    }
                }
            ],
        });
    }

    returnBotAvatar() {
        return (avatars[this.state.currentImageIndex][2]);
    }

    returnBotName() {
        return (botNames[0])
    }

    sendBotResponse(text) {
        var self = this;
        let msg = {
        _id: this.state.messages.length + 1,
        text,
        createdAt: new Date(),
        user: {
            _id: 2,
            name: this.returnBotName(),
            avatar: 'https://placeimg.com/140/140/any'
        }
        };
        
        setTimeout(function(){
            self.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, [msg])
            }));
            self.setState({
                hideLoading: true,
				canSendMessage: true
            });
        }, 3000)
    }

    handleBotVsBotMode(response) {
        var self = this;
        for (var i = 0; i < response[0].length; i+=2) {
			
            const text1 = response[0][i];
            const text2 = response[0][i+1];
            let msg1 = {
                _id: i+3,
                text: text1,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: this.returnBotName(),
                    avatar: this.returnBotAvatar()
                }
            };
            let msg2 = {
                _id: i+4,
                text: text2,
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: this.returnBotName(),
                    avatar: this.returnBotAvatar()
                }
            };

            //setTimeout(function(){
                self.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, [msg1])
                }));
                self.setState({
                    hideLoading: true,
                    canSendMessage: true,
                });
            //}, 3000)
            //setTimeout(function(){

                self.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, [msg2])
                }));
                self.setState({
                    hideLoading: true,
                    canSendMessage: true,
                });
            //}, 3000)
        }
    }

    onSend(messages = []) {
        var self = this;
        const canSendMessage = this.state.canSendMessage;
        const currentMode = this.context.currentMode;
        const friendlyDomain = "1df454a3372e";
        const debateDomain = "816f892908aa";

        if (canSendMessage == false) {
            alert('Conversation Happening! Cannot send message.')
            return
        }

        this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages)
        }));
        
        this.setState({
            hideLoading: false,
            canSendMessage: false,
        });

        let message = messages[0].text;
        var url = "";
        if (currentMode == "Default") {
            url = ""
        } else if (currentMode == "Friendly One") {
            url = "http://" + friendlyDomain + ".ngrok.io/api/v1/chat?msg=" + message
        } else if (currentMode == "Friendly Two") {
            url = "http://" + friendlyDomain + ".ngrok.io/api/v1/autochat?topic=" + message
            Keyboard.dismiss()
        } else if (currentMode == "Debate One") {
            url = "http://" + debateDomain + ".ngrok.io/api/v1/chat?msg=" + message
        } else { //currentMode == "Debate Two"
            url = "http://" + debateDomain + ".ngrok.io/api/v1/autochat?topic=" + message
            Keyboard.dismiss()
        }

        axios.get(url)
            .then(response => {
                console.log(response.data);
                self.setState({
                    returnedData: response.data
                });
				
                if (currentMode == "Friendly One" || currentMode == "Debate One") {
                    self.sendBotResponse(response.data);
                } else { //BotvsBot Mode
                    self.handleBotVsBotMode(response.data);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const currentMode = this.context.currentMode;

        var backgroundImageUrl = '';
        if (currentMode == "Default") {
            backgroundImageUrl = './public/img/welcome.gif'
        } else if (currentMode == "Friendly One" || currentMode == "Friendly Two") {
            backgroundImageUrl = './public/img/welcome.gif'
        } else { //currentMode == "Debate One/Two"
            backgroundImageUrl = './public/img/US_Flag.jpg'
        }

        return (
        <View style={styles.mainContainer}>
            {/* <View>
                <KeyboardListener
                    onDidShow={() => { this.setState({ gifPos: -500 }); }}
                    onDidHide={() => { this.setState({ gifPos: -500 }); }}
                />
            </View>
            {console.log(this.state.gifPos)}
            <CustomView hide={this.state.hideLoading}>
                <ImageBackground source={require('./public/img/typing.gif')} style={{width: 50, height: 50, justifyContent: 'center', alignContent: 'center',}}/>
            </CustomView> */}
            <ImageBackground source={require('./public/img/welcome.gif')} style={{width: '50%', height: '50%'}}/>
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

const avatars = [
	['John', 'Republican', 'https://github.com/ngchieu857529/emotionalchatbot/blob/chat_bot_v1/public/img/avatar1.JPG?raw=true'],
    ['Andrew', 'Democrat', 'https://github.com/ngchieu857529/emotionalchatbot/blob/chat_bot_v1/public/img/avatar2.JPG?raw=true'],
    ['David', 'Republican', 'https://github.com/ngchieu857529/emotionalchatbot/blob/chat_bot_v1/public/img/avatar3.JPG?raw=true'],
    ['Matthew', 'Democrat', 'https://github.com/ngchieu857529/emotionalchatbot/blob/chat_bot_v1/public/img/avatar4.JPG?raw=true'],
    ['Sarah', 'Republican', 'https://github.com/ngchieu857529/emotionalchatbot/blob/chat_bot_v1/public/img/avatar5.JPG?raw=true'],
    ['Jane', 'Democrat', 'https://github.com/ngchieu857529/emotionalchatbot/blob/chat_bot_v1/public/img/avatar6.JPG?raw=true'],
    ['Rose', 'Republican', 'https://github.com/ngchieu857529/emotionalchatbot/blob/chat_bot_v1/public/img/avatar7.JPG?raw=true'],
    ['Adi', 'Democrat', 'https://github.com/ngchieu857529/emotionalchatbot/blob/chat_bot_v1/public/img/avatar8.JPG?raw=true'],
]

const botNames = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
]

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