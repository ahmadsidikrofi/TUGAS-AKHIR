import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';

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
		<TouchableOpacity
			style={{
				shadowColor: "#000",
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.2,
				shadowRadius: 2,
				elevation: 2,
			}}
			className='flex-row items-center bg-red-600 w-full p-3 rounded-md mt-2 h-[50px]'
			onPress={handleLogout}>
			<AntDesign name="logout" size={24} color="white" />
			<Text className='font-pbold text-white mx-5'>Keluar</Text>
		</TouchableOpacity>
	);
};

export default LogoutAccount;
