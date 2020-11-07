import 'react-native-gesture-handler';
import React, { Component } from 'react';
import axios from 'axios';
import KeyboardListener from 'react-native-keyboard-listener';
import Tts from 'react-native-tts';
import { StyleSheet, Text, View, Button, Keyboard, Image } from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';

import { ModeContext } from './ModeContext';
import CustomView from './CustomView';

class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            returnedData: null,
            currentImageIndex: 0,
            currentImageTwoIndex: 0,
            count: 1500,
            count2: 3000,
            canSendMessage: true,
            hideLoading: true,
            botHasReset: true,
            friendlyDomain: "http://5b8403d43fb7.ngrok.io", //To be changed everytime the server is reset
            debateDomain: "http://19ffe4d818ac.ngrok.io", //To be changed everytime the server is reset
        };
    }

    componentDidMount() {
        this.initialBotRender();
		Tts.setDefaultRate(0.55);
    }

    getRandomNumber () {
        return Math.floor(Math.random() * botProfiles.length)
    }

    initialBotRender () {
        const randomNumber = this.getRandomNumber();
        var randomNumberTwo = this.getRandomNumber();
        while (randomNumberTwo == randomNumber) {
            randomNumberTwo = this.getRandomNumber();
        }
        const currentMode = this.context.currentMode;

        var welcomeMessage = "";
        if (currentMode == "Friendly One" || currentMode == "Debate One") {
            welcomeMessage = 'Hello, my name is ' + botProfiles[randomNumber][0] + '. I am a Soulful.AI assistant!\n\nI am here to assist you and make your day better. How are you doing?'
        } else { //Bot vs Bot mode
            welcomeMessage = 'Hello, we are ' + botProfiles[randomNumber][0] + ' and ' + botProfiles[randomNumberTwo][0] + '. We are Soulful.AI assistants!\n\nEnter a topic for us to discuss!'
        }

        this.setState({
            currentImageIndex: randomNumber,
            currentImageTwoIndex: randomNumberTwo,
            messages: [
                {
                    _id: 1,
                    text: welcomeMessage,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: botProfiles[randomNumber][0],
                        avatar: botProfiles[randomNumber][2]
                    }
                }
            ],
        });
		
		
    }

    changeBotProfile() {
        const randomNumber = this.getRandomNumber();
        this.setState({
            currentImageIndex: randomNumber,
        });
    }

    changeBotTwoProfile() {
        const randomNumber = this.getRandomNumber();
        this.setState({
            currentImageTwoIndex: randomNumber,
        });
    }

    returnBotAvatar() {
        return (botProfiles[this.state.currentImageIndex][2]);
    }

    returnBotName() {
        return (botProfiles[this.state.currentImageIndex][0]);
    }

    returnBotTwoAvatar() {
        return (botProfiles[this.state.currentImageTwoIndex][2]);
    }

    returnBotTwoName() {
        return (botProfiles[this.state.currentImageTwoIndex][0]);
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
            avatar: this.returnBotAvatar()
        }
        };
        
        setTimeout(function(){
			// self.setState(previousState => ({
			// 	messages: previousState.messages.filter(message => message.id !== self.state.count)
            // }));

            self.setState(previousState => ({
				messages: GiftedChat.append(previousState.messages, [msg])
            }));
            Tts.speak(text);
            self.setState({
                canSendMessage: true,
                hideLoading: true,
                // count: self.state.count+1
            });
            

        }, 3000)
    }

    handleBotVsBotMode(response) {
        var self = this;
        var messageList = [];
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
                    name: this.returnBotTwoName(),
                    avatar: this.returnBotTwoAvatar()
                }
            };
		
            messageList.push(msg1)
            messageList.push(msg2)
        }
        
        messageList.map(function(message, index) {
            self.displayMessage(message);

            // if (messageList[index+1] != null) {
            //     if (count == 0) {
            //         self.displayIsTypingMessage(self.state.count2, self.state.currentImageTwoIndex, 1, self.returnBotTwoName(), self.returnBotTwoAvatar())
            //         count++
            //     } else { //count = 1
            //         self.displayIsTypingMessage(self.state.count, self.state.currentImageIndex, 2, self.returnBotName(), self.returnBotAvatar())
            //         count--
            //     }
            // }
        })
        this.setState({
            canSendMessage: true,
            hideLoading: true,
            botHasReset: false,
        });

        let endingMsg = {
            _id: 1000,
            text: 'This is the end of our conversation. Please click the "Start New Conversation" button above to reset the chat!',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: this.returnBotName(),
                avatar: this.returnBotAvatar()
            }
        };
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, [endingMsg])
        }));
        Tts.speak(endingMsg.text);
    }
	
	displayMessage(message, count) {
        var self = this
		setTimeout(function(){
            // if (count == 0) {
            //     self.setState(previousState => ({
            //         messages: previousState.messages.filter(message => message.id !== self.state.count)
            //     }));
            //     console.log('deleting' + self.state.count)
            //     self.setState({
            //         count: self.state.count++,
            //     })
            // } else { //count = 1
            //     self.setState(previousState => ({
            //         messages: previousState.messages.filter(message => message.id !== self.state.count2)
            //     }));
            //     console.log('deleting' + self.state.count2)

            //     self.setState({
            //         count2:self.state.count2++
            //     })
            // }

			self.setState(previousState => ({
				messages: GiftedChat.append(previousState.messages, [message])
			}));
            Tts.speak(message.text);
		}, 3000)
    }
    
    // displayIsTypingMessage(msg_id, index, user_id, returnNameFunc, returnAvatarFunc) {
    //     let isTypingMsg = {
    //         _id: msg_id,
    //         text: botProfiles[index][0] + ' is typing...',
    //         createdAt: new Date(),
    //         user: {
    //             _id: user_id,
    //             name: returnNameFunc,
    //             avatar: returnAvatarFunc
    //         }
    //     };
    //     this.setState(previousState => ({
    //         messages: GiftedChat.append(previousState.messages, [isTypingMsg])
    //     }));

    // }

    onSend(messages = []) {
        var self = this;
        const canSendMessage = this.state.canSendMessage;
        const botHasReset = this.state.botHasReset;
        const currentMode = this.context.currentMode;
        const friendlyDomain = this.state.friendlyDomain;
        const debateDomain = this.state.debateDomain;

        if (canSendMessage == false) {
            alert('Cannot send message! Server is loading!')
            return
        }
        if (botHasReset == false) {
            alert('Reset needed! You need to reset the conversation to enter a new topic by clicking the "Start New Conversation" button.')
            return
        }
		
        this.setState(previousState => ({
			messages: GiftedChat.append(previousState.messages, messages)
        }));
        
        // this.displayIsTypingMessage(this.state.count, this.state.currentImageIndex, 2, this.returnBotName(), this.returnBotAvatar())
		
        this.setState({
            canSendMessage: false,
            hideLoading: false,
        });

        let message = messages[0].text;
        var url = "";
        if (currentMode == "Default") {
            url = ""
        } else if (currentMode == "Friendly One") {
            url = friendlyDomain + "/api/v1/chat?msg=" + message
        } else if (currentMode == "Friendly Two") {
            url = friendlyDomain + "/api/v1/autochat?topic=" + message
            Keyboard.dismiss()
        } else if (currentMode == "Debate One") {
            url = debateDomain + "/api/v1/chat?msg=" + message
        } else { //currentMode == "Debate Two"
            url = debateDomain + "/api/v1/autochat?topic=" + message + "&model1=" + botProfiles[this.state.currentImageIndex][1] 
																						+ "&model2=" + botProfiles[this.state.currentImageTwoIndex][1]
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
                } else { //Bot vs Bot Mode
                    self.handleBotVsBotMode(response.data);
                }
            })
            .catch(error => {
                console.log(error);
                alert('Something went wrong when retrieving data from the server. Please reset the chat by going back or clicking the "Start New Conversation" button above!')
            });
    }

    onResetChat(currentMode) {
        const friendlyDomain = this.state.friendlyDomain;
        const debateDomain = this.state.debateDomain;

        if (currentMode == "Friendly One") {
            this.initialBotRender();
            axios.get(friendlyDomain + "/api/v1/reset");
        } else if (currentMode == "Debate One") {
            this.initialBotRender();
            axios.get(debateDomain + "/api/v1/reset?model=" + botProfiles[this.state.currentImageIndex][1]);
        } else if (currentMode == "Friendly Two") {
            this.initialBotRender();
            axios.get(friendlyDomain + "/api/v1/reset");
        } else if (currentMode == "Debate Two") {
            this.initialBotRender();
            axios.get(debateDomain + "/api/v1/reset?model=" + botProfiles[this.state.currentImageIndex][1]); //TODO: Fix Link
        }

        this.setState({
            botHasReset: true
        })
    }

    onRateConversation() {
        alert("This is future enhancement to rate this conversation!")
    }

    render() {
        const currentMode = this.context.currentMode;
        const hideLoading = this.state.hideLoading;

        return (
        <View style={styles.mainContainer}>
            {hideLoading == false && (
                <Image source={require('./public/img/typing.gif')} style={styles.gifImage}/>
            )}

            {currentMode == "Default" && (
            <Image source={require('./public/img/welcome.gif')} style={styles.backgroundImage}/>
            )}
            {(currentMode == "Friendly One" || currentMode == "Friendly Two") && (
            <Image source={require('./public/img/friendly.jpg')} style={styles.backgroundImage}/>
            )}
            {(currentMode == "Debate One" || currentMode == "Debate Two") && (
            <Image source={require('./public/img/US_Flag.jpg')} style={styles.backgroundImage}/>
            )}
            
            <View style={[{alignItems: "center"}]}>
                <View style={[{ width: "65%", marginTop: 10 }]}>
                    <Button
                        onPress={() => this.onResetChat(currentMode)}
                        title="Start New Conversation"	
                    />
                </View>
            </View>
            <View style={[{alignItems: "flex-end"}]}>
                <View style={[{ width: "50%", margin: 10 }]}>
                    <Button
                        onPress={() => this.onRateConversation()}
                        title="Rate This Conversation"
                        color="green"	
                    />
                </View>
            </View>

            <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            isTyping={true}
            placeholder={"Type a message"}
            timeFormat={'h:mm A'}
            dateFormat={'DD MMM YYYY'}
            loadEarlier={false}
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

const botProfiles = [
	['John', 'Republican', 'https://github.com/ngchieu857529/emotionalchatbot/blob/chat_bot_v1/public/img/avatar1.JPG?raw=true'],
    ['Andrew', 'Democrat', 'https://github.com/ngchieu857529/emotionalchatbot/blob/chat_bot_v1/public/img/avatar2.JPG?raw=true'],
    ['David', 'Republican', 'https://github.com/ngchieu857529/emotionalchatbot/blob/chat_bot_v1/public/img/avatar3.JPG?raw=true'],
    ['Matthew', 'Democrat', 'https://github.com/ngchieu857529/emotionalchatbot/blob/chat_bot_v1/public/img/avatar4.JPG?raw=true'],
    ['Sarah', 'Republican', 'https://github.com/ngchieu857529/emotionalchatbot/blob/chat_bot_v1/public/img/avatar5.JPG?raw=true'],
    ['Jane', 'Democrat', 'https://github.com/ngchieu857529/emotionalchatbot/blob/chat_bot_v1/public/img/avatar6.JPG?raw=true'],
    ['Rose', 'Republican', 'https://github.com/ngchieu857529/emotionalchatbot/blob/chat_bot_v1/public/img/avatar7.JPG?raw=true'],
    ['Adi', 'Democrat', 'https://github.com/ngchieu857529/emotionalchatbot/blob/chat_bot_v1/public/img/avatar8.JPG?raw=true'],
]

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
        right: 0,
        opacity: 0.5,
    },
    gifImage: {
        width: 150,
        height: 100,
		position: "absolute",
		top: 100,
		left: 130,
		bottom: 100,
        right: 0,
        opacity: 1,
    },
})

export default ChatScreen;