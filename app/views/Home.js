import React from 'react';
import { StyleSheet, Platform, View, KeyboardAvoidingView, StatusBar, Dimensions } from 'react-native';

import { MessageInput } from '../components/MessageInput.js';
import { MessagesLog } from '../components/MessagesLog';
import * as signalR from '@aspnet/signalr';

const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar translucent hidden="false" backgroundColor={backgroundColor} {...props} />
    </View>
  );

  const SCREEN_HEIGHT = Dimensions.get('window').height;

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            connection: null,
            //props.user gets set from the Mainapp component in App.js
            activeUser: props.user,
        }

        this.addNewMessage = this.addNewMessage.bind(this);
        this.msgLogRef = React.createRef(); // Holds a reference for the message log, so we can call it to add a new message
    }

    addNewMessage(message) {
        this.state.connection.invoke("SendMessage", message, this.state.activeUser).catch(err => console.error(err.toString()));
        //console.log("Sending from user: "+this.state.activeUser);
    }

    messageReceived(user, msg, time, bIsSelf) {
        this.msgLogRef.current.addNewMessage(user, msg, time, bIsSelf); // Happens on the MessagesLog component
    }

    //We need to make sure the activeUser is up to date
    componentWillUpdate(nextProps, nextState) {
        nextState.activeUser = nextProps.user;
    }

    async GetOldMessages() {
        console.log('Getting old messages!');

        try {
            let response = await fetch(
            'http://192.168.1.155:5000/api/MobileLogin', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            let responseJson = await response.json();
            this.msgLogRef.current.addOldMessages(responseJson);
        } catch (error) {
            console.error(error);
        }

        console.log('Got old messages!');
        this.props.doneLoading();
    }

    //This function is called from the App after a successful login. At this point the username should be set correctly
    connectToServer(){
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://192.168.1.155:5000/chatHub")
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.setState({ connection }, () => {
            this.state.connection
              .start()
              .then(() => {
                  console.log('Connection started!');
                })
              .catch(err => console.log('Error while establishing connection :('));
      
            this.state.connection.on('ReceiveMessage', (user, receivedMessage, time, bIsSelf) => {
              this.messageReceived(user, receivedMessage, time, bIsSelf);
            });
            this.state.connection.onclose(async () => {
                console.log('Connection closed');
            });
        });
    }

    render () {
        return (
            <View style={styles.container}>
                <MyStatusBar backgroundColor="#000000" barStyle="light-content" />

                <KeyboardAvoidingView
                    style = {styles.keyViewContainer}
                    behavior="height"
                    keyboardVerticalOffset='-20'
                    enabled>
                    
                    <MessagesLog 
                        ref={this.msgLogRef}
                        style={styles.msgLog}
                        user={ this.props.user }
                        ></MessagesLog>
                    <MessageInput
                        addNewMessage={ this.addNewMessage }
                    />
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    keyViewContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'column',
    },
    msgLog: {
        flex: 1,
    },
    /*statusbar: {
        backgroundColor: '#000000',
        height: 50,
    },*/
    statusBar: {
        height: STATUSBAR_HEIGHT,
      },
});