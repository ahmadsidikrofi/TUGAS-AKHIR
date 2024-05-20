import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import images from '../../constants/images';
import icons from '../../constants/icons';

const ForgetPassword = () => {
	const navigation = useNavigation();
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [isPasswordShown, setIsPasswordShown] = useState(false);
	const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
	const [error, setError] = useState('');

	const handleForgetPassword = async () => {
		if (!phone || !password) {
			setError('Nomor Hp dan password harus diisi');
			return;
		}

		const payload = {
			noHp: phone,
			password: password,
		};

		try {
			const res = await axios.post('https://flowbeat.web.id/api/forget-password', payload);
			console.log(res.data);
			const token = res?.data?.access_token;
			await AsyncStorage.setItem('token', token);
			navigate.navigate('SignIn');
		} catch (error) {
			setError('Nomor HP atau Password salah');
		}

		setIsPasswordShown(false);
		setIsConfirmPasswordShown(false);
	};

	return (
		<SafeAreaView>
			<ScrollView>
				<View className='w-full min-h-[85vh] px-4 my-6'>
					<View className='flex-row gap-3'>
						<View className='pt-2'>
							<TouchableOpacity
								onPress={() => navigation.navigate('SignIn')}>
								<Image source={icons.back} className='w-6 h-6' />
							</TouchableOpacity>
						</View>
						<View>
							<Text className='font-bold text-3xl'>Lupa Password</Text>
							<Text className='text-md text-gray-500'>Silakan isi data dengan benar untuk mereset password Anda</Text>
						</View>
					</View>
					<View className="flex justify-center items-center">
						<Image source={images.forgotpassword} className="w-65 h-60" resizeMode='contain' />
					</View>
					<Text className='mb-2 mt-3'>Nomor HP</Text>
					<View className='mb-2 h-[55px] px-4 bg-[#EEEEEE] border-2 border-[#DDDDDD] rounded-[8px] focus:border-blue-500 items-center flex-row'>
						<TextInput
							className='w-full'
							placeholder='Masukkan nomor HP Anda'
							onChangeText={(text) => setPhone(text)}
						/>
					</View>
					<Text className='mb-2 mt-3'>Password</Text>
					<View className='mb-2 h-[55px] px-4 bg-[#EEEEEE] border-2 border-[#DDDDDD] rounded-[8px] focus:border-blue-500 items-center flex-row relative'>
						<TextInput
							className='w-full'
							placeholder='Masukkan kata sandi Anda'
							secureTextEntry={!isPasswordShown}
							onChangeText={(text) => setPassword(text)}
						/>
						<TouchableOpacity
							style={{ position: 'absolute', right: 20, top: 15 }}
							onPress={() => setIsPasswordShown(!isPasswordShown)}>
							<Image
								source={isPasswordShown ? icons.eyeHide : icons.eye}
								style={{ width: 24, height: 24 }}
								resizeMode='contain'
								className="w-6 h-6"
							/>
						</TouchableOpacity>
					</View>
					<Text className='mb-2 mt-3'>Konfirmasi password</Text>
					<View className='h-[55px] px-4 bg-[#EEEEEE] border-2 border-[#DDDDDD] rounded-[8px] focus:border-blue-500 items-center flex-row relative'>
						<TextInput
							className='w-full'
							placeholder='Konfirmasi kata sandi Anda'
							secureTextEntry={!isConfirmPasswordShown}
						/>
						<TouchableOpacity
							style={{ position: 'absolute', right: 20, top: 15 }}
							onPress={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}>
							<Image
								source={isConfirmPasswordShown ? icons.eyeHide : icons.eye}
								style={{ width: 24, height: 24 }}
								resizeMode='contain'
								className="w-6 h-6"
							/>
						</TouchableOpacity>
					</View>
					{error !== '' && <Text className="text-red-500 mb-2">{error}</Text>}
					<TouchableOpacity
						className='mt-8 bg-blue-500 rounded-[8px] h-[55px] justify-center items-center'
						onPress={handleForgetPassword}>
						<Text className='font-bold text-[18px] text-white'>Perbarui</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default ForgetPassword
