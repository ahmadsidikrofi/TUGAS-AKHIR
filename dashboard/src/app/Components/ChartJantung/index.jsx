'use client';

import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from 'react';

const ChartJantung = () => {
  const [data, setData] = useState({
    series: [
      {
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Heart Rate',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [],
      },
    },
  });
  useEffect(() => {
    const data = [];
    const jam = [];
    const fetchData = async () => {
      try {
        const response = await fetch('https://hias1v0.localto.net/TA-PROJECT/backend_laravel/public/api/patients', { mode: 'cors' });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        console.log(responseData);
        const seriesData = responseData.map((item) => item.heartrate);
        const categories = responseData.map((item) => item.jam);
        setData((prevData) => ({
          ...prevData,
          series: [{ data: seriesData }],
          options: {
            ...prevData.options,
            xaxis: { categories },
          },
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    // axios
    //   .get('https://hias1v0.localto.net/TA-PROJECT/backend_laravel/public/api/patients')
    //   .then((res) => {
    //     console.log(res);
    //     data.map((item) => {
    //       console.log(item.data.heartrate.heart_beats);
    //       data.push(item.data.heartrate.heart_beats);
    //     });
    //     setData({
    //       series: [
    //         {
    //           data: [data],
    //         },
    //       ],
    //       options: {
    //         chart: {
    //           height: 350,
    //           type: 'line',
    //           zoom: {
    //             enabled: false,
    //           },
    //         },
    //         dataLabels: {
    //           enabled: false,
    //         },
    //         stroke: {
    //           curve: 'straight',
    //         },
    //         title: {
    //           text: 'Heart Rate',
    //           align: 'left',
    //         },
    //         grid: {
    //           row: {
    //             colors: ['#f3f3f3', 'transparent'],
    //             opacity: 0.5,
    //           },
    //         },
    //         xaxis: {
    //           categories: [jam],
    //         },
    //       },
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);
  return (
    <div className="bg-white h-[44vh] rounded-lg shadow-lg w-[60vh] p-5 ml-10">
      <div id="chart">
        <ReactApexChart options={data.options} series={data.series} type="area" height={350} />
      </div>
    </div>
  );
};
export default ChartJantung;
