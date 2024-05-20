'use client';

import '@/app/globals.css';
import Link from 'next/link';
import { useState } from 'react';
import { DarkTheme } from '../DarkTheme';
import { HoverMenu } from '../HoverMenu';
import { Gauge } from 'lucide-react';
import { Question, Note, List } from '@phosphor-icons/react';
import Notif from '../Notif';
import Image from 'next/image';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const MiniSideBar = () => {
  const [active, setActive] = useState('');

  const handelActive = (menu) => {
    if (active !== menu) {
      setActive(menu);
    }
  };
  return (
    <div className="lg:hidden">
      <Sheet>
        <div className="flex flex-col hover:shadow-lg rounded-lg shadow-sm gap-5 items-center justify-center mt-9 p-2 mx-4 absolute top-0 ">
          <SheetTrigger className=" hover:rounded-[18px] hover:cursor-pointer hover: transition-all ease-linear">
            <List size={32} />
          </SheetTrigger>
        </div>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>
              <div className="mx-5 mt-7 flex flex-col p-2 rounded-lg items-center gap-3 justify-center">
                <h1 className="text-2xl font-bold text-center text-[#5d87ff] dark:text-white">Dashboard Jantung</h1>
                <div className="mx-5 mt-7 flex p-2 rounded-lg items-center gap-3 justify-center">
                  <DarkTheme />
                  <Notif />
                </div>
              </div>
            </SheetTitle>
            <SheetDescription>
              <div className="flex flex-col w-full justify-between h-full">
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
                <div className=" flex flex-col mt-14 gap-2 items-center justify-center">
                  <h1 className="text-lg font-bold">Support By:</h1>
                  <Image src="/img/telu.png" alt="" height={120} width={120} priority />
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default MiniSideBar;
