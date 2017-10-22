import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import UdaciStatusBar from "./components/udaciStatusBar";
import AppStack from './routes';
import { initDecks } from "./api";
import { Provider } from "react-redux";
import Store from './store';
import { setLocalNotification } from './api';


const MainView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 5%;
`;

export default class App extends React.Component {
  state = {
    loaded: false
  };

  componentDidMount() {
    setLocalNotification()
    this.setState({
      loaded: initDecks()
    });
  }

  render() {
    if (this.state.loaded) {
      return (
        <Provider store={Store}>
          <View style={{ flex: 1 }}>
            <UdaciStatusBar backgroundColor="#3E2723" barstyle="light-content" />
            <AppStack />
          </View>
        </Provider>
      );
    }
    return null;
  }
}
