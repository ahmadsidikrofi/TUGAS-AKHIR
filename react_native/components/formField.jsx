import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'

const formField = ({ title, value, placeholder, handleChangeText, ortherStyles, ...props }) => {
    const [showPassword, setshowPassword] = useState(false)

    return (
        <View className={`space-y-2 ${ortherStyles}`}>
            <Text className="text-base text-black-200 font-pmedium">
                {title}</Text>
            <View className="w-full h-16 px-4 bg-[#EEEEEE] border-2 border-[#DDDDDD] rounded-2xl 
            focus:border-secondary items-center flex-row">
                <TextInput
                    className="flex-1 text-black font-psemibold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={(title === 'Password' || title === 'Konfirmasi Password') && !showPassword}

                />
                {(title === 'Password' || title === 'Konfirmasi Password') && (
                    <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
                        <Image
                            source={showPassword ? icons.eyeHide : icons.eye}
                            className="w-6 h-6"
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default formField