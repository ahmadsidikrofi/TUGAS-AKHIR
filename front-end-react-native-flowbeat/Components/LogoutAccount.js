import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const LogoutAccount = () => {
	const navigation = useNavigation();

	const handleLogout = async () => {
		const token = await AsyncStorage.getItem('token');
		if (token) {
			console.log('Token:', token)
			const response = await axios.delete('https://flowbeat.web.id/api/auth/logout', {
				headers: { Authorization: `Bearer ${token}` }
			});

			if (response.data.success === true) {
				await AsyncStorage.removeItem('token');
				navigation.navigate('BeforeLogin');
			} else {
				console.error('Logout failed:', response.data.message);
			}
		} else {
			console.error('Tiada token')
		}
	};

	return (
		<View className='justify-center items-center mt-32'>
			<TouchableOpacity
				className='w-32 h-14 bg-red-500 rounded-md'
				onPress={handleLogout}>
				<Text className='text-center font-medium text-white mt-4'>LOGOUT</Text>
			</TouchableOpacity>
		</View>
	);
};

export default LogoutAccount;
