import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import images from '../../constants/images';
import icons from '../../constants/icons';

const ForgetPassword = () => {
	const navigation = useNavigation();
	const [noHp, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isPasswordShown, setIsPasswordShown] = useState(false);
	const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleForgetPassword = async (e) => {
		setIsLoading(true);
		e.preventDefault();

		const payload = {
			noHp,
			password,
		};

		if (!noHp || !password || !confirmPassword) {
			setError('Semua kolom harus diisi');
			setIsLoading(false);
			return;
		}

		if (password !== confirmPassword) {
			setError('Password harus sama');
			setIsLoading(false);
			return;
		}

		try {
			await axios.post('https://flowbeat.web.id/api/auth/lupa-password', payload);
			setIsLoading(false);
			alert('Password anda telah diperbarahui');
			navigation.navigate('SignIn');
		} catch (error) {
			console.error('Terjadi kesalahan:', error);
			setError('Nomor HP Anda tidak terdaftar');
			setIsLoading(false);
		}
	};




	return (
		<SafeAreaView>
			<ScrollView>
				<View className="px-4 my-6">
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
					<Text className="mb-2 mt-3">Nomor HP</Text>
					<View className="mb-4">
						<TextInput
							className="h-[55px] px-4 bg-[#EEEEEE] border-2 border-[#DDDDDD] rounded-[8px] focus:border-blue-500"
							placeholder="Masukkan nomor HP Anda"
							onChangeText={(text) => setPhone(text)}
							keyboardType='numeric'
						/>
					</View>
					<Text className='mb-2'>Password Baru</Text>
					<View className='mb-4 w-full h-[55px] px-4 bg-[#EEEEEE] border-2 border-[#DDDDDD] rounded-[8px] focus:border-blue-500 items-center flex-row'>
						<TextInput className=' w-full'
							placeholder='Masukan kata sandi baru Anda'
							secureTextEntry={!isPasswordShown}
							onChangeText={(e) => setPassword(e)}
						/>
						<TouchableOpacity
							className='absolute right-[20]'
							onPress={() => setIsPasswordShown(!isPasswordShown)}>
							<Image
								source={isPasswordShown ? icons.eyeHide : icons.eye}
								style={{ width: 24, height: 24 }}
								resizeMode='contain'
								className="w-6 h-6"
							/>
						</TouchableOpacity>
					</View>
					<Text className='mb-2'>Konfirmasi password baru</Text>
					<View className='mb-3 w-full h-[55px] px-4 bg-[#EEEEEE] border-2 border-[#DDDDDD] rounded-[8px] focus:border-blue-500 items-center flex-row'>
						<TextInput className=' w-full'
							placeholder='Konfirmasi kata sandi Anda'
							secureTextEntry={!isConfirmPasswordShown}
							onChangeText={(e) => setConfirmPassword(e)}
						/>
						<TouchableOpacity
							className='absolute right-[20]'
							onPress={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}>
							<Image
								source={isConfirmPasswordShown ? icons.eyeHide : icons.eye}
								style={{ width: 24, height: 24 }}
								resizeMode='contain'
								className="w-6 h-6"
							/>
						</TouchableOpacity>
					</View>

					<View className='flex-row gap-1 items-center mb-2'>
						{error !== '' && <Image source={icons.error} className='w-4 h-4' />}
						{error !== '' && <Text className="text-red-500">{error}</Text>}
					</View>
					<TouchableOpacity
						className="bg-blue-500 rounded-[8px] h-[55px] justify-center items-center mb-3"
						onPress={handleForgetPassword}
						disabled={isLoading}
					>
						{isLoading ? (
							<ActivityIndicator color="#ffffff" />
						) : (
							<Text className="font-bold text-[18px] text-white">Perbarui</Text>
						)}
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default ForgetPassword;
