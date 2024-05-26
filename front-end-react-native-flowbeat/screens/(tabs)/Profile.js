import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import images from '../../constants/images';
import icons from '../../constants/icons';
import { FontAwesome6 } from '@expo/vector-icons';

import LogoutAccount from '../../Components/LogoutAccount';
import useProfile from '../../Components/useProfile';

const Profile = () => {
	const [isProfileUpdated, setIsProfileUpdated] = useState(false);
	const [refresh, onRefresh] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const navigation = useNavigation()

	const { nama_lengkap, alamat, tgl_lahir, jenis_kelamin, setNama_lengkap, setAlamat, setTgl_lahir } = useProfile()

	const updateProfile = async (e) => {
		e.preventDefault()
		const token = await AsyncStorage.getItem('token')
		const profilePasien = { nama_lengkap, tgl_lahir }
		try {
			const response = await axios.put(`https://flowbeat.web.id/api/profile`, profilePasien, {
				headers: { Authorization: `Bearer ${token}` }
			});

			// Update state with new profile data
			setNama_lengkap(profilePasien.nama_lengkap);
			setTgl_lahir(profilePasien.tgl_lahir);

			setIsLoading(true);
			setTimeout(() => {
				setIsLoading(false);
				setIsProfileUpdated(true);
				alert('Success', 'Profile updated successfully');
			}, 1000);
		} catch (error) {
		}
	}

	return (
		<SafeAreaView>
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={refresh} />
				}
			>
				<View className='w-full min-h-[85vh] px-4 my-6'>
					<Text className='mb-5 font-bold text-xl'>Profile</Text>
					<View className='justify-center items-center'>
						<Image source={images.profile} className='w-32 h-32 rounded-full' />
						<View className="bg-blue-500 w-40 h-10 flex items-center justify-center rounded-full mt-5">
							<TouchableOpacity className="flex flex-row items-center justify-center" onPress={updateProfile}>
								{isLoading ? <Text>Loading...</Text> : (
									<>
										<Image source={icons.editProfile} className="w-5 h-5 mr-[5]" />
										<Text className="text-[16px] font-bold">Edit Profile</Text>
									</>
								)}
							</TouchableOpacity>
						</View>
					</View>

					<View className='mb-5 mt-10'>
						<Text className='text-md mb-2'>Nama</Text>
						<View className='flex-row justify-between'>
							<TextInput
								value={nama_lengkap}
								onChangeText={(text) => setNama_lengkap(text)}
								className='text-md w-[280px] pl-3 py-1 border border-gray-400 rounded-md'
							/>
							<TouchableOpacity
								className='w-10 h-10 bg-black rounded-md items-center justify-center'>
								<FontAwesome6 name="edit" size={18} color="white" />
							</TouchableOpacity>
						</View>
					</View>
					{/* <View className='mb-5'>
						<Text className='text-md mb-2'>Alamat</Text>
						<View className='flex-row justify-between'>
							<TextInput
								value={alamat}
								onChangeText={(text) => setAlamat(text)}
								className='text-md w-[280px] pl-3 py-1 border border-gray-400 rounded-md'
							/>
							<TouchableOpacity
								className='w-10 h-10 bg-black rounded-md items-center justify-center'>
								<FontAwesome6 name="edit" size={18} color="white" />
							</TouchableOpacity>
						</View>
					</View> */}
					<View className='mb-5'>
						<Text className='text-md mb-2'>Tanggal Lahir</Text>
						<View className='flex-row justify-between'>
							<TextInput
								value={tgl_lahir}
								onChangeText={(text) => setTgl_lahir(text)}
								className='text-md w-[280px] pl-3 py-1 border border-gray-400 rounded-md'
							/>
							<TouchableOpacity
								className='w-10 h-10 bg-black rounded-md items-center justify-center'>
								<FontAwesome6 name="edit" size={18} color="white" />
							</TouchableOpacity>
						</View>
					</View>

				</View>

				<LogoutAccount />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Profile;


// const editProfil = async (e) => {
// 	e.preventDefault()
// 	const token = await AsyncStorage.getItem('token');
// 	const edit = {
// 		nama_lengkap,
// 		alamat,
// 		tgl_lahir,
// 		jenis_kelamin,
// 	};
// 	try {
// 		const res = await axios.put('https://flowbeat.web.id/api/profile', edit, {
// 			headers: {
// 				Authorization: `Bearer ${token}`
// 			}
// 		});
// 		alert('Terupdate');
// 		setNama_lengkap(edit.nama_lengkap);
// 		setAlamat(edit.alamat);
// 		setTgl_lahir(edit.tgl_lahir);
// 		navigation.navigate('MainApp')
// 		setIsProfileUpdated(!isProfileUpdated);
// 	} catch (err) {
// 		console.error('Error updating profile:', err);
// 	}
// };
