import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';

import { MessageInput } from '../components/MessageInput.js'
import { MessagesLog } from '../components/MessagesLog'

export class Home extends React.Component {
    render () {
        return (
            <KeyboardAvoidingView style = {styles.container} behavior="padding" enabled>
                <MessagesLog></MessagesLog>
                <MessageInput/>
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