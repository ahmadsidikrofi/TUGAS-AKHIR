import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import images from '../../constants/images';
import icons from '../../constants/icons';

import LogoutAccount from '../../Components/LogoutAccount';

const Profile = () => {
	const [datas, setDatas] = useState("");
	const [nama_lengkap, setNama_lengkap] = useState('');
	const [alamat, setAlamat] = useState('');
	const [tgl_lahir, setTgl_lahir] = useState('');
	const [jenis_kelamin, setJenis_kelamin] = useState('');
	const [isProfileUpdated, setIsProfileUpdated] = useState(false);
	const navigation = useNavigation();

	const dataProfile = async () => {
		const token = await AsyncStorage.getItem('token');
		if (token) {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`
				}
			};
			await axios.get('https://flowbeat.web.id/api/profile', config).then((res) => {
				setDatas(res.data.pasien_data);
				const datas = res.data.pasien_data;
				setNama_lengkap(datas.nama_lengkap);
				setAlamat(datas.alamat);
				setTgl_lahir(datas.tgl_lahir);
				setJenis_kelamin(datas.jenis_kelamin);
				console.log(res.data);
			}).catch((err) => {
				console.log(err);
			});
		}
	};

	useEffect(() => {
		dataProfile();
	}, [isProfileUpdated]);

	const editProfil = async () => {
		const token = await AsyncStorage.getItem('token');
		const edit = {
			nama_lengkap,
			alamat,
			tgl_lahir,
			jenis_kelamin,
		};
		axios.put('https://flowbeat.web.id/api/profile', edit, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}).then((res) => {
			alert('Terupdate');
			setIsProfileUpdated(!isProfileUpdated);  // Toggle the state to trigger useEffect
			navigation.navigate('MainApp');
		}).catch((err) => {
			console.log('Error updating profile:', err);
		});
	};

	return (
		<SafeAreaView>
			<ScrollView>
				<View className='w-full min-h-[85vh] px-4 my-6'>
					<View className='justify-center items-center'>
						<Text className='mb-5 font-bold text-xl'>Profile</Text>
						<Image source={images.profile} className='w-32 h-32 rounded-full' />
						<Text className='mt-5 font-bold text-3xl'>{datas.perawatan}</Text>
						<Text className='text-[18px] text-gray-500'>{datas.noHp}</Text>
						<View className="bg-blue-500 w-40 h-10 flex items-center justify-center rounded-full mt-5">
							<TouchableOpacity className="flex flex-row items-center justify-center" onPress={editProfil}>
								<Image source={icons.editProfile} className="w-5 h-5 mr-[5]" />
								<Text className='text-[16px] font-bold'>Edit Profile</Text>
							</TouchableOpacity>
						</View>
					</View>

					<View className='mb-5 mt-10'>
						<Text className='text-md mb-2'>Perawatan</Text>
						<TextInput
							value={nama_lengkap}
							onChangeText={(text) => setNama_lengkap(text)}
							className='text-md w-[200px] pl-3 py-1 border border-black rounded-md'
						/>

						<Text className='text-md'>Alamat</Text>
						<Text className='text-md'>
							{datas.alamat ? datas.alamat : <Text className='text-gray-500'>Belum tercantum</Text>}
						</Text>

						<Text className='text-[16px]'>Tanggal lahir</Text>
						<Text className='text-[16px] text-right'>
							{datas.tgl_lahir ? datas.tgl_lahir : <Text className='text-gray-500'>Belum tercantum</Text>}
						</Text>

						<Text className='text-[16px]'>Kelamin</Text>
						<Text className='text-[16px] text-right'>
							{datas.jenis_kelamin ? datas.jenis_kelamin : <Text className='text-gray-500'>Belum tercantum</Text>}
						</Text>
					</View>
				</View>

				<LogoutAccount />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Profile;
