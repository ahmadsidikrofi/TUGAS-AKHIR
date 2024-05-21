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
import { Ionicons } from '@expo/vector-icons';


const getGreeting = () => {
	const now = new Date();
	const hours = now.getHours();

	if (hours < 12) {
		return 'pagi';
	} else if (hours < 18) {
		return 'sore';
	} else if (hours < 21) {
		return 'malam';
	} else {
		return 'petang';
	}
};

const Home = () => {
	const navigation = useNavigation();
	const [salam, setSalam] = useState(getGreeting());

	useEffect(() => {
		const updateGreeting = () => {
			setSalam(getGreeting());
		};

		const intervalId = setInterval(updateGreeting, 6000);

		return () => clearInterval(intervalId)
	}, []);

	return (
		<SafeAreaView>
			<View className="w-full min-h-[85vh] px-4 my-6">
				<View className="flex-row items-center justify-between mb-10 mt-4">
					<View className="flex-row items-center">
						<Image source={images.profile} resizeMode='contain' className="w-[60] h-[60] rounded-full" />
						<View className="ml-4">
							<Text className="text-2xl text-black">Selamat {salam}</Text>
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
