import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


import LatestSystolic from '../../Components/LatestSystolic';
import LatestOxygen from '../../Components/LatestOxygen';
import LatestHeart from '../../Components/LatestHeart';
import LatestTemperature from '../../Components/LatestTemperature';

import images from '../../constants/images';
import useProfile from '../../Components/useProfile';
import { useProfileData } from '../../Components/ProfileContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';


const Home = () => {
	const navigation = useNavigation();
	const { nama_lengkap } = useProfileData()
	const [token, setToken] = useState(null)
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const checkToken = async () => {
			const checkToken = async () => {
				const storedToken = await AsyncStorage.getItem('token');
				if (!storedToken) {
					navigation.navigate('BeforeLogin');
				} else {
					setToken(storedToken);
				}
				setLoading(false);
			};
		}

		checkToken()
	}, [navigation])

	return (
		<SafeAreaView>
			<View className="w-full min-h-[85vh] px-4 my-6">
				<View className="flex-row items-center justify-between mb-10 mt-4">
					<View className="flex-row items-center">
						{/* <Image source={images.profile} resizeMode='contain' className="w-[60] h-[60] rounded-full" /> */}
						<View className="ml-4">
							<Text className="text-2xl text-black">Halo, {nama_lengkap}</Text>
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
	)
};

export default Home;
