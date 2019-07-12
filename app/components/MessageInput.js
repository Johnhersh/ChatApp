import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Input, ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('window').width;

const messageBarProps = {
    showLoading: true,
    onFocus: () => console.log('focus'),
    onBlur: () => console.log('blur'),
    onCancel: () => console.log('cancel'),
    onClearText: () => console.log('cleared'),
    onChangeText: text => console.log('text:', text),
};

export class MessageInput extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    state = {
        currentMessage: "",
    };

    handleKeyDown(e) {
        if(e.nativeEvent.key == "Enter"){
            console.log('Pressed enter');
        }
    }

    onSend() {
        console.log(this.state.currentMessage);
        this.inputRef.current.clear();
        this.props.addNewMessage(this.state.currentMessage); // Gets called on the Home component
    }

    render() {
        return (
            <ThemeProvider
                theme={{
                    Input: {
                        containerStyle: {
                            width: SCREEN_WIDTH - 60,
                        },
                        inputContainerStyle: {
                            borderRadius: 40,
                            borderWidth: 0,
                            borderColor: '#575757',
                            height: 35,
                            marginVertical: 10,
                            backgroundColor: '#575757'
                        },
                        placeholderTextColor: '#808080',
                            inputStyle: {
                            marginLeft: 10,
                            color: 'white',
                        },
                        keyboardAppearance: 'dark',
                        blurOnSubmit: false,
                    },
                }}
            >

            <View style={styles.container}>
                <Input
                    ref={this.inputRef}
                    placeholder='Aa'
                    {...messageBarProps}
                    //onFocus={ () => this.onFocus() }
                    onChangeText={(text) => this.setState({currentMessage: text})}
                />
                <Icon
                    style={styles.sendIcon}
                    color="#5691BB"
                    name="paper-plane"
                    size={30}
                    onPress={() => this.onSend() }
                />
            </View>

            </ThemeProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        height: 55,
        flexDirection: 'row',
    },
    textinput_focused: {
        backgroundColor: '#ffffff',
    },
    sendIcon: {
        alignSelf: 'center',
        paddingBottom: 10,
    }
})