import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Auth Screens
import BeforeLogin from '../screens/(auth)';
import SignIn from '../screens/(auth)/sign-in';
import SignUp from '../screens/(auth)/sign-up';
import ForgetPassword from '../screens/(auth)/forget-password';

// Tabs Screens
import Home from '../screens/(tabs)/Home';
import Profile from '../screens/(tabs)/Profile';
import Notes from '../screens/(tabs)/Notes';
import BottomNavigator from '../Components/BottomNavigator';
import Notification from '../screens/(tabs)/Notification';
import HeartRate from '../screens/(tabs)/heart-rate';
import OxygenSaturation from '../screens/(tabs)/oxygen-saturation';
import Systolic from '../screens/(tabs)/Systolic';
import TemperatureBody from '../screens/(tabs)/temperature-body';
import NotesDetail from '../screens/(tabs)/notes-detail';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
	return (
		<Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
			<Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
			<Tab.Screen name="Notes" component={Notes} options={{ headerShown: false }} />
			<Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
		</Tab.Navigator>
	)
}

const Router = () => {
	return (
		<Stack.Navigator initialRouteName=''>
			<Stack.Screen name="BeforeLogin" component={BeforeLogin} options={{ headerShown: false }} />
			<Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
			<Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
			<Stack.Screen name='ForgetPassword' component={ForgetPassword} options={{ headerShown: false }} />
			<Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
			<Stack.Screen name='Notification' component={Notification} options={{ headerShown: false }} />
			<Stack.Screen name='HeartRate' component={HeartRate} options={{ headerShown: false }} />
			<Stack.Screen name='OxygenSaturation' component={OxygenSaturation} options={{ headerShown: false }} />
			<Stack.Screen name='Systolic' component={Systolic} options={{ headerShown: false }} />
			<Stack.Screen name='TemperatureBody' component={TemperatureBody} options={{ headerShown: false }} />
			<Stack.Screen name='NotesDetail' component={NotesDetail} options={{ headerShown: false }} />
		</Stack.Navigator>
	)
}

export default Router
