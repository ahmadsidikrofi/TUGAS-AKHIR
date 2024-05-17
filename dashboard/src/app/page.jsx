'use client';

import ManyPasien from './Components/ManyPasien';
import ListMiniPasien from './Components/ListMiniPasien';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {
  const [pasien, setPasien] = useState([]);
  const [totPasien, setTotPasien] = useState('');
  const [loading, setLoading] = useState(true);
  const [is_login, setIsLogin] = useState('');
  const [is_notLogin, setis_notLogin] = useState('');
  const fetchData = async () => {
    axios
      .get('https://flowbeat.web.id/api/patients')
      .then((response) => {
        setPasien(response.data);
        setTotPasien(response.data.length);
        setLoading(false);
        const loggedInPatients = response.data.filter((pasien) => pasien.is_login == '1');
        setIsLogin(loggedInPatients.length);
        const notLogingedInPatients = response.data.filter((pasien) => pasien.is_login == '0');
        setis_notLogin(notLogingedInPatients.length);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="ml-10 mt-10 text-3xl font-bold text-[#f52f57]">Dashboard</h1>
      <div className="p-5 pt-10 pl-10 flex flex-col justify-between">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 max-md:grid-cols-2 sm:grid-cols-1 max-sm:grid-cols-1 gap-10">
          <ManyPasien title="Jumlah Pasien" totPasien={totPasien} />
          <ManyPasien title="Pasien Login" is_Login={is_login} />
          <ManyPasien title="Pasien Logout" not_login={is_notLogin} />
        </div>
        <div className="mt-14">
          <ListMiniPasien pasien={pasien} loading={loading} />
        </div>
      </div>
    </>
  );
};
export default Home;
