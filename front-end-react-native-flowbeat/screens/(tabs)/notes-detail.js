import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import icons from '../../constants/icons'

const NotesDetail = ({ route }) => {
	const navigation = useNavigation();
	const { title, description, jam } = route.params
	return (
		<SafeAreaView>
			<ScrollView>
				<View className="px-4 my-6">
					<View className='flex-row items-center gap-2 mb-10'>
						<TouchableOpacity onPress={() => navigation.navigate('Notes')}>
							<Image source={icons.back} className='w-6 h-6' />
						</TouchableOpacity>
						<Text className='text-xl font-medium'>My Notes</Text>
					</View>
					<View className='px-4 py-5 bg-[#e2e4e4] rounded-xl h-[85vh] relative'>
						<Text className='font-bold text-2xl mb-2'>{title}</Text>
						<Text className='mb-2'>{description}</Text>
						<View className='absolute bottom-4 right-4 bg-white py-1 px-2 rounded-full'>
							<Text className='text-[11px] font-bold'>
								{new Intl.DateTimeFormat('id-ID', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
									hour: 'numeric',
									minute: 'numeric'
								}).format(new Date(jam))}
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default NotesDetail
