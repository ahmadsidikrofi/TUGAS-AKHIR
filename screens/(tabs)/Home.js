import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useState, useEffect } from 'react';

import images from '../../constants/images';

import LatestSystolic from '../../Components/LatestSystolic';
import LatestOxygen from '../../Components/LatestOxygen';
import LatestHeart from '../../Components/LatestHeart';
import LatestTemperature from '../../Components/LatestTemperature';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const Home = () => {
	const navigation = useNavigation();
	const [datas, setDatas] = useState("")
	const dataProfile = async () => {
		const token = await AsyncStorage.getItem('token')
		if (token) {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
			await axios.get('https://flowbeat.web.id/api/profile', config).then((res) => {
				console.log(token)
				setDatas(res.data.pasien_data)

			}).catch((err) => {
				console.log(err)
			})

		}
	}
	useEffect(() => {
		const intervalId = setInterval(() => {
			dataProfile();
		}, 300000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<SafeAreaView>
			<View className="w-full min-h-[85vh] px-4 my-6">
				<View className="flex-row items-center justify-between mb-10 mt-4">
					<View className="flex-row items-center">
						<Image source={images.profile} resizeMode='contain' className="w-[60] h-[60] rounded-full" />
						<View className="ml-4">
							<Text className="text-2xl text-black">Hello, {datas.nama_lengkap}</Text>
							<Text className="text-gray-400">Have a good day</Text>
						</View>
					</View>
					<View>
						<TouchableOpacity
							onPress={() => navigation.navigate('Notification')}>
							<View >
								<Ionicons name="notifications" size={28} color="#FFC94A" />
							</View>
						</TouchableOpacity>
					</View>
				</View>
				<View className='mt-5'>
					<View className='flex flex-row justify-between'>

						<LatestHeart />

						<LatestOxygen />

					</View>
					<View className='flex flex-row justify-between mt-3 '>

						<LatestSystolic />

						<LatestTemperature />
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Home;
