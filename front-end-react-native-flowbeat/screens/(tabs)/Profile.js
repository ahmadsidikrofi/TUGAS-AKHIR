import { Modal, View, Text, TouchableOpacity, ScrollView, Image, TextInput, RefreshControl, ActivityIndicator } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';

import images from '../../constants/images';

import LogoutAccount from '../../Components/LogoutAccount';
import useProfile from '../../Components/useProfile';
import ReactNativeModernDatepicker, { getFormatedDate, getToday } from 'react-native-modern-datepicker';
import DropdownGender from '../../Components/Dropdown';

const Profile = () => {
	const [isProfileUpdated, setIsProfileUpdated] = useState(false);
	const [isLoading, setIsLoading] = useState(false)
	const navigation = useNavigation()
	const [tanggal, setTanggal] = useState(new Date())
	const [open, setOpen] = useState(false)

	const { nama_lengkap, alamat, tgl_lahir, jenis_kelamin, setNama_lengkap, setAlamat, setTgl_lahir, setJenis_kelamin, fetchProfile, noHp, perawatan } = useProfile()

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
				alert('Success', 'Profile updated successfully');
			}, 1000);
		}).catch((err) => {
			alert('Sepertinya kamu gagal ubah data yaa')
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
		<ScrollView>
			<View className='w-full min-h-[85vh]'>
				<View className='bg-blue-500 w-full h-52'></View>
				{/* <Text className='mb-5 font-bold text-xl'>Profile</Text> */}
				<View className='absolute top-36 left-32'>
					<Image source={{ uri: "https://xsgames.co/randomusers/avatar.php?g=pixel" }} className='w-32 h-32 rounded-full' />
				</View>
				<View className='mt-16 items-center'>
					<Text className='font-pbold text-md mb-1 mt-2'>{isLoading ? 'Loading...' : noHp}</Text>
					<Text className='font-medium text-md'>{isLoading ? 'Loading...' : perawatan}</Text>
				</View>

				<View className='p-3 mt-3'>
					<View className='mb-5 border border-slate-400 border-opacity-40 rounded-md'>
						<View>
							<View className='border-b border-slate-400 border-opacity-40'>
								<Text className='font-pmedium p-3'>Informasi Pasien</Text>
							</View>
							<View className='p-3'>
								<Text className='font-pregular mb-2'>Nama</Text>
								<TextInput
									value={isLoading ? "Loading..." : nama_lengkap}
									onChangeText={(text) => setNama_lengkap(text)}
									className='text-md w-full pl-3 py-1 border-gray-400 border bg-slate-200 rounded-md focus:border-blue-500'
								/>
								<Text className='font-pregular mb-2 mt-3'>Alamat</Text>

								<TextInput
									value={isLoading ? "Loading..." : alamat}
									onChangeText={(text) => setAlamat(text)}
									numberOfLines={4}
									multiline={true}
									className='text-md w-full h-14 pl-3 py-1 border border-gray-400 bg-slate-200 rounded-md focus:border-blue-500'
								/>
								<TouchableOpacity className='font-pregular mb-2 mt-3' onPress={handleOpenModal}><Text>Pilih kelahiran</Text></TouchableOpacity>
								<Text className='font-pregular mt-2'>
									{tgl_lahir}
								</Text>

								<Modal
									animationType='slide'
									transparent={true}
									visible={open}
								>

									{/* <View>
									
								</View> */}
									<View className='flex justify-center items-center my-auto p-4  '>
										<View className='w-full bg-[#090C08]'>
											<ReactNativeModernDatepicker
												options={{
													backgroundColor: '#090C08',
													textHeaderColor: '#FFA25B',
													textDefaultColor: '#F6E7C1',
													selectedTextColor: '#fff',
													mainColor: '#F4722B',
													textSecondaryColor: '#D6C7A1',
													borderColor: 'rgba(122, 146, 165, 0.1)',
												}}
												mode='calendar'
												selected={tanggal}
												onSelectedChange={setTgl_lahir}
											/>
											<TouchableOpacity className='mx-auto my-5' onPress={handleOpenModal}><Text className='text-[#FFA25B]'>Pilih</Text></TouchableOpacity>
										</View>
									</View>
								</Modal>
								<Text className='font-pregular mb-2 mt-3'>Jenis Kelamin</Text>
								<DropdownGender setJenis_kelamin={setJenis_kelamin} jenis_kelamin={jenis_kelamin} />
								<TouchableOpacity
									className='rounded-[15px] bg-blue-500 w-[120px] mt-3 items-center p-1' onPress={updateProfile}>
									{isLoading ? <ActivityIndicator size="medium" color="#fff" /> : (
										<>
											<Text className='font-pregular h-8 text-white mt-2'>Perbarui</Text>
										</>
									)}
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>

				<View className='p-3'>
					<LogoutAccount />
				</View>
			</View>
		</ScrollView>
	);
};

export default Profile;
