import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import images from '../../constants/images'

// Fonts
import PoppinsBold from '../../Components/Fonts/PoppinsBold';
import PoppinsRegular from '../../Components/Fonts/PoppinsRegular';
import PoppinsMedium from '../../Components/Fonts/Poppins-Medium';
import PoppinsThin from '../../Components/Fonts/Poppins-Thin';

const BeforeLogin = () => {
	const navigation = useNavigation()
	return (
		<SafeAreaView>
			<ScrollView contentContainerStyle={{ height: '100%' }}>
				<View className='mt-8 px-4'>
					<PoppinsBold><Text className='text-[31px]'>Selalu Terhubung dengan Detak Jantungmu</Text></PoppinsBold>
					<View className='justify-center items-center mb-5 mt-14'>
						<Image source={images.nurse}
							className='w-[310px] h-[310px]'
							resizeMode='contain'
						/>
					</View>
					<TouchableOpacity
						onPress={() => navigation.navigate('SignIn')}
						className='bg-blue-500 rounded-xl min-h-[62px] justify-center items-center mt-10 mb-5'>
						<PoppinsBold><Text className='text-[22px] text-white'>Masuk</Text></PoppinsBold>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.navigate('SignUp')}
						className='bg-blue-500 rounded-xl min-h-[62px] justify-center items-center'>
						<PoppinsBold><Text className='text-[22px] text-white'>Daftar</Text></PoppinsBold>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default BeforeLogin
