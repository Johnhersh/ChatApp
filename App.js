import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Home } from './app/views/Home.js'
import { LoginPage } from './app/components/LoginPage'

export default function App() {
  var username="";
  return (
    <MainApp></MainApp>
  );
}

export class MainApp extends React.Component {
  constructor() {
    super();

    this.state={
      username: ""
    };

    this.homeRef = React.createRef(); // Holds a reference for the Home component so we can invoke a websocket connection after login is done
    this.loginRef = React.createRef(); // Holds a reference for the Login component. This is used to play the fadeout animations and remove it from view when login is successful
  }

  //This gets called from the LoginPage after we've entered a correct user/pass and we're logged in and ready to start loading messages
  setNewUser(newUser) {
    console.log("Setting new username to: "+newUser);
    this.setState({
      username: newUser
    });
    this.homeRef.current.connectToServer();
    this.homeRef.current.GetOldMessages();
  }

  //This gets called by the Home component after it's done loading all the messages and we're ready to remove the login screen
  doneLoading() {
    console.log('Finished loading all messages');
    this.loginRef.current.hideSelf();
  }

  render () {
    return (
      <View style={ styles.container } >
        <Home 
          user={ this.state.username }
          ref={ this.homeRef }
          doneLoading={ this.doneLoading.bind(this) }
        />
        <LoginPage 
          setNewUser={ this.setNewUser.bind(this) }
          ref={ this.loginRef }
        >
        </LoginPage>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    zIndex: 1,
  },
});
