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
          },
        },
      ],
    },
  });
  return (
    <div>
      <div className="bg-white h-[35vh] rounded-lg shadow-lg w-[44vh] p-5 ml-10" id="chart">
        <h1 className="font-bold text-xl text-[#f52f57]">Gender</h1>
        <ReactApexChart options={series.options} series={series.series} type="pie" width={380} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};
export default PieChart;
