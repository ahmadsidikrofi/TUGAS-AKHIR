import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import Router from './router';
import { ProfileProvider } from './Components/ProfileContext';

const App = () => {
	return (
		<ProfileProvider>
			<NavigationContainer>
				<Router />
			</NavigationContainer>
		</ProfileProvider>
	)
}

export default App
