'use client';

import ChartJantung from '../Components/ChartJantung';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CaretUp, CaretDown } from '@phosphor-icons/react/dist/ssr';
import Dropdown from '../Components/Dropdown';

const Pasien = () => {
  const [pasien, setPasien] = useState([]);
  const [dropdown, setDropdown] = useState({
    pasien: false,
  });
  const fetchData = async () => {
    axios
      .get('http://192.168.18.8:8080/TUGAS-AKHIR/backend_laravel/public/api/patients')
      .then((response) => setPasien(response.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDropdown = (detailPatient) => {
    setDropdown((prevState) => ({
      ...prevState,
      [detailPatient]: !prevState[detailPatient],
    }));
  };

  return (
    <div className="flex flex-col">
      <h1 className=" ml-10 mt-10 text-3xl font-bold">List All Pasien</h1>
      <table className="border-2 border-black bg-white mt-5 mx-10 w-60">
        <thead className="border-2 border-black ">
          <tr className="border-2 border-black bg-gray-300">
            <th className="border-2 border-black p-8 text-lg">No</th>
            <th className="border-2 border-black p-8 text-lg">Nama Lengkap</th>
            <th className="border-2 border-black p-8 text-lg">Tanggal Lahir</th>
            <th className="border-2 border-black p-8 px-18 text-lg">Perawatan</th>
            <th className="border-2 border-black p-8 text-lg">Alamat</th>
            <th className="border-2 border-black p-8 text-lg">email</th>
            <th className="border-2 border-black p-8 text-lg">jenis kelamin</th>
            <th className="border-2 border-black p-8 text-lg">Detail</th>
          </tr>
        </thead>
        <tbody>
          {pasien.map((item, i) => (
            <tr key={item.id}>
              <td className="border-2 py-4 border-black text-center bg-gray-300">{i + 1}</td>
              <td className={`border-2 border-black text-center bg-${item.heartrate ? item.heartrate.colors : ''}`}>{item.nama_lengkap}</td>
              <td className={`border-2 border-black text-center bg-${item.heartrate ? item.heartrate.colors : ''}`}>{item.tgl_lahir ? item.tgl_lahir : '-'}</td>
              <td className={`border-2 border-black text-center bg-${item.heartrate ? item.heartrate.colors : ''}`}>
                <select className="border-2 border-black rounded p-1" name="perawatan" id="perawatan">
                  <option value="pilih">Pilih</option>
                  <option value="rawat-inap">Rawat Inap</option>
                  <option value="rawat-jalan">Rawat Jalan</option>
                </select>
              </td>
              <td className={`border-2 px-5 border-black text-center bg-${item.heartrate ? item.heartrate.colors : ''}`}>{item.alamat ? item.alamat : '-'}</td>
              <td className={`border-2 px-5 border-black text-center bg-${item.heartrate ? item.heartrate.colors : ''}`}>{item.email ? item.email : '-'}</td>
              <td className={`border-2 px-5 border-black text-center bg-${item.heartrate ? item.heartrate.colors : ''}`}>{item.jenis_kelamin ? item.jenis_kelamin : '-'}</td>
              <td className={`cursor-pointer mt-1 hover:text-[#f52f57] border-2 px-5 border-black text-center bg-${item.heartrate ? item.heartrate.colors : ''}`} onClick={() => handleDropdown(item.id)}>
                {dropdown[item.id] ? (
                  <>
                    <Dropdown patient={item} />
                    ...
                  </>
                ) : (
                  <p>...</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ChartJantung />
    </div>
  );
};
export default Pasien;
