'use client'

import ManyPasien from './Components/ManyPasien';
import PieChart from './Components/PieChart';
import ListMiniPasien from './Components/ListMiniPasien';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {
  const [pasien, setPasien] = useState([])
  const [totPasien, setTotPasien] = useState('')
  const [loading, setLoading] = useState(true)
  const fetchData = async () => {
    axios
      .get('https://dashboard-backend.000webhostapp.com/api/patients')
      // .get('http://192.168.18.8:8080/TUGAS-AKHIR/backend_laravel/public/api/patients')
      .then((response) => {
        setPasien(response.data)
        setTotPasien(response.data.length)
        setLoading(false)
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
      <h1 className="ml-10 mt-10 text-3xl font-bold text-[#f52f57]">Dashboard</h1>
      <div className="p-5 pt-10 pl-10 flex flex-col justify-between">
        <div className="flex gap-10">
          <ManyPasien title="Jumlah Pasien" totPasien={totPasien}/>
          <ManyPasien title="Jumlah Dokter" totPasien={400}/>
        </div>
        <div className="flex mt-14 gap-5">
          <ListMiniPasien pasien={pasien} loading={loading}/>
          <PieChart />
        </div>
      </div>
    </div>
  );
};
export default Home;
