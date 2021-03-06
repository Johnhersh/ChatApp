import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { ListItem } from 'react-native-elements';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export class MessagesLog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: []
        };
    }

    addNewMessage(user, msg, time, bIsSelf) {
        //Adding the new message to the array first
        this.state.list.push({name: user, msg: msg, time: time, self: bIsSelf});

        //Need to save the state to cause the view to refresh
        this.setState({
            list: this.state.list
        });
    }

    //This gets called only once after log-in is finished to populate the Messages Log with old messages
    addOldMessages(messageList) {
        for (let i in messageList) {
            let bIsSelf = false;
            if (messageList[i].user == this.props.user) bIsSelf=true;
            this.state.list.push({name: messageList[i].user,
                                 msg: messageList[i].message,
                                 time: messageList[i].time,
                                 self: bIsSelf});
        }

        //Need to save the state to cause the view to refresh
        this.setState({
            list: this.state.list
        });
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
                                    title={l.name}
                                    titleStyle={styles.name}
                                    subtitle={l.msg}
                                    subtitleStyle={styles.messageText}
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
        flex: 1,
        justifyContent: 'flex-end',
    },
    scrollContainer: {
        flex: 1,
        marginBottom: -1500, //The height of the messages beyond the screen
        justifyContent: 'flex-end',
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
        fontSize: 16,
    },
    selfMsg: {
        backgroundColor: '#5691BB',
        alignSelf: 'flex-end'
    },
    regMsg: {
        backgroundColor: '#303030',
        alignSelf: 'flex-start'
    },
    name: {
        color: '#007053',
        fontSize: 12,
    }
})