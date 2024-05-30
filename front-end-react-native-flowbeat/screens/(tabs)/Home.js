import { View, Text, TouchableOpacity, Image, RefreshControl, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


import LatestSystolic from '../../Components/LatestSystolic';
import LatestOxygen from '../../Components/LatestOxygen';
import LatestHeart from '../../Components/LatestHeart';
import LatestTemperature from '../../Components/LatestTemperature';

import images from '../../constants/images';
// import { useProfileData } from '../../Components/ProfileContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useProfile from "../../Components/useProfile"
import { useCallback, useEffect, useState } from 'react';



const Home = () => {
	const navigation = useNavigation();
	const { nama_lengkap, fetchProfile } = useProfile()
	const [token, setToken] = useState(null)
	const [loading, setLoading] = useState(true)
	const [refreshing, setRefreshing] = useState(false);

	useFocusEffect(
		useCallback(() => {
			const loadData = async () => {
				setLoading(true);
				await fetchProfile();
				setLoading(false);
			};

			loadData();
		}, [])
	);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await fetchProfile();
		setRefreshing(false);
	}, [fetchProfile]);


	return (
		<SafeAreaView >
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
			</ScrollView>
			<View className="w-full min-h-[100vh] px-4 my-6">
				<View className="flex-row items-center justify-between mb-10 mt-4">
					<View className="flex-row items-center">
						<Image source={images.profile} resizeMode='contain' className="w-16 h-16 rounded-full" />
						<View className="ml-4">
							{loading ? (
								<ActivityIndicator size="large" color="#bce7f0" />
							) : (
								<>
									<Text className="text-lg text-black font-pmedium">Halo, {nama_lengkap}!</Text>
								</>
							)}
						</View>
					</View>

					<View>
						<TouchableOpacity
							className='bg-gray-200 w-16 h-16 justify-center items-center rounded-full'
							onPress={() => navigation.navigate('Notification')}>
							<View >
								<Ionicons name="notifications-outline" size={28} color="black" />
							</View>
						</TouchableOpacity>
					</View>
				</View>
				<View>
					<Text className='font-pmedium text-2xl ml-3'>Flowbeat</Text>
				</View>
				<View className='mt-5'>
					<View className='flex flex-row justify-between'>

						<LatestHeart />
					</View>
					<View className='flex flex-row justify-between mt-3 '>
						<LatestOxygen />
						<LatestTemperature />
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
};

export default Home;
