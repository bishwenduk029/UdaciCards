import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components/native";

import { getDeck, clearLocalNotification, setLocalNotification } from "../api";

const DeckLayout = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: papayawhip;
  padding: 10%;
`;

const TextContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ActionContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 10%;
`;

const DeckTitle = styled.Text`
  font-size: 50px;
  color: palevioletred;
`;

const QuestionCount = styled.Text`
  font-size: 20px;
`;

const ButtonView = styled.View`
  width: 115%;
  margin: 5%;
`;

class DeckView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.deckID}`
  });

  state = {
    deck: null
  };

  componentDidMount() {
    this.setState({
      deck: this.props.decks[this.props.navigation.state.params.deckID]
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      deck: nextProps.decks[this.props.navigation.state.params.deckID]
    });
  }

  startUpTheQuiz = () => {
     clearLocalNotification().then(setLocalNotification);
     this.props.navigation.navigate("Quiz", { title: this.state.deck.title });
  }

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.deck) {
      return (
        <DeckLayout>
          <TextContainer>
            <DeckTitle>{this.state.deck.title}</DeckTitle>
            <QuestionCount>
              {this.state.deck.questions.length} cards
            </QuestionCount>
          </TextContainer>
          <ActionContainer>
            <ButtonView>
              <Button
                onPress={() =>
                  navigate("AddCard", { title: this.state.deck.title })}
                title="ADD CARD"
                color="#841584"
                accessibilityLabel="Add a new question"
              />
            </ButtonView>
            <ButtonView>
              <Button
                title="START QUIZ"
                onPress={this.startUpTheQuiz}
                accessibilityLabel="Let's Test your knowledge"
              />
            </ButtonView>
          </ActionContainer>
        </DeckLayout>
      );
    }
    return <View />;
  }
}

const mapStateToProps = (state) => ({
  decks: state
});

export default connect(mapStateToProps, null)(DeckView);
