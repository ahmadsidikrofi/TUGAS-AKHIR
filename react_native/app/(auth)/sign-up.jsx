import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants';
import FormField from '../../components/formField';
import CustomButton from '../../components/customButton'
import { Link } from 'expo-router';

const SignUp = () => {

    return (
        <SafeAreaView className="bg-white h-full ">
            <ScrollView>
                <View className="w-full min-h-[85vh] px-4 my-6 justify-center">
                    <Image source={images.logo}
                        resizeMode='contain' className="w-[115px] h-[35px]" />
                    <Text className="text-3xl text-black mt-10 font-psemibold">
                        Daftar</Text>
                    <Text className="font-pregular text-gray-100">Silahkan daftar untuk membuat akun baru.</Text>

                    <FormField
                        title='Email'
                        // value={form.email}
                        ortherStyles="mt-7"
                        keyboardType="email-address"
                    />

                    <FormField
                        title='Nama lengkap'
                        // value={form.username}
                        ortherStyles="mt-7"
                        keyboardType="nama-lengkap"
                    />

                    <FormField
                        title='Password'
                        // value={form.password}
                        ortherStyles="mt-7"
                    />

                    <FormField
                        title='Konfirmasi Password'
                        // value={confirmPassword}
                        // handleChangeText={handleChangeConfirmPassword}
                        ortherStyles="mt-7"
                    />

                    <CustomButton
                        title={'Masuk'}
                        // handlePress={submit}
                        containerStyles="mt-7"
                    // isLoading={isSubmitting}
                    />

                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-black-200 font-pregular">Sudah mempunyai akun?</Text>
                        <Link href={'/sign-in'} className='text-lg text-secondary-100 font-psemibold'>Masuk</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp