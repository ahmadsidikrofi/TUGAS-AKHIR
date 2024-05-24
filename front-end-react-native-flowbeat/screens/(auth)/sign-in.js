// Import React Hooks useState
import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native'; // Import ActivityIndicator
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import icons from '../../constants/icons';
import images from '../../constants/images';

const SignIn = () => {
	const navigation = useNavigation();
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [isPasswordShown, setIsPasswordShown] = useState(false);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false); // State untuk menentukan apakah proses login sedang berlangsung

	const handleLogin = async () => {
		if (!phone || !password) {
			setError('Nomor HP dan password harus diisi');
			return;
		}

		if (!validatePhone(phone)) {
			setError('Nomor HP tidak valid');
			return;
		}

		setIsLoading(true); // Mengatur isLoading menjadi true saat proses login dimulai

		const payload = {
			noHp: phone,
			password: password,
		};

		await axios.post('https://flowbeat.web.id/api/auth/signin', payload)
			.then((res) => {
				const token = res?.data?.access_token;
				AsyncStorage.setItem('token', token);
				navigation.navigate('MainApp');
			})
			.catch((error) => {
				setError('Nomor HP atau password salah');
			})
			.finally(() => {
				setIsLoading(false); // Mengatur isLoading menjadi false setelah proses login selesai
			});
	}

	const validatePhone = (phone) => {
		const re = /^\d{11,12}$/;
		return re.test(phone);
	}

	return (
		<SafeAreaView>
			<ScrollView>
				<View className="px-4 my-6">
					<Text className="font-bold text-3xl">Masuk</Text>
					<Text className="text-md text-gray-500">Masuk dengan akun yang telah terdaftar</Text>
					<View className="flex justify-center items-center">
						<Image
							source={images.heartImg}
							className="w-80 h-72"
							resizeMode='contain'
						/>
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
					<Text className="mb-2">Password</Text>
					<View className="flex-row items-center border-2 border-[#DDDDDD] rounded-[8px]">
						<TextInput
							className="flex-1 h-[55px] px-4"
							placeholder="Masukkan kata sandi Anda"
							secureTextEntry={!isPasswordShown}
							onChangeText={(text) => setPassword(text)}
						/>
						<TouchableOpacity
							style={{ paddingRight: 10 }}
							onPress={() => setIsPasswordShown(!isPasswordShown)}>
							<Image
								source={isPasswordShown ? icons.eyeHide : icons.eye}
								style={{ width: 24, height: 24 }}
								resizeMode='contain'
								className="w-6 h-6"
							/>
						</TouchableOpacity>
					</View>
					<View className='flex-row gap-1 items-center mt-1'>
						{error !== '' && <Image source={icons.error} className='w-4 h-4' />}
						{error !== '' && <Text className="text-red-500">{error}</Text>}
					</View>
					<TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
						<Text className="text-right mb-5 mt-3 text-rose-400">Lupa password?</Text>
					</TouchableOpacity>

					<TouchableOpacity
						className="bg-blue-500 rounded-[8px] h-[55px] justify-center items-center mb-3"
						onPress={handleLogin}
						disabled={isLoading}
					>
						{isLoading ? (
							<ActivityIndicator color="#ffffff" />
						) : (
							<Text className="font-bold text-[18px] text-white">Masuk</Text>
						)}
					</TouchableOpacity>
					<View className="flex-row justify-center">
						<Text>Belum mempunyai akun?</Text>
						<TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
							<Text className="font-bold text-blue-500 ml-1">Daftar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default SignIn;
