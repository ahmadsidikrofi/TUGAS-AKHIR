'use client';

import ListMiniPasien from './Components/ListMiniPasien';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ChartGender from './Components/chart/ChartGender';
import ChartKondisi from './Components/chart/ChartKondisi';
import { User, SignIn, SignOut, Pulse } from '@phosphor-icons/react/dist/ssr';

const Home = () => {
  const [pasien, setPasien] = useState([]);
  const [totPasien, setTotPasien] = useState('');
  const [loading, setLoading] = useState(true);
  const [is_login, setIsLogin] = useState('');
  const [is_notLogin, setis_notLogin] = useState('');
  const [monitoring, setMonitoring] = useState('');
  const [genderPria, setGenderPria] = useState('');
  const [genderWanita, setGenderWanita] = useState('');
  const [kondisiRingan, setKondisiRingan] = useState('');
  const [kondisiSedang, setKondisiSedang] = useState('');
  const [kondisiBerat, setKondisiBerat] = useState('');

  const fetchData = async () => {
    axios
      .get('https://flowbeat.web.id/api/patients')
      .then((response) => {
        setPasien(response.data);
        setTotPasien(response.data.length);
        setLoading(false);

        const loggedInPatients = response.data.filter((pasien) => pasien.is_login === '1');
        setIsLogin(loggedInPatients.length);

        const notLoggedInPatients = response.data.filter((pasien) => pasien.is_login === '0');
        setis_notLogin(notLoggedInPatients.length);
        const Monitoring = response.data.filter((pasien) => pasien.is_active === 'active');
        setMonitoring(Monitoring.length);
        const kelaminPria = response.data.filter((pasien) => pasien.jenis_kelamin === 'Pria');
        const kelaminWanita = response.data.filter((pasien) => pasien.jenis_kelamin === 'Wanita');
        setGenderPria(kelaminPria);
        setGenderWanita(kelaminWanita);

        if (response.data) {
          let ringanCount = 0;
          let sedangCount = 0;
          let beratCount = 0;

          response.data.forEach((item) => {
            const calcEws = Number(item.heartrate?.score || 0) + Number(item.oxygen_saturation?.score || 0) + Number(item.nibp?.score || 0) + Number(item.temperature?.score || 0);

            if (calcEws >= 1 && calcEws <= 3) {
              ringanCount++;
            } else if (calcEws >= 4 && calcEws <= 6) {
              sedangCount++;
            } else if (calcEws >= 7 && calcEws <= 10) {
              beratCount++;
            }
          });

          setKondisiRingan(ringanCount);
          setKondisiSedang(sedangCount);
          setKondisiBerat(beratCount);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="ml-2 mt-10 text-3xl font-bold text-[#5d87ff]">Dashboard</h1>
      <div className="flex flex-col gap-10 mx-6 my-10">
        <div className="flex gap-5">
          <div className="flex w-[220px] xl:gap-3 xl:px-3 p-2 items-center 2xl:w-[278px] 2xl:h-[100px] 2xl:gap-5 border-l-8 shadow-lg rounded-lg border-[#5d87ff]  2xl:p-5 rounded-lg">
            <div className="bg-[#5d87ff] rounded-full 2xl:gap-3 xl:p-2">
              <User className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-6 xl:h-6 2xl:w-9 2xl:h-9" />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-bold 2xl:text-xl xl:text-md text-[#5d87ff]">Jumlah Pasien</h1>
              <h1 className="2xl:text-3xl xl:text-2xl font-bold">{totPasien}</h1>
            </div>
          </div>
          <div className="flex w-[220px] xl:gap-3 xl:px-3 p-2 items-center 2xl:w-[278px] 2xl:h-[100px] 2xl:gap-5 border-l-8 shadow-lg rounded-lg border-[#5d87ff]  2xl:p-5 rounded-lg">
            <div className="bg-[#CFFF92] rounded-full 2xl:gap-3 xl:p-2">
              <SignIn className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-6 xl:h-6 2xl:w-9 2xl:h-9" />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-bold 2xl:text-xl xl:text-md text-[#5d87ff]">Pasien Login</h1>
              <h1 className="2xl:text-3xl xl:text-2xl font-bold">{is_login}</h1>
            </div>
          </div>
          <div className="flex w-[220px] xl:gap-3 xl:px-3 p-2 items-center 2xl:w-[278px] 2xl:h-[100px] 2xl:gap-5 border-l-8 shadow-lg rounded-lg border-[#5d87ff]  2xl:p-5 rounded-lg">
            <div className="bg-[#FF8484] rounded-full 2xl:gap-3 xl:p-2">
              <SignOut className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-6 xl:h-6 2xl:w-9 2xl:h-9" />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-bold 2xl:text-xl xl:text-md text-[#5d87ff]">Pasien Logout</h1>
              <h1 className="2xl:text-3xl xl:text-2xl font-bold">{is_notLogin}</h1>
            </div>
          </div>
          <div className="flex w-[220px] xl:gap-3 xl:px-3 p-2 items-center 2xl:w-[278px] 2xl:h-[100px] 2xl:gap-5 border-l-8 shadow-lg rounded-lg border-[#5d87ff]  2xl:p-5 rounded-lg">
            <div className="bg-[#D15DE3] rounded-full 2xl:gap-3 xl:p-2">
              <Pulse className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-6 xl:h-6 2xl:w-9 2xl:h-9" />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-bold 2xl:text-xl xl:text-md text-[#5d87ff]">Pasien Active</h1>
              <h1 className="2xl:text-3xl xl:text-2xl font-bold">{monitoring}</h1>
            </div>
          </div>
        </div>
        <ListMiniPasien pasien={pasien} loading={loading} />
        <div className="flex gap-10">
          <ChartGender genderPria={genderPria} genderWanita={genderWanita} />
          <ChartKondisi kondisiBerat={kondisiBerat} kondisiSedang={kondisiSedang} kondisiRingan={kondisiRingan} />
        </div>
      </div>
    </>
  );
};

export default Home;
