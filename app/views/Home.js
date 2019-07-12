import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';

import { MessageInput } from '../components/MessageInput.js'
import { MessagesLog } from '../components/MessagesLog'

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //currentNewMessage: 'Def',
        }

        this.addNewMessage = this.addNewMessage.bind(this);
        this.msgLogRef = React.createRef(); // Holds a reference for the message log, so we can call it to add a new message
    }

    addNewMessage(message) {
        //console.log("Submitted message: "+message);
        this.msgLogRef.current.addNewMessage(message);
    }

    render () {
        return (
            <KeyboardAvoidingView style = {styles.container} behavior="padding" enabled>
                <MessagesLog ref={this.msgLogRef}></MessagesLog>
                <MessageInput
                    addNewMessage={ this.addNewMessage }
                />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        flex: 1,
        justifyContent: 'flex-end',
    },
});