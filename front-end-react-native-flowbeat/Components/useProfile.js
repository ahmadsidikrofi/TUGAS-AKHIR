import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const useProfile = () => {
	const [datas, setDatas] = useState("");
	const [nama_lengkap, setNama_lengkap] = useState('');
	const [alamat, setAlamat] = useState('');
	const [tgl_lahir, setTgl_lahir] = useState('');
	const [jenis_kelamin, setJenis_kelamin] = useState('');

	const dataProfile = async () => {
		const token = await AsyncStorage.getItem('token');
		if (token) {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`
				}
			};
			await axios.get('https://flowbeat.web.id/api/profile', config).then((res) => {
				setDatas(res.data.pasien_data);
				const datas = res.data.pasien_data;
				setNama_lengkap(datas.nama_lengkap);
				setAlamat(datas.alamat);
				setTgl_lahir(datas.tgl_lahir);
				setJenis_kelamin(datas.jenis_kelamin);
				console.log(res.data);

			}).catch((err) => {
				console.log(err);
			});
		}
	}
	useEffect(() => {
		dataProfile()
	}, [])
	return {
		nama_lengkap, alamat, tgl_lahir, jenis_kelamin, datas,
		setNama_lengkap, setAlamat, setTgl_lahir, setJenis_kelamin,
	}
}

export default useProfile
