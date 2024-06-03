
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const useProfile = () => {
	const [datas, setDatas] = useState("");
	const [nama_lengkap, setNama_lengkap] = useState('');
	const [alamat, setAlamat] = useState('');
	const [tgl_lahir, setTgl_lahir] = useState('');
	const [jenis_kelamin, setJenis_kelamin] = useState('');
	const [noHp, setNoHp] = useState('')
	const [perawatan, setJenisPerawatan] = useState('')
	const fetchProfile = async () => {
		const token = await AsyncStorage.getItem('token');
		if (token) {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			try {
				const res = await axios.get('https://flowbeat.web.id/api/profile', config);
				const data = res.data.pasien_data;
				setDatas(data);
				setNama_lengkap(data.nama_lengkap);
				setAlamat(data.alamat);
				setTgl_lahir(data.tgl_lahir);
				setNoHp(data.noHp)
				setJenis_kelamin(data.jenis_kelamin)
				setJenisPerawatan(data.perawatan)
			} catch (err) {
				console.error(err);
			}
		}
	};
	useEffect(() => {
		fetchProfile();
	}, []);

	return {
		nama_lengkap, alamat, tgl_lahir, jenis_kelamin, datas, noHp, perawatan,
		setNama_lengkap, setAlamat, setTgl_lahir, setJenis_kelamin,
		fetchProfile
	}
}

export default useProfile
