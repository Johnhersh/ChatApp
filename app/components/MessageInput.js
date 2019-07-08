import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Input, ThemeProvider } from 'react-native-elements';
import { Icon } from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('window').width;


export class MessageInput extends React.Component {
    render() {
        return (
            <ThemeProvider
                theme={{
                    Input: {
                        containerStyle: {
                            width: SCREEN_WIDTH - 20,
                            alignSelf: 'center'
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
                    placeholder='Aa'
                />
            </View>

            </ThemeProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        height: 70,
    },
})