import React, { Component } from "react";
import styled from "styled-components/native";
import { Text, View } from "react-native";
import { VictoryPie, VictoryContainer } from "victory-native";

const ResultView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: papayawhip;
`;

const ChartView = styled.View`
  flex: 5;
  align-items: center;
`;

const ButtonContainer = styled.View`
  flex: 3;
  width: 100%;
  margin-top: 10%;
  align-items: center;
`;

const ButtonFont = styled.Text`
  font-size: 18px;
  color: #ffffff;
`;

const RestartButton = styled.TouchableOpacity`
  background-color: #4E342E;
  width: 50%;
  height: 20%;
  margin-top: 2%;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const BackButton = styled.TouchableOpacity`
  background-color: #4E342E;
  width: 50%;
  height: 20%;
  margin-top: 2%;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

export default class Result extends Component {

  resetToDeckView = () => {
    this.props.startFromDeckView();
  }

  resetToQuizView = () => {
    this.props.resetQuiz();
  }

  render() {
    const right = (this.props.rightAnswers / this.props.total) * 100;
    const wrong = 100 - right;
    return (
      <ResultView>
        <ChartView>
          <VictoryPie
            containerComponent={<VictoryContainer responsive={true}/>}
            colorScale={[ "#4CAF50", "#F44336" ]}
            labelRadius={90}
            height={300}
            data={[
              { x: `Right(${right.toFixed(2)}%)`, y: right },
              { x: `Wrong(${wrong.toFixed(2)}%)`, y: wrong }
            ]}
            style={{ labels: { fill: "black", fontSize: 12, fontWeight: "bold" } }}
          />
        </ChartView>
        <ButtonContainer>
          <RestartButton onPress={this.resetToQuizView}>
            <ButtonFont>Restart Quiz</ButtonFont>
          </RestartButton>
          <BackButton onPress={this.resetToDeckView}>
            <ButtonFont>Back To Deck</ButtonFont>
          </BackButton>
        </ButtonContainer>
      </ResultView>
    );
  }
}
