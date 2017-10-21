import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import DeckListView from "./components/decksListView";
import DeckView from "./components/deckView";
import AddCard from "./components/addCard";
import AddDeck from "./components/addDeck";
import UdaciStatusBar from "./components/udaciStatusBar";
import Quiz from "./components/quiz";
import Result from "./components/result";
import { initDecks } from "./api";

import { TabNavigator, StackNavigator } from "react-navigation";

import reducer from "./reducers";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { setLocalNotification } from './api'

const navOptions = {
  headerTintColor: "#ffffff",
  headerStyle: {
    backgroundColor: "#4E342E"
  }
};

const MainView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 5%;
`;

const Tabs = TabNavigator(
  {
    Decks: {
      screen: DeckListView,
      navigationOptions: {
        tabBarLabel: "Decks"
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: "New Deck"
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: "#4E342E"
      }
    }
  }
);

const AppStack = StackNavigator({
  Home: { screen: Tabs },
  DeckView: { screen: DeckView, navigationOptions: navOptions },
  AddCard: { screen: AddCard, navigationOptions: navOptions },
  Quiz: { screen: Quiz, navigationOptions: navOptions }
});

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
        <Provider store={createStore(reducer)}>
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
