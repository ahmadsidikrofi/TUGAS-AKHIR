'use client';

import '@/app/globals.css';
import Link from 'next/link';
import { useState } from 'react';
import { DarkTheme } from '../DarkTheme';
import { HoverMenu } from '../HoverMenu';
import { Gauge, Import } from 'lucide-react';
import { Question, Note, Hamburger } from '@phosphor-icons/react';
import Notif from '../Notif';
import Image from 'next/image';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [active, setActive] = useState('');

  const handelActive = (menu) => {
    if (active !== menu) {
      setActive(menu);
    }
  };
  // const handleOpenSidebar = () => {
  //   setIsSidebarOpen((prevState) => !prevState);
  // };
  // <div className={`sticky shadow-lg top-0 ${isSidebarOpen ? 'hidden' : 'flex'}`}>
  //   <button onClick={handleOpenSidebar}>
  //     <Hamburger className="cursor-pointer" color="#5d87ff" size={23} />
  //   </button>
  // </div>
  // <div className={`sticky shadow-lg top-0 lg:hidden xl:hidden 2xl:hidden`}>
  //   <button onClick={handleOpenSidebar}>
  //     <Hamburger className="cursor-pointer" color="#5d87ff" size={23} />
  //   </button>
  // </div>
  return (
    <>
      <div className="lg:flex xl:flex 2xl:flex md:flex sm:hidden max-sm:hidden">
        <div className={`flex flex-col w-80 sticky top-0 h-screen bg-transparent p-4 gap-4 shadow dark:shadow-[0_0_20px_-5px_rgba(253,247,255,0.3)] hidden sm:hidden md:hidden max-lg:hidden lg:flex xl:flex 2xl:flex`}>
          <div className="flex flex-col justify-between h-full">
            <div className="mx-5 mt-7 flex p-2 rounded-lg items-center gap-3 justify-center">
              <DarkTheme />
              <Notif />
            </div>
            <h1 className="text-2xl font-bold mb-6 text-center text-[#5d87ff] dark:text-white">Dashboard Jantung</h1>
            <div className="flex flex-col gap-4">
              <Link
                href={'/'}
                onClick={() => handelActive('dashboard')}
                className={`flex justify-between cursor-pointer gap-4 text-lg items-center rounded-[8px] p-4 text-[#5d87ff] dark:text-white hover:bg-blue-400 dark:hover:bg-white hover:rounded-[18px] hover:text-white dark:hover:text-black transition-all ease-linear
                  ${active === 'dashboard' ? 'bg-[#5d87ff] text-white rounded-[8px]' : 'null'}`}
              >
                <div className="flex gap-4 font-bold text-lg items-center">
                  <Gauge size={32} />
                  <p>Dashboard</p>
                </div>
              </Link>
              <div
                onMouseEnter={() => setTimeout(() => handelActive('pasien'), 1000)}
                className="flex justify-between cursor-pointer gap-4 text-lg items-center rounded-[8px] p-4 text-[#5d87ff] dark:text-white hover:bg-blue-400 dark:hover:bg-white hover:rounded-[18px] hover:text-white dark:hover:text-black transition-all ease-linear"
              >
                <HoverMenu />
              </div>
              <Link
                href={'/help'}
                onClick={() => handelActive('help')}
                className={`flex justify-between cursor-pointer gap-4 text-lg items-center rounded-[8px] p-4 text-[#5d87ff] dark:text-white hover:bg-blue-400 dark:hover:bg-white hover:rounded-[18px] hover:text-white dark:hover:text-black transition-all ease-linear 
                    ${active === 'help' ? 'bg-[#5d87ff] text-white rounded-[8px]' : 'null'}`}
              >
                <div className="flex gap-4 font-bold text-lg items-center">
                  <Question size={32} />
                  <p>Help</p>
                </div>
              </Link>
              <Link
                href={'/notes'}
                onClick={() => handelActive('notes')}
                className={`flex justify-between cursor-pointer gap-4 text-lg items-center rounded-[8px] p-4 text-[#5d87ff] dark:text-white hover:bg-blue-400 dark:hover:bg-white hover:rounded-[18px] hover:text-white dark:hover:text-black transition-all ease-linear 
                    ${active === 'notes' ? 'bg-[#5d87ff] text-white rounded-[8px]' : 'null'}`}
              >
                <div className="flex gap-4 font-bold text-lg items-center">
                  <Note size={32} />
                  <p>Notes</p>
                </div>
              </Link>
            </div>
            <div className=" flex flex-col mb-2 gap-2 items-center justify-center">
              <h1 className="text-lg font-bold">Support By:</h1>
              <Image src="/img/telu.png" alt="" height={120} width={120} priority />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <Sheet>
          <div className="flex flex-col gap-5 items-center justify-center mt-10 p-2 mx-4 absolute top-0 border rounded-full">
            <SheetTrigger className="hover:border hover:rounded-full hover:p-1 hover:transition-all hover:ease-">
              <Hamburger className="cursor-pointer" color="#5d87ff" size={23} />
            </SheetTrigger>
          </div>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>
                <div className="mx-5 mt-7 flex p-2 rounded-lg items-center gap-3 justify-center">
                  <h1 className="text-2xl font-bold mb-6 text-center text-[#5d87ff] dark:text-white">Dashboard Jantung</h1>
                  <DarkTheme />
                </div>
              </SheetTitle>
              <SheetDescription>
                <div className="flex flex-col justify-between h-full">
                  <div className="flex flex-col gap-4">
                    <Link
                      href={'/'}
                      onClick={() => handelActive('dashboard')}
                      className={`flex justify-between cursor-pointer gap-4 text-lg items-center rounded-[8px] p-4 text-[#5d87ff] dark:text-white hover:bg-blue-400 dark:hover:bg-white hover:rounded-[18px] hover:text-white dark:hover:text-black transition-all ease-linear
                    ${active === 'dashboard' ? 'bg-[#5d87ff] text-white rounded-[8px]' : 'null'}`}
                    >
                      <div className="flex gap-4 font-bold text-lg items-center">
                        <Gauge size={32} />
                        <p>Dashboard</p>
                      </div>
                    </Link>
                    <div
                      onMouseEnter={() => setTimeout(() => handelActive('pasien'), 1000)}
                      className="flex justify-between cursor-pointer gap-4 text-lg items-center rounded-[8px] p-4 text-[#5d87ff] dark:text-white hover:bg-blue-400 dark:hover:bg-white hover:rounded-[18px] hover:text-white dark:hover:text-black transition-all ease-linear"
                    >
                      <HoverMenu />
                    </div>
                    <Link
                      href={'/help'}
                      onClick={() => handelActive('help')}
                      className={`flex justify-between cursor-pointer gap-4 text-lg items-center rounded-[8px] p-4 text-[#5d87ff] dark:text-white hover:bg-blue-400 dark:hover:bg-white hover:rounded-[18px] hover:text-white dark:hover:text-black transition-all ease-linear 
                      ${active === 'help' ? 'bg-[#5d87ff] text-white rounded-[8px]' : 'null'}`}
                    >
                      <div className="flex gap-4 font-bold text-lg items-center">
                        <Question size={32} />
                        <p>Help</p>
                      </div>
                    </Link>
                    <Link
                      href={'/notes'}
                      onClick={() => handelActive('notes')}
                      className={`flex justify-between cursor-pointer gap-4 text-lg items-center rounded-[8px] p-4 text-[#5d87ff] dark:text-white hover:bg-blue-400 dark:hover:bg-white hover:rounded-[18px] hover:text-white dark:hover:text-black transition-all ease-linear 
                      ${active === 'notes' ? 'bg-[#5d87ff] text-white rounded-[8px]' : 'null'}`}
                    >
                      <div className="flex gap-4 font-bold text-lg items-center">
                        <Note size={32} />
                        <p>Notes</p>
                      </div>
                    </Link>
                  </div>
                  <div className=" flex flex-col mb-2 gap-2 items-center justify-center">
                    <h1 className="text-lg font-bold">Support By:</h1>
                    <Image src="/img/telu.png" alt="" height={120} width={120} priority />
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
export default Sidebar;
