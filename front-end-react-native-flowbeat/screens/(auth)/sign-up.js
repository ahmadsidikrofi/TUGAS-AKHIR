import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import icons from '../../constants/icons';

const SignUp = () => {
	const navigation = useNavigation();
	const [nama, setNama] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [massage, setMassage] = useState('');
	const [isPasswordShown, setIsPasswordShown] = useState(false);
	const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
	const [error, setError] = useState('');



	const handleRegis = async () => {
		// Validasi input
		if (!nama || !phone || !password || !confirmPassword) {
			setError('Semua kolom harus diisi');
			return;
		}
		if (password !== confirmPassword) {
			setError('Password dan konfirmasi password harus sama');
			return;
		}
		if (!validatePhone(phone)) {
			setError('Nomor HP tidak valid');
			return;
		}

		// Jika validasi sukses, reset pesan error
		setError('');

		const payload = {
			nama_lengkap: nama,
			noHp: phone,
			password: password,
		};

		await axios.post('https://flowbeat.web.id/api/signup', payload)
			.then((res) => {
				setMassage('berhasil masuk ke database');
				navigation.navigate('SignIn');
			})
			.catch((error) => {
				console.log('Error:', error.response.data);
				setMassage('Gagal mendaftar. Silakan coba lagi.');
			});

		// Setelah berhasil atau gagal mendaftar, reset status show/hide password
		setIsPasswordShown(false);
		setIsConfirmPasswordShown(false);
	}

	const validatePhone = (phone) => {
		const re = /^\d{11,12}$/; // Validasi untuk 11-12 digit angka
		return re.test(phone);
	}

	return (
		<SafeAreaView>
			<ScrollView>
				<View className="w-full min-h-[85vh] px-4 my-6">
					<Text className='font-bold text-3xl '>Buat akun</Text>
					<Text className='text-md text-gray-500'>Daftarkan akun anda sebelum melakukan login</Text>
					<View className='mt-24'>
						<Text className='mb-2'>Nama lengkap</Text>
						<View className='mb-4 h-[55px] px-4 bg-[#EEEEEE] border-2 border-[#DDDDDD] rounded-[8px] focus:border-blue-500 items-center flex-row'>
							<TextInput
								className=' w-full'
								placeholder='Masukan nama lengkap Anda'
								onChangeText={(e) => setNama(e)}
							/>
						</View>

						<Text className='mb-2'>Nomor HP</Text>
						<View className='mb-4 w-full h-[55px] px-4 bg-[#EEEEEE] border-2 border-[#DDDDDD] rounded-[8px] focus:border-blue-500 items-center flex-row'>
							<TextInput
								className=' w-full'
								placeholder='Masukan nomor HP Anda'
								onChangeText={(e) => setPhone(e)}
								keyboardType='numeric'
							/>
						</View>

						<Text className='mb-2'>Password</Text>
						<View className='mb-4 w-full h-[55px] px-4 bg-[#EEEEEE] border-2 border-[#DDDDDD] rounded-[8px] focus:border-blue-500 items-center flex-row'>
							<TextInput className=' w-full'
								placeholder='Masukan kata sandi Anda'
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
						<Text className='mb-2'>Konfirmasi password</Text>
						<View className='mb-4 w-full h-[55px] px-4 bg-[#EEEEEE] border-2 border-[#DDDDDD] rounded-[8px] focus:border-blue-500 items-center flex-row'>
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

						{/* Pesan error */}
						<View className='flex-row gap-1 items-center'>
							{error !== '' && <Image source={icons.error} className='w-4 h-4' />}
							{error !== '' && <Text className='text-red-500'>{error}</Text>}
						</View>

						{/* Tombol Daftar */}
						<TouchableOpacity
							className='mt-5 bg-blue-500 rounded-[8px] h-[55px] justify-center items-center'
							onPress={handleRegis}>
							<Text className='font-bold text-[18px] text-white'>Daftar</Text>
						</TouchableOpacity>

						{/* Tautan untuk login */}
						<View className="justify-center pt-5 flex-row gap-1">
							<Text className="text-black-200">Sudah mempunyai akun?</Text>
							<TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
								<Text className='font-bold text-blue-500'>Masuk</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default SignUp;