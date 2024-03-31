'use client';

import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from 'react';

const ChartJantung = ({slug}) => {
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
        if (typeof window !== "undefined") {
          const response = await axios.get(`http://192.168.1.4:8080/TUGAS-AKHIR/backend_laravel/public/api/heartrate-patient/${slug}`);
          const newData = response.data.map((patient) => ({
            x: new Date(patient.created_at),
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
    fetchData();
    if (typeof window !== 'undefined') {
      const intervalId = setInterval(fetchData, 5000);
      return () => clearInterval(intervalId);
    }
  }, [slug]);

  return (
    <div className="bg-white h-[100%] rounded-lg shadow-lg w-[60vw] p-5 ml-10 my-10">
      <div id="chart">
        <ReactApexChart options={data} series={series} type="line" height={450} />
      </div>
    </div>
  );
};
export default ChartJantung;
