import React from "react";
import { connect } from "react-redux";
import { Text, View, TextInput, Button } from "react-native";
import styled from "styled-components/native";
import { NavigationActions } from "react-navigation";
import { saveNewDeckToNative } from "../api";
import { addNewDeck } from "../actions";

const DeckContainer = styled.View`
	flex: 1;
	background-color: papayawhip;
	padding: 5%;
	width: 100%;
	align-items space-between;
`;

const TextLayout = styled.View`
  flex: 1;
  padding: 5%;
  width: 100%;
  background-color: papayawhip;
`;

const DeckFont = styled.Text`
	font-size: 35px;
	color: palevioletred;
`;

const DeckInput = styled.TextInput`
	margin-top: 20%;
`;

const ButtonView = styled.View`
  flex: 1;
  width: 100%;
`;

class AddDeck extends React.Component {

  static navigationOptions = {
    header: null
  };

  state = {
    newDeckTitle: ""
  };

  navigateBack = () => {
  	this.setState({
  		newDeckTitle: ""
  	});
    this.props.navigation.goBack();
  };

  handleSubmit = async () => {
    let response = await saveNewDeckToNative(this.state.newDeckTitle);
    if (response) {
      this.props.addNewDeck(response);
      this.goToDeckView();
    }
  };

  goToDeckView = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'})
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
    	<DeckContainer>
	      <TextLayout>
	      	<DeckFont>What is the title of your new Deck</DeckFont>
	        <DeckInput
	          height={50}
	          onChangeText={newDeckTitle => this.setState({ newDeckTitle })}
	          value={this.state.newDeckTitle}
	        />
	      </TextLayout>
	      <ButtonView>
	        <Button
	          title="SUBMIT"
	          onPress={this.handleSubmit}
	          accessibilityLabel="Provide a Deck name"
	        />
	      </ButtonView>
      </DeckContainer>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addNewDeck: (newDeck) => dispatch(addNewDeck(newDeck))
});

export default connect(null, mapDispatchToProps)(AddDeck);
