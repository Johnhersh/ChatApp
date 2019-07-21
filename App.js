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
  }

  updateUserName(newUser) {
    console.log("Setting new username to: "+newUser);
    this.setState({
      username: newUser
    });
  }

  render () {
    return (
      <View style={styles.container}>
        <Home user={this.state.username}/>
        <LoginPage setNewUser={ this.updateUserName.bind(this) }></LoginPage>
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
