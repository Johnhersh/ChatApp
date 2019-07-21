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
  }

  loggedIn(newUser) {
    console.log("Setting new username to: "+newUser);
    this.setState({
      username: newUser
    });
    this.homeRef.current.connectToServer();
  }

  render () {
    return (
      <View style={styles.container}>
        <Home 
          user={this.state.username}
          ref={this.homeRef}
          />
        <LoginPage setNewUser={ this.loggedIn.bind(this) }></LoginPage>
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
