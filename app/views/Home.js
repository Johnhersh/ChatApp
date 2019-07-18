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
        }

        this.addNewMessage = this.addNewMessage.bind(this);
        this.msgLogRef = React.createRef(); // Holds a reference for the message log, so we can call it to add a new message
    }

    addNewMessage(message) {
        //console.log("Submitted message: "+message);
        this.msgLogRef.current.addNewMessage(message);
    }

    componentDidMount = () => {
            const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://192.168.1.155:5000/chatHub")
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.setState({ connection }, () => {
            this.state.connection
              .start()
              .then(() => console.log('Connection started!'))
              .catch(err => console.log('Error while establishing connection :('));
      
            this.state.connection.on('ReceiveMessage', (user, receivedMessage, time, bIsSelf) => {
              this.addNewMessage(receivedMessage);
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
        //height: SCREEN_HEIGHT,
    },
    keyViewContainer: {
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'column',
        paddingTop: STATUSBAR_HEIGHT+20,
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