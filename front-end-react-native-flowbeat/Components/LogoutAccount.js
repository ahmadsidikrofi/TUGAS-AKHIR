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
					height: 2, // Ubah ketinggian bayangan menjadi lebih tipis
				},
				shadowOpacity: 0.2, // Mengurangi opasitas bayangan
				shadowRadius: 2, // Mengurangi radius bayangan
				elevation: 2, // Menyesuaikan elevasi (hanya untuk Android)
			}}
			className='flex-row items-center bg-white w-full p-3 rounded-md mt-2 h-[50px]'
			onPress={handleLogout}>
			<AntDesign name="logout" size={24} color="red" />
			<Text className='font-pbold text-rose-600 mx-5'>Keluar</Text>
		</TouchableOpacity>
	);
};

export default LogoutAccount;
