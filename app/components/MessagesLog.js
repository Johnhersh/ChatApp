import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, StyleSheet, Text, Dimensions } from 'react-native';
import { ThemeProvider, ListItem } from 'react-native-elements';

const SCREEN_HEIGHT = Dimensions.get('window').height;

/*const list = [
    {
      name: 'Amy Farha',
      msg: 'Lorem ipsum dolor sit amet',
      self: false
    },
    {
      name: 'Chris',
      msg: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      self: false
    },
    {
        name: 'John',
        msg: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        self: true
    },
    {
        name: 'Sherman',
        msg: 'Excepteur sint occaecat cupidatat non proident.',
        self: false
    },
    {
        name: 'Lucy',
        msg: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        self: false
    },
    {
        name: 'Lucy',
        msg: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        self: false
    },
    {
        name: 'Lucy',
        msg: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        self: false
    },
    {
        name: 'Lucy',
        msg: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        self: true
    },
    {
        name: 'Lucy',
        msg: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        self: false
    },
    {
        name: 'Lucy',
        msg: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        self: false
    },
    {
        name: 'Lucy',
        msg: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        self: false
    },
];*/

export class MessagesLog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [{name: 'Lucy',
            msg: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            self: false}]
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
                                titleStyle={{color : 'white'}}
                                containerStyle={[styles.Message, l.self == true ? styles.selfMsg : styles.regMsg]}
                            />
                        ))
                    }
                    </ScrollView>
                </View>
            
        );
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: '#000000',
        justifyContent: 'flex-end',
    },
    container: {
        flex: 1,
        //backgroundColor: '#000000',
        justifyContent: 'flex-end',
    },
    Message: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 8,
        maxWidth: '70%',
    },
    selfMsg: {
        backgroundColor: '#5691BB',
        alignSelf: 'flex-end'
    },
    regMsg: {
        backgroundColor: '#575757',
    }
})