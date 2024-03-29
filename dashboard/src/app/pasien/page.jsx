'use client';

import ChartJantung from '../Components/ChartJantung';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CaretUp, CaretDown } from '@phosphor-icons/react/dist/ssr';
import Dropdown from '../Components/Dropdown';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Pasien = () => {
  const [pasien, setPasien] = useState([]);
  const [dropdown, setDropdown] = useState({
    pasien: false,
  });
  const [perawatan, setPerawatan] = useState('');
  const router = useRouter()
  const fetchData = async () => {
    axios
      .get('http://192.168.1.4:8080/TUGAS-AKHIR/backend_laravel/public/api/patients')
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

  const ubahPerawatan = async (slug, jenisPerawatanBaru) => {
    const res = await axios.get('http://192.168.1.4:8080/TUGAS-AKHIR/backend_laravel/public/api/patients')
    const patient = res.data
    const findPatient = patient.find(item => item.slug === slug)
    if (findPatient) {
      axios.put(`http://192.168.1.4:8080/TUGAS-AKHIR/backend_laravel/public/api/profile-update/${slug}`, {
        perawatan: jenisPerawatanBaru
      })
    }
  }

  return (
    <div className="flex flex-col">
      <h1 className=" ml-10 mt-10 text-3xl font-bold">List All Pasien</h1>
      <table className="border-2 border-black bg-white mt-5 mx-10 w-60">
        <thead className="border-2 border-black ">
          <tr className="border-2 border-black bg-gray-300">
            <th className="border-2 border-black p-3 text-lg">No</th>
            <th className="border-2 border-black p-8 text-lg">Nama Lengkap</th>
            <th className="border-2 border-black p-8 px-18 text-lg">Perawatan</th>
            <th className="border-2 border-black p-8 text-lg">email</th>
            <th className="border-2 border-black p-8 text-lg">jenis kelamin</th>
            <th className="border-2 border-black p-8 text-lg">EWS</th>
            <th className="border-2 border-black p-8 text-lg">Detail</th>
          </tr>
        </thead>
        <tbody>
          {pasien.map((item, i) => (
            <tr key={item.id}>
              <td className="border-2 py-4 border-black text-center bg-gray-300">{i + 1}</td>
              <td className={`border-2 border-black text-center bg-${item.heartrate ? item.heartrate.colors : ''}`}>{item.nama_lengkap}</td>
              <td className={`border-2 border-black text-center bg-${item.heartrate ? item.heartrate.colors : ''}`}>
                <select onChange={(e) => ubahPerawatan(item.slug, e.target.value)} className="border-2 border-black rounded p-1" name="perawatan" id="perawatan">
                  {/* <option disabled>saat ini: {item.perawatan}</option> */}
                  <option selected={item.perawatan === "Rawat inap" ? true : false}  value="Rawat inap">Rawat inap</option>
                  <option selected={item.perawatan === "Rawat jalan" ? true : false}  value="Rawat jalan">Rawat jalan</option>
                </select>
              </td>
              <td className={`border-2 px-5 border-black text-center bg-${item.heartrate ? item.heartrate.colors : ''}`}>{item.email ? item.email : '-'}</td>
              <td className={`border-2 px-5 border-black text-center bg-${item.heartrate ? item.heartrate.colors : ''}`}>{item.jenis_kelamin ? item.jenis_kelamin : '-'}</td>
              <td className={`cursor-pointer mt-1 hover:text-[#f52f57] border-2 px-5 border-black text-center bg-${item.heartrate ? item.heartrate.colors : ''}`} onClick={() => handleDropdown(item.id)}>
                {dropdown[item.id] ? (
                  <>
                    <Dropdown patient={item} />
                  </>
                ) : (
                  <p>...</p>
                )}
              </td>
              <td className={`border-2 border-black text-center bg-${item.heartrate ? item.heartrate.colors : ''}`}>
                <Link href={`/detail/${item.slug}`}>Detail Pasien</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Pasien;
