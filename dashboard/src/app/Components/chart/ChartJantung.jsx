'use client';

import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from 'react';

const ChartJantung = ({slug}) => {
  const [options, setOptions] = useState({
    chart: {
      id: 'apexchart-example',
    },
    xaxis: {
      categories: [],
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              horizontal: false
            }
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ],
    colors: ['#10b981'],
  });
  const [series, setSeries] = useState([
    {
      name: 'Heart Rate',
      data: [],
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof window !== "undefined") {
          const response = await axios.get(`https://dashboard-backend.000webhostapp.com/api/heartrate-patient/${slug}`);
          // const response = await axios.get(`http://192.168.18.8:8080/TUGAS-AKHIR/backend_laravel/public/api/heartrate-patient/${slug}`);
          const newData = response.data.map((patient) => ({
            x: new Date(patient.created_at).toLocaleTimeString(),
            y: parseInt(patient.heart_beats),
          }));
          // Perbarui data series untuk grafik
          setSeries([
            {
              name: 'Heart Rate',
              data: newData,
            },
          ]);
        } 
      } catch (error) {
        console.log(error);
      }
    };

    // Panggil fetchData pada saat komponen dimuat
    if (typeof window !== 'undefined') {
      fetchData();
      const intervalId = setInterval(fetchData, 5000);
      return () => clearInterval(intervalId);
    }
  }, [slug]);
  return (
    <div className="bg-white rounded-lg shadow-lg p-5 my-10 max-w-[768px]"> 
      <ReactApexChart options={options} series={series} type="area" height={380} className="dark:text-slate-800 lg:w-[30vw]"/>
    </div>
  );
};
export default ChartJantung;
