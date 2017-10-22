import React from "react";
import { TabNavigator, StackNavigator } from "react-navigation";
import DeckListView from "./components/decksListView";
import DeckView from "./components/deckView";
import AddQuiz from "./components/addQuiz";
import AddDeck from "./components/addDeck";
import Quiz from "./components/quiz";

const navOptions = {
  headerTintColor: "#ffffff",
  headerStyle: {
    backgroundColor: "#4E342E"
  }
};

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
  AddQuiz: { screen: AddQuiz, navigationOptions: navOptions },
  Quiz: { screen: Quiz, navigationOptions: navOptions }
});

export default AppStack;
