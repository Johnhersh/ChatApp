import React from 'react';
import { StyleSheet, View, Dimensions, KeyboardAvoidingView, Animated, Easing } from 'react-native';
import { Input, Button, Icon, ThemeProvider, Text } from 'react-native-elements';
import LottieView from 'lottie-react-native';

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
            fadeValue: new Animated.Value(1),
            hidden: false,
            loadAnimProgress: new Animated.Value(0),
            loaderSource: require('../../assets/1802-single-wave-loader.json'),
            loaderTranslateX: new Animated.Value(0),
        }

        this.login = this.login.bind(this);
    }

    async login() {
        
        //Start animating the loading bubbles
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.state.loadAnimProgress, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                  }),
                Animated.delay(500),
            ])
        ).start();
        
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
    }

    finishLogin(response) {
        /*for (var pair of response.headers.entries()) {
            console.log(pair[0]+ ': '+ pair[1]);
        }*/
        if (JSON.parse(response).LoginSuccess) {
            console.log("Login Success");
            this.props.setNewUser(this.state.username); // This will set in motion getting the old messages in the message log
        } else {
                console.log("Login Fail");
                this.setState({
                    loaderSource : require('../../assets/1802-single-wave-loader_red.json'),
                    //loaderTranslateX: 1,
                });
                let bounceAmount = 15;
                let bounceDuration = 80;
                Animated.sequence([
                    Animated.timing(this.state.loaderTranslateX,{
                        toValue: bounceAmount,
                        duration: bounceDuration,
                        easing: Easing.ease,
                        useNativeDriver: true
                    }),
                    Animated.timing(this.state.loaderTranslateX,{
                        toValue: -bounceAmount,
                        duration: bounceDuration,
                        easing: Easing.ease,
                        useNativeDriver: true
                    }),
                    Animated.timing(this.state.loaderTranslateX,{
                        toValue: bounceAmount,
                        duration: bounceDuration,
                        easing: Easing.ease,
                        useNativeDriver: true
                    }),
                    Animated.timing(this.state.loaderTranslateX,{
                        toValue: -bounceAmount,
                        duration: bounceDuration,
                        easing: Easing.ease,
                        useNativeDriver: true
                    }),
                    Animated.timing(this.state.loaderTranslateX,{
                        toValue: bounceAmount,
                        duration: bounceDuration,
                        easing: Easing.ease,
                        useNativeDriver: true
                    }),
                    Animated.timing(this.state.loaderTranslateX,{
                        toValue: -bounceAmount,
                        duration: bounceDuration,
                        easing: Easing.ease,
                        useNativeDriver: true
                    }),
                    Animated.timing(this.state.loaderTranslateX,{
                        toValue: 0,
                        duration: bounceDuration,
                        easing: Easing.ease,
                        useNativeDriver: true
                    }),
                ]).start(() => {
                    this.setState({
                        loaderSource : require('../../assets/1802-single-wave-loader.json'),
                        loadAnimProgress : 0,
                    });
                });
            }
    }

    // This gets called from the component in App.js after we're done loading all messages and are ready to hide the login screen
    hideSelf() {
        Animated.timing(this.state.fadeValue, {
            toValue: 0,
            duration: 700,
            easing: Easing.ease,
        }).start(() => {
            this.setState({hidden: true});
        });
    }

    render () {
        const {
            password,
            username,
        } = this.state;

        if (this.state.hidden) return null;

        return (
            <Animated.View 
                style={[styles.container, {opacity: this.state.fadeValue}]}
                ref={ref => this.AnimView = ref}
                >
                <KeyboardAvoidingView
                    style={styles.userInfo}
                    behavior="height"
                    keyboardVerticalOffset='-20'
                    enabled>
                    <ThemeProvider theme={theme}>
                        <Animated.View style={{
                            transform: [{
                                translateX: this.state.loaderTranslateX }]
                        }}>
                            <LottieView 
                                style={styles.lottie} 
                                source={this.state.loaderSource} 
                                loop 
                                progress={this.state.loadAnimProgress}/>
                        </Animated.View>
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
            </Animated.View>
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
        zIndex: 1,
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
      lottie: {
          //flex: 1,
          //backgroundColor: 'white',
          height: 300,
          width: 400,
          marginBottom: -120,
      }
});