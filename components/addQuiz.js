import React from 'react';
import { connect } from 'react-redux';
import { View, TextInput, Button } from 'react-native';
import styled from "styled-components/native";
import { NavigationActions } from 'react-navigation';
import { addCardToDeck } from '../api';
import { addNewCard } from '../actions';

const TextLayout = styled.View`
	flex: 1;
	padding: 5%;
	background-color: papayawhip;
`;

const ButtonView = styled.View`
  width: 100%;
`;

class AddQuiz extends React.Component {

	static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
  });

	state = {
		question: "",
		answer: "",
	}

	navigateBack = () => {
		this.props.navigation.goBack();
	}

	handleSubmit = async () => {
		const title = this.props.navigation.state.params.title;
		let newCard = {
			question: this.state.question,
			answer: this.state.answer
		};
		let response = await addCardToDeck(title, newCard);
		if (response) {
			this.props.updateDeckWithNewCard(newCard, title);
			this.navigateBack();
		}
	}

	render() {
		return (
			<TextLayout>
				<TextInput
					height={50}
					onChangeText={(question) => this.setState({ question })}
	        value={this.state.question}
				/>
				<TextInput
					height={50}
					onChangeText={(answer) => this.setState({ answer })}
	        value={this.state.answer}
				/>
				<ButtonView>
					<Button
	          title="SUBMIT"
	          onPress={this.handleSubmit}
	          accessibilityLabel="Let's Test your knowledge"
	        />
				</ButtonView>
			</TextLayout>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	updateDeckWithNewCard: (newCard, title) => dispatch(addNewCard(newCard, title))
});

export default connect(null, mapDispatchToProps)(AddQuiz);