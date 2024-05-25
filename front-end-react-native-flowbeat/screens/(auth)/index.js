import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import images from '../../constants/images'

const BeforeLogin = () => {
	const navigation = useNavigation()
	return (
		<SafeAreaView>
			<ScrollView contentContainerStyle={{ height: '100%' }}>
				<View className='mt-10 px-4'>
					<Text className='text-4xl font-bold mb-10'>Selalu Terhubung dengan Detak Jantungmu</Text>
					<View className='justify-center items-center mt-5'>
						<Image source={images.nurse}
							className='w-[310px] h-[310px]'
							resizeMode='contain'
						/>
					</View>
					<TouchableOpacity
						onPress={() => navigation.navigate('SignIn')}
						className='bg-blue-500 rounded-xl min-h-[62px] justify-center items-center mt-10 mb-5'>
						<Text className='font-bold text-[18px] text-white'>Masuk</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.navigate('SignUp')}
						className='bg-blue-500 rounded-xl min-h-[62px] justify-center items-center'>
						<Text className='font-bold text-[18px] text-white'>Daftar</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default BeforeLogin
