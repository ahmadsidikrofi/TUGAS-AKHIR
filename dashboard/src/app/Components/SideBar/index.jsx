'use client';

import '@/app/globals.css';
import Link from 'next/link';
import { useState } from 'react';
import { DarkTheme } from '../DarkTheme';
import { HoverMenu } from '../HoverMenu';
import { Gauge } from 'lucide-react';
import { Question } from '@phosphor-icons/react';

const Sidebar = () => {
  const [sidebarMenu, setSideBarMenu] = useState(false);
  const [active, setActive] = useState('');

  const handelActive = (menu) => {
    if (active !== menu) {
      setActive(menu);
    };
  }
  return (
    <div className="flex flex-col w-80 sticky top-0 h-screen bg-transparent p-4 gap-4 shadow dark:shadow-[0_0_20px_-5px_rgba(253,247,255,0.3)] max-sm:hidden lg:visible">
      <div className='mx-5 mt-7 flex justify-center'>
        <DarkTheme />
      </div>
      <h1 className="text-2xl font-bold mb-6 text-center text-[#5d87ff] dark:text-white">Dashboard Jantung</h1>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4">
          <Link
            href={'/'}
            onClick={() => handelActive('dashboard')}
            className={`flex justify-between cursor-pointer gap-4 text-lg items-center rounded-[8px] p-4 text-[#5d87ff] dark:text-white hover:bg-blue-400 dark:hover:bg-white hover:rounded-[18px] hover:text-white dark:hover:text-black transition-all ease-linear
             ${active === 'dashboard' ? 'bg-[#5d87ff] rounded-[8px]' : 'null'
            }`}
          >
            <div className="flex gap-4 font-bold text-lg items-center">
              <Gauge size={32} />
              <p>Dashboard</p>
            </div>
          </Link>
          <div onMouseEnter={() => setTimeout(() => handelActive('pasien'), 1000)} className='flex justify-between cursor-pointer gap-4 text-lg items-center rounded-[8px] p-4 text-[#5d87ff] dark:text-white hover:bg-blue-400 dark:hover:bg-white hover:rounded-[18px] hover:text-white dark:hover:text-black transition-all ease-linear'>
            <HoverMenu />
          </div>
          <Link
            href={'/help'}
            onClick={() => handelActive('help')}
            className={`flex justify-between cursor-pointer gap-4 text-lg items-center rounded-[8px] p-4 text-[#5d87ff] dark:text-white hover:bg-blue-400 dark:hover:bg-white hover:rounded-[18px] hover:text-white dark:hover:text-black transition-all ease-linear 
              ${active === 'help' ? 'bg-[#5d87ff] text-white rounded-[8px]' : 'null'
              }`}
          >
            <div className="flex gap-4 font-bold text-lg items-center">
              <Question size={32} />
              <p>Help</p>
            </div>
          </Link>
        </div>
        <div className=" flex justify-center">
          <button className="text-white hover:text-[#000] font-bold text-lg mb-10 bg-[#000] rounded-[8px] w-3/4 hover:bg-[#fff] text-center p-4">
            <Link href="auth/login">Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;


  // Link
  //   href={'/pasien'}
  //   onClick={() => handelActive('pasien')}
  //   className={`flex justify-between cursor-pointer hover:bg-[#000] hover:rounded-[8px] hover:text-white gap-4 font-bold text-lg items-center text-left rounded-[8px] focus:font-bold block p-4 ${
  //     active === 'pasien' ? 'bg-[#000] text-white font-bold rounded-[8px]' : 'null'
  //   }`}
  // >
  //   <div className="flex gap-4 font-bold text-lg items-center">
  //     <UserSquare size={32} />
  //     Pasien
  //   </div>
  //   <div className="cursor-pointer mt-1 hover:text-[#f52f57]" onClick={() => setSideBarMenu(!sidebarMenu)}>
  //     {!sidebarMenu ? <CaretDown size={20} /> : <CaretUp size={20} />}
  //   </div>
  // </Link> 
  // {sidebarMenu ? (
  //   <ul className="flex flex-col font-bold rounded-[8px]  ml-7 mr-4 gap-6 ">
  //     <li className="hover:text-[#3559E0] text-white ml-4 cursor-pointer">
  //       <button>Rawat Inap</button>
  //     </li>
  //     <li className="hover:text-[#3559E0] ml-4 text-white cursor-pointer">
  //       <button>Rawat Jalan</button>
  //     </li>
  //   </ul>
  // ) : (
  //   <ul className="hidden"></ul>
  // )}
