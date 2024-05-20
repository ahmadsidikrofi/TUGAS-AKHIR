import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Bell, BellRinging } from '@phosphor-icons/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Clock } from '@phosphor-icons/react';

const Notif = () => {
  const [notif, setNotif] = useState([]);
  const [jumlah, setJumlah] = useState(0);
  const dataNotif = async () => {
    await axios.get('https://flowbeat.web.id/api/notifications').then((res) => {
      setNotif(res.data);
      setJumlah(res.data.length);
    });
  };
  useEffect(() => {
    dataNotif();
  }, []);
  return (
    <Sheet>
      {jumlah > 12 ? (
        <SheetTrigger>
          <Bell className="cursor-pointer pt-1" size={23} />
        </SheetTrigger>
      ) : (
        <SheetTrigger className="border text-center p-2 rounded-full">
          <BellRinging className="cursor-pointer pt-1 text-[#5d87ff]" size={23} />
        </SheetTrigger>
      )}
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle className="text-2xl my-5">Notifikasi</SheetTitle>
          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-rose-500">Notifikasi terkini...</h1>
            {notif.map((items, index) => (
              <div className="flex flex-col gap-3" key={index}>
                {items.slice(0, 12).map((item, index2) => {
                  if (item.total_score >= 5 && item.total_score <= 6) {
                    return (
                      <SheetDescription key={index2} className="text-black py-5 h-60 bg-orange-500 rounded-lg shadow-lg px-5">
                        <p className="font-bold text-lg">{item.nama_lengkap}</p>
                        <p className="font-bold">Total Score saat ini {item.total_score}</p>
                        <p className="text-sm text-black mt-5">Lakukan eskalasi perawatan dan frekuensi monitoring tiap jam. Pertimbangkan eskalasi perawatan ke unit intensif care edukasi keluarga pasien</p>
                        <p className="mt-5 flex gap-1 justify-end w-full items-center relative bottom-1 items-center text-sm font-bold text-black">
                          <Clock className="text-black" size={22} />
                          <p className="text-balack">{item.created_at}</p>
                        </p>
                      </SheetDescription>
                    );
                  } else if (item.total_score >= 3 && item.total_score <= 4) {
                    return (
                      <SheetDescription key={index2} className="text-black py-5 h-60 bg-yellow-400 rounded-lg shadow-lg px-5">
                        <p className="font-bold text-lg">{item.nama_lengkap}</p>
                        <p className="font-bold">Total Score saat ini {item.total_score}</p>
                        <p className="text-sm text-black mt-5">Assessmen dilakukan oleh perawat senior (maks respon 5 menit) dengan eskalasi perawatan monitoring per 4-6 jam</p>
                        <p className="mt-5 flex gap-1 justify-end  w-full items-center relative top-5 items-center text-sm font-bold text-black">
                          <Clock className="text-black" size={22} />
                          <p className="text-black">{item.created_at}</p>
                        </p>
                      </SheetDescription>
                    );
                  } else if (item.total_score >= 7 && item.total_score <= 8) {
                    return (
                      <SheetDescription key={index2} className="text-black py-5 h-60 bg-red-500 rounded-lg shadow-lg px-5">
                        <p className="font-bold text-lg">{item.nama_lengkap}</p>
                        <p className="font-bold">Total Score saat ini {item.total_score}</p>
                        <p className="text-sm text-black mt-5">Respon maksimal 10 menit beri informasi ke DPJP dan edukasi keluarga pasien</p>
                        <p className="mt-5 flex gap-1 justify-end w-full items-center relative top-9 items-center text-sm font-bold text-black">
                          <Clock className="text-black" size={22} />
                          <p className="text-black">{item.created_at}</p>
                        </p>
                      </SheetDescription>
                    );
                  }
                })}
              </div>
            ))}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
export default Notif;
