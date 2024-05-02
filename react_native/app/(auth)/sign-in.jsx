import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants';
import FormField from '../../components/formField';
import CustomButton from '../../components/customButton'
import { Link, router } from 'expo-router';

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const [isSubmitting, setisSubmitting] = useState(false)

    const submit = () => {

    }

    return (
        <SafeAreaView className="bg-white h-full ">
            <ScrollView>
                <View className="w-full min-h-[85vh] px-4 my-6 justify-center">
                    <Image source={images.logo}
                        resizeMode='contain' className="w-[115px] h-[35px]" />
                    <Text className="text-3xl text-black mt-10 font-psemibold">
                        Masuk</Text>
                    <Text className="font-pregular text-gray-100">Silahkan login dengan akun yang sudah terdaftar.</Text>
                    <FormField
                        title='Email'
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        ortherStyles="mt-7"
                        keyboardType="email-address"
                    />

                    <FormField
                        title='Password'
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        ortherStyles="mt-7"
                    />

                    <CustomButton
                        title={'Masuk'}
                        handlePress={() => router.push('/home')}
                        containerStyles="mt-7"
                        isLoading={isSubmitting}
                    />

                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-black-200 font-pregular">Belum mempunyai akun?</Text>
                        <Link href={'/sign-up'} className='text-lg text-secondary-100 font-psemibold'>Daftar</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn