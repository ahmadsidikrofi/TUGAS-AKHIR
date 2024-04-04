'use client';

import '@/app/globals.css';
import Link from 'next/link';
import { useState } from 'react';
import { UserSquare, CaretUp, Gauge, CaretDown, Info } from '@phosphor-icons/react/dist/ssr';
import { DarkTheme } from '../DarkTheme';
import { HoverMenu } from '../HoverMenu';

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
    <div className="flex flex-col w-80 sticky top-0 h-screen bg-transparent p-4 gap-4 shadow-lg shadow-black ">
      <div className='mx-5 mt-7 flex justify-center'>
        <DarkTheme />
      </div>
      <h1 className="text-2xl font-bold mb-6 text-center text-[#000 ]">Dashboard Jantung</h1>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4 ">
          <Link
            href={'/'}
            onClick={() => handelActive('dashboard')}
            className={`flex justify-between cursor-pointer hover:bg-[#000] hover:rounded-lg hover:text-white gap-4 font-bold text-lg items-center text-left rounded-lg focus:font-bold p-4 ${
              active === 'dashboard' ? 'bg-black text-white font-bold rounded-lg' : 'null'
            }`}
          >
            <div className=" flex gap-4 font-bold text-lg items-center ">
              <Gauge size={32} />
              <p>Dashboard</p>
            </div>
          </Link>
          {/* <Link
            href={'/pasien'}
            onClick={() => handelActive('pasien')}
            className={`flex justify-between cursor-pointer hover:bg-[#000] hover:rounded-lg hover:text-white gap-4 font-bold text-lg items-center text-left rounded-lg focus:font-bold block p-4 ${
              active === 'pasien' ? 'bg-[#000] text-white font-bold rounded-lg' : 'null'
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
              <li className="hover:text-[#3559E0] text-white ml-4 cursor-pointer">
                <button>Rawat Inap</button>
              </li>
              <li className="hover:text-[#3559E0] ml-4 text-white cursor-pointer">
                <button>Rawat Jalan</button>
              </li>
            </ul>
          ) : (
            <ul className="hidden"></ul>
          )} */}

          <div className='hover:bg-[#000] hover:rounded-lg hover:text-white p-4'>
            <HoverMenu />
          </div>
          <div
            onClick={() => handelActive('help')}
            className={`flex justify-between cursor-pointer hover:bg-[#000] hover:rounded-lg hover:text-white gap-4 font-bold text-lg items-center text-left rounded-lg focus:font-bold block p-4 ${
              active === 'help' ? 'bg-[#000] text-white font-bold rounded-lg' : 'null'
            }`}
          >
            <button>
              <div>
                <Link className=" flex gap-4 font-bold text-lg items-center" href="/help">
                  <Info size={32} className="bold" />
                  Help
                </Link>
              </div>
            </button>
          </div>
        </div>
        <div className=" flex justify-center">
          <button className="text-white hover:text-[#000] font-bold text-lg mb-10 bg-[#000] rounded-lg w-3/4 hover:bg-[#fff] text-center p-4">
            <Link href="auth/login">Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
