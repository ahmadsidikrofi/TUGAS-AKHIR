'use client';

import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from 'react';

const ChartJantung = () => {

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
      name: 'Heart Rate',
      data: [],
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.18.8:8080/TUGAS-AKHIR/backend_laravel/public/api/heartrate-patient');
        const newData = response.data.map(patient => ({
          x: new Date(patient.updated_at),
          y: parseInt(patient.heart_beats),
        }));
        // Perbarui data series untuk grafik
        setSeries([
          {
            name: 'Heart Rate',
            data: newData,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    };
  
    // Panggil fetchData pada saat komponen dimuat
    fetchData();
    // Lakukan polling setiap 10 detik
    const intervalId = setInterval(fetchData, 5000);
    // Bersihkan interval saat komponen dilepas
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-white h-[100%] rounded-lg shadow-lg w-[60vw] p-5 ml-10 my-10">
      <div id="chart">
        <ReactApexChart options={data} series={series} type="area" height={450} />
      </div>
    </div>
  );
};
export default ChartJantung;
