import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import images from '../../constants/images';

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
			setNama_lengkap(profilePasien.alamat);
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

					</View>

					<View className='mb-5 mt-10 border border-slate-400 border-opacity-40 rounded-md'>
						<View>
							<View className='border-b border-slate-400 border-opacity-40'>
								<Text className='font-pmedium p-3'>Informasi Pasien</Text>
							</View>
							<View className='p-3'>
								<Text className='font-pregular mb-2'>Nama</Text>

								<TextInput
									value={nama_lengkap}
									onChangeText={(text) => setNama_lengkap(text)}
									className='text-md w-full h-10 pl-3 py-1 border border-gray-400 rounded-md focus:border-blue-500'
								/>
								<Text className='font-pregular mb-2 mt-3'>Alamat</Text>

								<TextInput
									value={alamat}
									onChangeText={(text) => setAlamat(text)}
									className='text-md w-full h-10 pl-3 py-1 border border-gray-400 rounded-md focus:border-blue-500'
								/>
								<Text className='font-pregular mb-2 mt-3'>Tanggal Lahir</Text>

								<Text className='font-pregular mb-2 mt-3'>Jenis Kelamin</Text>

								<TouchableOpacity
									className='rounded-md bg-blue-500 w-[120px] mt-3 items-center' onPress={updateProfile}>
									{isLoading ? <Text>Loading...</Text> : (
										<>
											<Text className='font-pregular h-8 text-white mt-2'>Perbarui</Text>
										</>
									)}
								</TouchableOpacity>

							</View>
						</View>

					</View>


				</View>

				<LogoutAccount />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Profile;
