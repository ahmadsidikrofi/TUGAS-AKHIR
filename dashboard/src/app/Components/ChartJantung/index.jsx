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
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
    },
  });
  const [series, setSeries] = useState([
    {
      name: 'Heart Rate',
      data: [],
    },
  ]);
  useEffect(() => {
    const data = [];
    axios.get('http://192.168.18.8:8080/TUGAS-AKHIR/backend_laravel/public/api/patients').then((response) => console.log(response.data));
    response.map((response) => {
      data.push(response.heart_rate);
    });
    setData({
      chart: {
        id: 'apexchart-example',
      },
      xaxis: {
        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
      },
    });
    setSeries([
      {
        name: 'Heart Rate',
        data: data,
      },
    ]).catch((error) => console.log(error));
  }, []);
  return (
    <div className="bg-white h-[44vh] rounded-lg shadow-lg w-[60vh] p-5 ml-10">
      <div id="chart">
        <ReactApexChart options={data} series={series} type="line" height={350} />
      </div>
    </div>
  );
};
export default ChartJantung;
