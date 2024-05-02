import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';

import { images } from '../constants';
import CustomButton from '../components/customButton';

export default function App() {
	return (
		<SafeAreaView className="bg-white h-full">
			<ScrollView contentContainerStyle={{ height: '100%' }}>
				<View className="relative mt-10 mb-20 px-4">
					<Text className="font-pbold text-3xl">Selalu Terhubung dengan Detak Jantungmu dan kita</Text>
				</View>
				<View className="w-full  items-center min-h-[85vh] px-4">
					{/* <Image
                        source={images.logo}
                        className="w-[130px] h-[84px]"
                        resizeMode='contain'
                    /> */}

					<Image
						source={images.nurse}
						className="w-[300px] h-[300px]"
						resizeMode='contain'
					/>

					<CustomButton
						title="Masuk"
						handlePress={() => router.push('/sign-in')}
						containerStyles="w-full mt-10"
					/>
					<CustomButton
						title="Daftar"
						handlePress={() => router.push('/sign-up')}
						containerStyles="w-full mt-5"
					/>
				</View>
			</ScrollView>
			<StatusBar backgroundColor='#161622'
				style='light' />
		</SafeAreaView>
	);
}
