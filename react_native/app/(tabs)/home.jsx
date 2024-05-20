import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants';

const Home = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View className="w-full min-h-[85vh] px-4 my-6">
                    <View className="flex-row">
                        <Image source={images.profile}
                            resizeMode='contain' className="w-[60] h-[60] rounded-full"
                        />
                        <View className="ml-5">
                            <Text className="text-2xl text-black font-psemibold">Hello, Bli</Text>
                            <Text className="font-pregular text-gray-100">Have a good day</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home