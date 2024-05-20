'use client';

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';

export default function ChartNibp() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(`https://flowbeat.web.id/api/patients`);
    const male = res.data.map((item) => ({
      ...item,
      gender: item.jenis_kelamin === '' ? 'Laki-laki' : 'Perempuan',
    }));
    setData(res.data);
  };
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);
  const COLORS = ['#0088FE', '#00C49F'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="mt-10 bg-white rounded-lg shadow p-5 px-10 py-10">
      <h1 className="text-xl mb-5 font-bold">Grafik Nibp</h1>
      <PieChart width={400} height={400}>
        <Pie data={data} cx={200} cy={200} labelLine={false} label={renderCustomizedLabel} outerRadius={80} fill="#8884d8" dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
