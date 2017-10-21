import React from "react";
import { connect } from 'react-redux';
import { View, TouchableOpacity , Text, AsyncStorage } from "react-native";
import styled from "styled-components/native";
import { getDecks } from "../api";
import { receiveDecks } from '../actions';

const DeckTitle = styled.Text`
  font-size: 50px;
  color: palevioletred;
`;

const QuestionCount = styled.Text`
  font-size: 20px;
`;

const DeckLayout = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: grey;
  width: 100%;
  padding: 5%;
`;

const DecksContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  width: 100%;
  background-color: papayawhip;
`;

class DeckListView extends React.Component {

  static navigationOptions = {
    header: null
  };

  state = {
    decksObject: {}
  };

  async componentDidMount() {
    try {
      let response = await AsyncStorage.getItem("decks");
      let decks = (await JSON.parse(response)) || {};
      this.setState({
        decksObject: decks
      });
      this.props.getDecks(decks);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    if (this.props.decksObject) {
      return (
        <DecksContainer>
          {Object.keys(this.props.decksObject).map(eachDeck => {
            return (
              <DeckLayout key={eachDeck} onPress={() => navigate('DeckView', {deckID: eachDeck})}>
                <DeckTitle>
                  {this.props.decksObject[eachDeck].title}
                </DeckTitle>
                <QuestionCount>
                  {this.props.decksObject[eachDeck].questions.length} cards
                </QuestionCount>
              </DeckLayout>
            );
          })}
        </DecksContainer>
      );
    }
    return <View />;
  }
}

const mapStateToProps = (state) => {
  return {decksObject: state};
};

const mapDispatchToProps = (dispatch) => ({
  getDecks: (decks) => dispatch(receiveDecks(decks))
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckListView);