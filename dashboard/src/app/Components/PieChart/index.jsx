'use client';

import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = () => {
  const [series, setSeries] = useState({
    series: [50, 50],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['male', 'female'],
      colors:['#F44336', '#E91E63'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
            legendColors: '#fff'
          },
        },
      ],
    },
  });
  return (
    <div>
      <div className="dark:bg-slate-200 bg-slate-200 rounded-lg shadow-lg p-5" id="chart">
        <h1 className="font-bold text-xl text-[#f52f57]">Gender</h1>
        <ReactApexChart options={series.options} series={series.series} type="pie" width={340} className='dark:text-white' />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};
export default PieChart;
