import { View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import icons from '../../constants/icons';

const TemperatureBody = () => {
	const navigation = useNavigation();
	const [datas, setDatas] = useState([]);
	const [lastData, setLastData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const dataTemperature = async () => {
		try {
			const token = await AsyncStorage.getItem('token');
			if (token) {

			};

			const res = await axios.get('https://flowbeat.web.id/api/temp-patient-mobile', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			setDatas(res.data.patient_temp);
			setLastData(res.data.patient_temp.slice(-1));
			setIsLoading(false);

		} catch (err) {
			console.log(err);
			setIsLoading(false);
		}
	}

	useEffect(() => {
		const interval = setInterval(() => {
			dataTemperature();
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const renderItem = ({ item }) => (
		<View className='flex-row gap-1 justify-center mb-10'>
			<Text className='text-3xl font-medium'>{item.patient_temp}</Text>
			<Text className='font-light text-[12px]'>o</Text>
		</View>
	);

	const formatDataForChart = (datas) => {
		if (!datas || datas.length === 0) return { labels: [], datasets: [{ data: [] }] };
		const labels = datas.map(data => new Intl.DateTimeFormat('id-ID', {
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric'
		}).format(new Date(data.created_at)));

		const bodyTemp = datas.map(data => parseInt(data.patient_temp.slice(0, 10)));

		return {
			labels,
			datasets: [
				{
					data: bodyTemp
				}
			]
		};
	}
	const chartData = formatDataForChart(datas);

	return (
		<SafeAreaView className='flex-1'>
			<View className='w-full min-h-[85vh] px-4 my-6'>
				<View className='flex-row items-center gap-2 mb-10'>
					<TouchableOpacity onPress={() => navigation.navigate('MainApp')}>
						<Image source={icons.back} className='w-6 h-6' />
					</TouchableOpacity>
					<Text className='text-xl font-medium'>Suhu Tubuh</Text>
				</View>

				<FlatList
					data={lastData}
					renderItem={renderItem}
					keyExtractor={(item, index) => index.toString()}
					ListFooterComponent={
						<>
							{isLoading ? (
								<ActivityIndicator size="large" color="#fbe285" />
							) : (
								<View>
									<LineChart
										data={chartData}
										width={Dimensions.get("window").width - 32}
										height={220}
										yAxisLabel=""
										yAxisSuffix="o"
										yAxisInterval={1}
										chartConfig={{
											backgroundColor: "#fbe285",
											backgroundGradientFrom: "#fbe285",
											backgroundGradientTo: "#fbe285",
											decimalPlaces: 0,
											color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,  // Warna biru dengan sedikit transparansi
											labelColor: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
											style: {
												borderRadius: 16
											},
											propsForDots: {
												r: "3",
												strokeWidth: "0",
												stroke: "#fff",
											},
											propsForVerticalLabels: {
												fontSize: 10,
												fill: "#000",
												rotation: 40,
											},
										}}
										style={{
											marginVertical: 8,
											borderRadius: 16,
											marginHorizontal: 0
										}}
									/>
								</View>
							)}
						</>
					}
				/>
			</View>

			<View className='flex-row gap-1 bg-[#FF6969]'>
				<View className='justify-center rounded-md p-3 mt-3 '>
					<Text className='text-sm font-pmedium'>Rata-rata</Text>
					<Text className='text-3xl font-pmedium mr-1 mt-5'>36.53</Text>
					<Text className='font-pregular text-[12px] mt-3'>BPM</Text>
				</View>
				<View className=' rounded-md p-3'>
					<Text className='text-sm font-pmedium'>Paling rendah</Text>
					<View className='mt-3'>
						<Text className='text-3xl font-pmedium mr-1'>33</Text>
						<Text className='font-pregular text-[12px] mt-3'>BPM</Text>
					</View>
				</View>
				<View className=' rounded-md p-3'>
					<Text className='text-sm font-pmedium'>Paling tinggi</Text>
					<View className='mt-3'>
						<Text className='text-3xl font-pmedium mr-1'>41.0</Text>
						<Text className='font-pregular text-[12px] mt-3'>BPM</Text>
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default TemperatureBody
