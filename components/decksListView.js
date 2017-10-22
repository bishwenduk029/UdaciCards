import React from "react";
import { connect } from 'react-redux';
import { View, TouchableOpacity , Text, FlatList, AsyncStorage } from "react-native";
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
  border-width: 1px;
  border-color: grey;
  width: 100%;
  padding: 5%;
`;

const DecksList = styled.FlatList`
  flex: 1;
  border: 1px solid black;
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

  _keyExtractor = (item, index) => item;

  _renderItem = ({item}) => {
    const { navigate } = this.props.navigation;
    return (
      <DeckLayout onPress={() => navigate('DeckView', {deckID: item})}>
        <DeckTitle>
          {this.props.decksObject[item].title}
        </DeckTitle>
        <QuestionCount>
          {this.props.decksObject[item].questions.length} cards
        </QuestionCount>
      </DeckLayout>
    );
  }

  render() {
    if (this.props.decksObject) {
      return (
        <DecksList
          data={Object.keys(this.props.decksObject)}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      );
    }
    return <View />;
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {decksObject: state};
};

const mapDispatchToProps = (dispatch) => ({
  getDecks: (decks) => dispatch(receiveDecks(decks))
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckListView);