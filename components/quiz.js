import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { NavigationActions } from "react-navigation";

import Result from "./result";

const DeckFont = styled.Text`
  font-size: 35px;
  color: palevioletred;
`;

const CountFont = styled.Text`
  font-size: 18px;
  color: palevioletred;
`;

const LinkFont = styled.Text`
  font-size: 12px;
  color: palevioletred;
`;

const QuizView = styled.View`
  flex: 1;
  width: 100%;
  background-color: papayawhip;
`;

const CountView = styled.View`
  flex: 1;
  width: 100%;
  margin-top: 1%;
  padding: 2%;
  align-content: flex-start;
`;

const TextView = styled.View`
  flex: 3;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 5%;
`;

const ButtonContainer = styled.View`
  flex: 3;
  width: 100%;
  align-items: center;
`;

const ButtonFont = styled.Text`
  font-size: 18px;
  color: #ffffff;
`;

const CorrectButton = styled.TouchableOpacity`
  background-color: #4caf50;
  width: 50%;
  height: 20%;
  margin-top: 2%;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const InCorrectButton = styled.TouchableOpacity`
  background-color: #f44336;
  width: 50%;
  height: 20%;
  margin-top: 2%;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "quiz"
  });

  correctAnswers = 0;

  state = {
    questions: this.props.decks[this.props.navigation.state.params.title]
      .questions,
    currentStep: 0,
    flip: false,
    startQuiz: true
  };

  toggleView = () => {
    this.setState({
      flip: !this.state.flip
    });
  };

  moveToNextQuestion = () => {
    if (this.state.questions.length - 1 === this.state.currentStep)
      this.displayFinalResult();
    else
      this.setState(prevState => ({
        currentStep: prevState.currentStep + 1,
        flip: false
      }));
  };

  displayFinalResult = () => {
    this.setState({
      startQuiz: false,
      currentStep: 0
    });
  };

  handleCorrectAnswer = () => {
    this.correctAnswers = this.correctAnswers + 1;
    this.moveToNextQuestion();
  };

  handleInCorrectAnswer = () => {
    this.moveToNextQuestion();
  };

  restartQuiz = () => {
    this.setState({
      startQuiz: true
    });
    this.correctAnswers = 0;
  };

  goToDeckView = () => {
    const title = this.props.navigation.state.params.title;
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'}),
        NavigationActions.navigate({ routeName: 'DeckView', params: {deckID: title}})
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };

  updateDynamicView = () => {
    if (this.state.flip) {
      return (
        <TextView>
          <DeckFont>
            {this.state.questions[this.state.currentStep].answer}
          </DeckFont>
          <LinkFont onPress={this.toggleView}>Question</LinkFont>
        </TextView>
      );
    }
    return (
      <TextView>
        <DeckFont>
          {this.state.questions[this.state.currentStep].question}
        </DeckFont>
        <LinkFont onPress={this.toggleView}>Answer</LinkFont>
      </TextView>
    );
  };

  render() {
    if (this.state.startQuiz) {
      return (
        <QuizView>
          <CountView>
            <CountFont>
              {this.state.currentStep + 1}/{this.state.questions.length}
            </CountFont>
          </CountView>

          {this.updateDynamicView()}

          <ButtonContainer>
            <CorrectButton onPress={this.handleCorrectAnswer}>
              <ButtonFont>Correct</ButtonFont>
            </CorrectButton>
            <InCorrectButton onPress={this.handleInCorrectAnswer}>
              <ButtonFont>Incorrect</ButtonFont>
            </InCorrectButton>
          </ButtonContainer>
        </QuizView>
      );
    }
    return (
      <Result
        title={this.props.navigation.state.params.title}
        total={this.state.questions.length}
        rightAnswers={this.correctAnswers}
        resetQuiz={this.restartQuiz}
        startFromDeckView={this.goToDeckView}
      />
    );
  }
}

const mapStateToProps = state => ({
  decks: state
});

export default connect(mapStateToProps, null)(Quiz);
