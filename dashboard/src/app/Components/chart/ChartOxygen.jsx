'use client';

import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from 'react';

const ChartOxygen = ({slug}) => {
  const [data, setData] = useState({
    chart: {
      id: 'apexchart-example',
    },
    xaxis: {
      categories: [],
    },
  });
  const [series, setSeries] = useState([
    {
      name: 'Oxygen Saturation (SpO2)',
      data: [],
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof window !== "undefined") {
          // const response = await axios.get(`http://192.168.18.8:8080/TUGAS-AKHIR/backend_laravel/public/api/oxymeter-patient/${slug}`);
          const response = await axios.get(`https://dashboard-backend.000webhostapp.com/api/oxymeter-patient/${slug}`);
          const newData = response.data.map((patient) => ({
            x: new Date(patient.created_at).toLocaleTimeString(),
            y: parseInt(patient.blood_oxygen),
          }));
          // Perbarui data series untuk grafik
          setSeries([
            {
              name: 'Oxygen Saturation (SpO2)',
              data: newData,
            },
          ]);
        } 
      } catch (error) {
        console.log(error);
      }
    };

    // Panggil fetchData pada saat komponen dimuat
    fetchData();
    if (typeof window !== 'undefined') {
      const intervalId = setInterval(fetchData, 5000);
      return () => clearInterval(intervalId);
    }
  }, [slug]);
  return (
    <div className="bg-white rounded-lg shadow-lg p-5 my-10 max-w-[768px]">
      <div id="chart">
        <ReactApexChart options={data} series={series} type="line" height={380} className="dark:text-slate-800 lg:w-[30vw]"/>
      </div>
    </div>
  );
};
export default ChartOxygen;
