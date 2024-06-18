'use client';

import '@/app/globals.css';
import Link from 'next/link';
import { useState } from 'react';
import { DarkTheme } from '../DarkTheme';
import { SmileyNervous } from '@phosphor-icons/react';
import { Gauge } from 'lucide-react';
import { Question, Note, Database } from '@phosphor-icons/react';
import Notif from '../Notif';
import MiniSideBar from '../MiniSideBar';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [active, setActive] = useState('');

  const handelActive = (menu) => {
    if (active !== menu) {
      setActive(menu);
    }
  };
  return (
    <>
      <div className="lg:flex xl:flex 2xl:flex md:flex sm:hidden max-sm:hidden">
        <div className={`flex-col sticky top-0 h-screen bg-transparent p-4 gap-4 shadow dark:shadow-[0_0_20px_-5px_rgba(253,247,255,0.3)] hidden sm:hidden md:hidden max-lg:hidden lg:flex xl:flex 2xl:flex`}>
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-14">
              <div className="mx-5 mt-7 flex p-2 items-center gap-3 justify-center">
                <DarkTheme />
                <Notif />
              </div>
              <h1 className="text-2xl -mt-5 font-bold text-center text-[#5d87ff] dark:text-white">Dashboard Jantung</h1>
              <div className="flex flex-col gap-2 -mt-2">
                <Link
                  href={'/'}
                  onClick={() => handelActive('dashboard')}
                  className={`flex justify-between cursor-pointer py-4 text-lg w-[250px] items-center rounded-[8px] p-4 text-[#5d87ff] dark:text-white hover:bg-blue-400 dark:hover:bg-white hover:rounded-[18px] hover:text-white dark:hover:text-black transition-all ease-linear
                  ${active === 'dashboard' ? 'bg-[#5d87ff] text-white rounded-[8px]' : 'null'}`}
                >
                  <div className="flex gap-4 font-bold text-lg items-center">
                    <Gauge size={32} />
                    <p>Dashboard</p>
                  </div>
                </Link>
                <Link
                  href={'/pasien'}
                  onClick={() => handelActive('pasien')}
                  className={`flex cursor-pointer text-lg items-center rounded-[8px]  w-[250px] p-4 text-[#5d87ff] dark:text-white hover:bg-blue-400 dark:hover:bg-white hover:rounded-[18px] hover:text-white dark:hover:text-black transition-all ease-linear 
                    ${active === 'pasien' ? 'bg-[#5d87ff] text-white rounded-[8px]' : 'null'}`}
                >
                  <div className="flex gap-4 font-bold text-lg items-center">
                    <SmileyNervous size={32} />
                    <p>Pasien</p>
                  </div>
                </Link>

                <Link
                  href={'/notes'}
                  onClick={() => handelActive('notes')}
                  className={`flex justify-between cursor-pointer gap-4 w-[250px] text-lg items-center rounded-[8px] p-4 text-[#5d87ff] dark:text-white hover:bg-blue-400 dark:hover:bg-white hover:rounded-[18px] hover:text-white dark:hover:text-black transition-all ease-linear 
                    ${active === 'notes' ? 'bg-[#5d87ff] text-white rounded-[8px]' : 'null'}`}
                >
                  <div className="flex gap-4 font-bold text-lg items-center">
                    <Note size={32} />
                    <p>Notes</p>
                  </div>
                </Link>
                <Link
                  href={'/faq'}
                  onClick={() => handelActive('faq')}
                  className={`flex cursor-pointer text-lg items-center w-[250px] rounded-[8px] p-4 text-[#5d87ff] dark:text-white hover:bg-blue-400 dark:hover:bg-white hover:rounded-[18px] hover:text-white dark:hover:text-black transition-all ease-linear 
                    ${active === 'faq' ? 'bg-[#5d87ff] text-white rounded-[8px]' : 'null'}`}
                >
                  <div className="flex gap-4 font-bold text-lg items-center">
                    <Question size={32} />
                    <p>FAQ</p>
                  </div>
                </Link>
                <Link
                  href={'/masterdata'}
                  onClick={() => handelActive('master')}
                  className={`flex justify-between cursor-pointer gap-4 w-[250px] text-lg items-center rounded-[8px] p-4 text-[#5d87ff] dark:text-white hover:bg-blue-400 dark:hover:bg-white hover:rounded-[18px] hover:text-white dark:hover:text-black transition-all ease-linear 
                    ${active === 'master' ? 'bg-[#5d87ff] text-white rounded-[8px]' : 'null'}`}
                >
                  <div className="flex gap-4 font-bold text-lg items-center">
                    <Database size={32} />
                    <p>Master Data</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MiniSideBar />
    </>
  );
};
export default Sidebar;
