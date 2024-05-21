import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState, useContext, createContext } from "react";

const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {
	const [datas, setDatas] = useState("");
	const [nama_lengkap, setNama_lengkap] = useState('');
	const [alamat, setAlamat] = useState('');
	const [tgl_lahir, setTgl_lahir] = useState('');
	const [jenis_kelamin, setJenis_kelamin] = useState('');

    useEffect(() => {
		const token = AsyncStorage.getItem('token');
		if (token) {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`
				}
			};
			axios.get('https://flowbeat.web.id/api/profile', config).then((res) => {
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
	}, [])

    return (
        <ProfileContext.Provider value={{ 
            nama_lengkap,
            alamat,
            tgl_lahir,
            jenis_kelamin,
            datas,
            setNama_lengkap,
            setAlamat,
            setTgl_lahir,
            setJenis_kelamin,
        }}>
            {children}
        </ProfileContext.Provider>
    )
}
export const useProfileData = () => useContext(ProfileContext)