'use client';

import '@/app/globals.css';
import Link from 'next/link';
import { useState } from 'react';
import { UserSquare, CaretUp, Gauge, CaretDown, Info } from '@phosphor-icons/react/dist/ssr';

const Sidebar = () => {
  const [sidebarMenu, setSideBarMenu] = useState(false);
  const [active, setActive] = useState(false);

  const handelActive = (menu) => {
    if (active === menu) {
      setActive(false);
    } else {
      setActive(menu);
    }
  };
  return (
    <div className="flex flex-col w-80 sticky top-0 h-screen bg-gray-800 text-white p-4 gap-4 shadow shadow-black ">
      <h1 className="text-2xl font-bold mb-6 text-center text-[#f52f57] mt-12">Dashboard Jantung</h1>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4 ">
          <Link
            href={'/'}
            onClick={() => handelActive('dashboard')}
            className={`flex justify-between cursor-pointer hover:bg-gray-700 hover:rounded-lg hover:text-white focus:bg-white gap-4 font-bold text-lg items-center focus:text-black text-left rounded-lg focus:font-bold p-4 w-full ${
              active === 'dashboard' ? 'bg-white text-black font-bold rounded-lg' : 'null'
            }`}
          >
            <div className=" flex gap-4 font-bold text-lg items-center ">
              <Gauge size={32} />
              <p>Dashboard</p>
            </div>
          </Link>
          <Link
            href={'/pasien'}
            onClick={() => handelActive('pasien')}
            className={`flex justify-between cursor-pointer hover:bg-gray-700 hover:rounded-lg hover:text-white focus:bg-white gap-4 font-bold text-lg items-center focus:text-black text-left rounded-lg focus:font-bold block p-4 ${
              active === 'pasien' ? 'bg-white text-black font-bold rounded-lg' : 'null'
            }`}
          >
            <div className="flex gap-4 font-bold text-lg items-center">
              <UserSquare size={32} />
              Pasien
            </div>
            <div className="cursor-pointer mt-1 hover:text-[#f52f57]" onClick={() => setSideBarMenu(!sidebarMenu)}>
              {!sidebarMenu ? <CaretDown size={20} /> : <CaretUp size={20} />}
            </div>
          </Link>
          {sidebarMenu ? (
            <ul className="flex flex-col font-bold rounded-lg  ml-7 mr-4 gap-6 ">
              <li className="hover:text-[#f52f57] text-white ml-4 cursor-pointer">
                <button>Rawat Inap</button>
              </li>
              <li className="hover:text-[#f52f57] ml-4 text-white cursor-pointer">
                <button>Rawat Jalan</button>
              </li>
            </ul>
          ) : (
            <ul className="hidden"></ul>
          )}
          <div
            onClick={() => handelActive('help')}
            className={`flex justify-between cursor-pointer hover:bg-gray-700 hover:rounded-lg hover:text-white focus:bg-white gap-4 font-bold text-lg items-center flex focus:text-black text-left rounded-lg focus:font-bold block p-4 ${
              active === 'help' ? 'bg-white text-black font-bold rounded-lg' : 'null'
            }`}
          >
            <button>
              <div>
                <Link className=" flex gap-4 font-bold text-lg items-center" href="/help">
                  <Info size={32} />
                  Help
                </Link>
              </div>
            </button>
          </div>
        </div>
        <div className=" flex justify-center">
          <button className="text-white font-bold text-lg mb-10 bg-[#f52f57] rounded-lg w-3/4 hover:bg-gray-700 text-center p-4">
            <Link href="auth/login">Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
