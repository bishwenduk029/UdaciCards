import React from 'react';
import { StatusBar, View } from "react-native";
import styled from 'styled-components/native';
import { Constants } from 'expo';

const StatusBarContainer = styled.View`
	height: Constants.statusBarHeight;
	backgroundColor: black;
`;

export default function UdaciStatusBar({ backgroundColor, ...props }) {
	return (
		<View style={{backgroundColor, height: Constants.statusBarHeight}}>
			<StatusBar translucent backgroundColor={backgroundColor} { ...props } />
		</View>
	);
}