import React from 'react';
import { StyleSheet, View, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Input, Button, Icon, ThemeProvider, Text } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const theme = {
    Input: {
        containerStyle: {
            //width: '80%',
        },
        inputContainerStyle: {
            //borderRadius: 40,
            //borderWidth: 0,
            borderColor: '#575757',
            height: 35,
            marginVertical: 10,
            //backgroundColor: '#575757'
        },
        placeholderTextColor: '#808080',
            inputStyle: {
            marginLeft: 10,
            color: 'white',
        },
        keyboardAppearance: 'dark',
        blurOnSubmit: false,
    },
    Text: {
        color: 'white',
    },
  };

export class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }

        this.login = this.login.bind(this);
    }

    async login() {
        /*fetch('https://mywebsite.com/endpoint/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstParam: 'yourValue',
                secondParam: 'yourOtherValue',
            }),
        });*/

        try {
            let response = await fetch(
            'http://192.168.1.155:5000/api/MobileLogin', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': this.state.username,
                    'password': this.state.password,
                })
            });
            let responseJson = await response.json();
            //let responseHTML = await response.text();
            //let responseHeaders = await response.headers;
            this.finishLogin(responseJson);
        } catch (error) {
            console.error(error);
        }

        //console.log("User: "+this.state.username);
        //console.log("Pass: "+this.state.password);
    }

    finishLogin(response) {
        /*for (var pair of response.headers.entries()) {
            console.log(pair[0]+ ': '+ pair[1]);
        }*/
        if (JSON.parse(response).LoginSuccess)
            console.log("Login Success");
        else
            console.log("Login Fail");
    }

    render () {
        const {
            password,
            username,
        } = this.state;

        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    style={styles.userInfo}
                    behavior="height"
                    keyboardVerticalOffset='-20'
                    enabled>
                    <ThemeProvider theme={theme}>
                        <FormInput 
                            refInput={input => (this.usernameInput = input)}
                            icon="user"
                            placeholder="Username"
                            value={username}
                            onChangeText={username => this.setState({ username })}
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                //this.validateUsername();
                                this.passwordInput.focus();
                            }}
                        />
                        <FormInput 
                            refInput={input => (this.passwordInput = input)}
                            icon="lock"
                            placeholder="Password"
                            value={password}
                            onChangeText={password => this.setState({ password })}
                            secureTextEntry
                            returnKeyType="go"
                            onSubmitEditing={() => {
                                //this.validateConfirmationPassword();
                                this.login();
                            }}
                        />
                        <Button
                            //loading={isLoading}
                            title="Log In"
                            containerStyle={{ flex: -1 }}
                            buttonStyle={styles.loginButton}
                            
                            //titleStyle={styles.signUpButtonText}
                            onPress={this.login}
                            //disabled={isLoading}
                        />
                    </ThemeProvider>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

export const FormInput = props => {
    const { icon, refInput, ...otherProps } = props;
    return (
      <Input
        {...otherProps}
        ref={refInput}
        inputContainerStyle={styles.inputContainer}
        leftIcon={<Icon name={icon} type={"simple-line-icon"} color="#007053" size={18} />}
        inputStyle={styles.inputStyle}
        autoFocus={false}
        autoCapitalize="none"
        keyboardAppearance="dark"
        errorStyle={styles.errorInputStyle}
        autoCorrect={false}
        blurOnSubmit={false}
        placeholderTextColor="grey"
      />
    );
  };

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'black',
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userInfo: {
        flex: 1,
        width: '80%',
        //height: '100%',
        //backgroundColor: 'blue',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    inputStyle: {
        flex: 1,
        marginLeft: 10,
        color: 'white',
        fontSize: 16,
    },
    loginButton: {
        width: 150,
        borderRadius: 50,
        height: 45,
    },
    inputContainer: {
        paddingLeft: 8,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#5691BB',
        height: 45,
        marginVertical: 10,
      },
});