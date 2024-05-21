import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Notes = () => {
	const [originalDatas, setOriginalDatas] = useState([]); // Menyimpan data asli
	const [datas, setDatas] = useState([]);
	const [searchText, setSearchText] = useState('');

	const dataNotes = async () => {
		try {
			const token = await AsyncStorage.getItem('token');
			if (token) {
				const res = await axios.get('https://flowbeat.web.id/api/notes-mobile', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				console.log(res.data);
				setDatas(res.data);
				setOriginalDatas(res.data); // Simpan data asli saat pertama kali didapatkan
			}
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		dataNotes();
	}, [])

	const handleSearch = () => {
		// Filter data based on search text
		const filteredData = originalDatas.filter(data =>
			data.title.toLowerCase().includes(searchText.toLowerCase()) ||
			data.description.toLowerCase().includes(searchText.toLowerCase())
		);
		setDatas(filteredData);
	}

	const handleClearSearch = () => {
		setSearchText(''); // Kosongkan TextInput
		setDatas(originalDatas); // Setel kembali ke data asli
	}

	return (
		<SafeAreaView className="flex-1">
			<ScrollView>
				<View className="w-full min-h-[85vh] px-4 my-6">
					<View className="mb-5">
						<Text className="font-medium text-2xl">Notes</Text>
						<View style={{ flexDirection: 'row' }}>
							<TextInput
								style={{ borderWidth: 1, borderColor: '#000', borderRadius: 5, marginTop: 5, padding: 5, flex: 1 }}
								placeholder="Search..."
								value={searchText}
								onChangeText={text => setSearchText(text)}
								onSubmitEditing={handleSearch}
							/>
							<TouchableOpacity onPress={handleClearSearch} style={{ marginLeft: 10, justifyContent: 'center' }}>
								<Text style={{ color: 'blue' }}>Clear</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View className="flex-row flex-wrap justify-between">
						{
							datas.map((data) => (
								<TouchableOpacity
									key={data.id}
									className="bg-blue-200 w-[48%] h-36 mb-4 rounded-xl p-3 shadow-lg relative"
									style={{
										shadowColor: "#000",
										shadowOffset: {
											width: 0,
											height: 5,
										},
										shadowOpacity: 0.34,
										shadowRadius: 5.27,
										elevation: 5,
									}}>
									<Text ellipsizeMode='tail' numberOfLines={2}
										className="font-medium mb-1 text-[15px]">
										{data.title}</Text>
									<Text ellipsizeMode='tail' numberOfLines={2}
										className='text-[12px]'>
										{data.description}</Text>
									<Text className="text-[9px] text-gray-800 absolute bottom-2 right-3">
										{new Intl.DateTimeFormat('id-ID', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
											hour: 'numeric',
											minute: 'numeric'
										}).format(new Date(data.created_at))}
									</Text>
								</TouchableOpacity>
							))
						}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Notes;
