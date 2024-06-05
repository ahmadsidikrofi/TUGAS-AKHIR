import { Modal, View, Text, TouchableOpacity, ScrollView, Image, TextInput, RefreshControl, ActivityIndicator } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';

import images from '../../constants/images';

import LogoutAccount from '../../Components/LogoutAccount';
import useProfile from '../../Components/useProfile';
import DropdownGender from '../../Components/Dropdown';
import ReactNativeModernDatepicker from 'react-native-modern-datepicker';

const Profile = () => {
	const [isProfileUpdated, setIsProfileUpdated] = useState(false);
	const [isLoading, setIsLoading] = useState(false)
	const navigation = useNavigation()
	const [open, setOpen] = useState(false)
	const [tanggal, setTanggal] = useState('')

	const { nama_lengkap, alamat, tgl_lahir, jenis_kelamin, setJenis_kelamin, setNama_lengkap, setAlamat, setTgl_lahir, fetchProfile } = useProfile()

	const updateProfile = async (e) => {
		e.preventDefault()
		const token = await AsyncStorage.getItem('token')
		const profilePasien = { nama_lengkap, tgl_lahir, jenis_kelamin }
		await axios.put(`https://flowbeat.web.id/api/profile`, profilePasien, {
			headers: { Authorization: `Bearer ${token}` }
		}).then(() => {
			setIsLoading(true);
			setTimeout(() => {
				setIsLoading(false);
				setIsProfileUpdated(true);
				alert('Profile berhasil diperbarui');
			}, 1000);
		}).catch((err) => {
			alert('Gagal mengubah profile')
		})
	}

	useFocusEffect(
		useCallback(() => {
			const loadData = async () => {
				setIsLoading(true)
				await fetchProfile()
				setIsLoading(false)
			}
			loadData()
		}, [])
	)

	const handleOpenModal = () => {
		setOpen(!open)
	}

	return (
		<SafeAreaView>
			<ScrollView>
				<View className='w-full min-h-[85vh] px-4 my-6'>
					<Text className='mb-7 font-bold text-lg text-center'>Profile</Text>
					<View className='justify-center items-center'>
						<Image source={{ uri: "https://xsgames.co/randomusers/avatar.php?g=pixel" }} className='w-32 h-32 rounded-full' />
					</View>
					<View className='border-b border-[#a7a6a6] w-full self-center mt-6 mb-3' />

					<Text className='font-pregular mb-2'>Nama</Text>
					<TextInput
						value={isLoading ? "Loading..." : nama_lengkap}
						onChangeText={(text) => setNama_lengkap(text)}
						className='text-md w-full h-[50px] mb-2 pl-3 py-1 border border-[#a7a6a6] rounded-md focus:border-blue-500'
					/>

					<View className='flex-row items-center justify-between'>
						{/* Kelamin */}
						<View className='mt-2'>
							<Text className='mb-2 font-pregular'>Kelamin</Text>
							<DropdownGender setJenis_kelamin={setJenis_kelamin} jenis_kelamin={jenis_kelamin} />
						</View>

						{/* Tanggal Lahir */}
						<View>
							<TouchableOpacity onPress={handleOpenModal} className='mb-2 mt-3'><Text className='font-pregular'>Kelahiran</Text>
								<Text className='border border-[#a7a6a6] rounded-md h-[50px] w-[165px] text-center pt-3 mt-2'>{tgl_lahir}</Text>
							</TouchableOpacity>
							<Modal
								animationType='slide'
								transparent={true}
								visible={open}
								onRequestClose={() => setOpen(false)} // Menutup modal saat tombol kembali ditekan (hanya untuk Android)
							>
								<TouchableOpacity
									style={{ flex: 1 }}
									onPress={() => setOpen(false)} // Menutup modal saat area luar modal diklik
								>
									<View className='flex justify-center items-center my-auto p-4'>
										<View className='w-full bg-blue-500 rounded-lg p-4'>
											<ReactNativeModernDatepicker
												options={{
													backgroundColor: '#FFFFFF',
													textHeaderColor: '#000000',
													textDefaultColor: '#000000',
													selectedTextColor: '##FFFFFF',
													mainColor: '#3B82F6',
													textSecondaryColor: '#D6C7A1',
													borderColor: 'rgba(122, 146, 165, 0.1)'
												}}
												mode='calendar'
												selected={tanggal}
												onSelectedChange={setTgl_lahir}
											/>
											<TouchableOpacity className='mx-auto my-5 bg-white w-32 items-center justify-center h-10 rounded-md' onPress={handleOpenModal}>
												<Text className='text-blue-500 font-pbold'>Pilih</Text>
											</TouchableOpacity>
										</View>
									</View>
								</TouchableOpacity>
							</Modal>

						</View>

					</View>


					<Text className='font-pregular mb-2 mt-3'>Alamat</Text>

					<TextInput
						value={isLoading ? "Loading..." : alamat}
						onChangeText={(text) => setAlamat(text)}
						numberOfLines={4}
						multiline={true}
						className='text-md w-full h-20 pl-3 py-1 border border-gray-400 rounded-md focus:border-blue-500'
					/>

					<View className='mt-6'>
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
							className='rounded-md h-[50px] bg-blue-500 w-full mt-3 mb-3 items-center p-1' onPress={updateProfile}>
							{isLoading ? <ActivityIndicator size="medium" color="#fff" /> : (
								<>
									<Text className='font-pbold text-white mt-2'>Perbarui</Text>

								</>
							)}
						</TouchableOpacity>
					</View>

					<View>
						<LogoutAccount />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Profile;
