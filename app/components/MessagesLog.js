import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { ListItem } from 'react-native-elements';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export class MessagesLog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [{name: 'Lucy',
            msg: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            self: false},
            {name: 'Lucy',
            msg: 'Yeah',
            self: true}]
        };
    }

    addNewMessage(message) {
        console.log("2. Submitted message: "+message);
        
        //Adding the new message to the array first
        this.state.list.push({name: 'me', msg: message, self: true});

        //Need to save the state to cause the view to refresh
        this.setState({
            list: this.state.list
        })
    }

    render () {
        return (
            <View style={styles.container}>
            <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            // Next two lines make the scroll view always scroll to the end
            ref={ref => this.ScrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight)=>{
                this.ScrollView.scrollToEnd({animated:true});
            }}>
                {
                    this.state.list.map((l,i) => (
                        <ListItem
                            key={i}
                            name={l.name}
                            title={l.msg}
                            titleStyle={styles.messageText}
                            style={styles.messageContainer}
                            contentContainerStyle={styles.msgContentContainer}
                            containerStyle={[styles.messageBubble, l.self == true ? styles.selfMsg : styles.regMsg]}
                        />
                    ))
                }
            </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        maxHeight: SCREEN_HEIGHT-100,
        //height: SCREEN_HEIGHT,
        //width: SCREEN_WIDTH,
        //backgroundColor: 'red',
    },
    scrollContainer: {
    },
    messageContainer: {
        //backgroundColor: 'green',
    },
    msgContentContainer: {
        flex: 0,
    },
    messageBubble: {
        paddingVertical: 7,
        paddingHorizontal: 10,
        marginHorizontal: 16,
        marginVertical: 2,
        borderRadius: 16,
        maxWidth: '70%',
    },
    messageText: {
        color : 'white',
        //backgroundColor: 'blue',
        alignSelf: 'center',
    },
    selfMsg: {
        backgroundColor: '#5691BB',
        alignSelf: 'flex-end'
    },
    regMsg: {
        backgroundColor: '#575757',
        alignSelf: 'flex-start'
    }
})