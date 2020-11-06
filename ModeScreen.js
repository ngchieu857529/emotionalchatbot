import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import { ModeContext,  } from './ModeContext';

class ModeScreen extends Component {
    render() {
        return (
            <View style={styles.mainContainer}>
                <Image source={require('./public/img/welcome.gif')} style={styles.backgroundImage}/>
                <Text style={styles.headerText}>Get started by selecting the mode of the chat bot!
					{"\n"}<Text style = {[{fontSize: 24}]}>Hint:
				
				
				</Text>
				
				</Text>
                <View style={[{ width: "65%", margin: 10}]}>
                    <Button
                        title="Friendly Mode"
                        onPress={() =>
                            this.props.navigation.navigate('ChooseFriendlyMode')
                        }
						color="limegreen"
                    />
                </View>
				<View style={[{ width: "65%", margin: 10}]}> 
					<Button
						title="Critical Mode"
						onPress={() =>
							this.props.navigation.navigate('ChooseDebateMode')
						}
						color = 'orange'
                    />
			    </View>
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
    headerText: {
        color: "skyblue",
        fontSize: 30,
		backgroundColor: 'white',
		marginBottom: 50,
		borderStyle: "solid",
		borderColor: 'skyblue',
		borderWidth: 1,
        textAlign: 'center',
		
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

export default ModeScreen;