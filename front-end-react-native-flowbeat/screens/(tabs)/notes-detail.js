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
						<Text className='text-2xl font-pbold'>Notes</Text>
					</View>
					<View className='px-4 py-5 bg-[##ecf0f1] rounded-xl h-[85vh] relative'>
						<Text className='font-pbold text-2xl mb-2'>{title}</Text>
						<Text className='font-pregular mb-2'>{description}</Text>
						<View className='absolute bottom-4 right-4 bg-white py-2 px-4 rounded-full'>
							<Text className='text-[11px] font-pbold'>
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
