'use client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Dropdown from '../Components/Dropdown';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { ArrowDown, ArrowUpDown, Route, Search } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import SearchInput from '../Components/SearchInput';

const Pasien = () => {
  const router = useRouter();
  const [pasien, setPasien] = useState([]);
  const [filteredPasien, setFilteredPasien] = useState([]);
  const [loading, setLoading] = useState(true);
  const skeleton = <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  const [sortPerawatan, setSortPerawatan] = useState(false);
  const [sortTotalEws, setSortTotalEws] = useState(false);
  const [dropdown, setDropdown] = useState({
    pasien: false,
  });
  const [notifications, setNotifications] = useState([]);

  let redColor = 'bg-red-500';
  let yellowColor = 'bg-yellow-400';
  let orangeColor = 'bg-orange-500';
  let codeBlue = 'bg-sky-500';

  const { toast } = useToast();
  const fetchData = async () => {
    await axios
      .get('https://flowbeat.web.id/api/patients')
      .then((response) => {
        setPasien(response?.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  const fetchNotification = async () => {
    await axios
      .get('https://flowbeat.web.id/api/notifications')
      // await axios.get('http://192.168.18.8:8080/TUGAS-AKHIR/backend_laravel/public/api/notifications')
      .then((res) => {
        setNotifications(res.data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (keyword) => {
    const filtered = pasien.filter((item) => item.nama_lengkap.toLowerCase().includes(keyword.toLowerCase()));
    setFilteredPasien(filtered);
  };

  const handleDropdown = (ewsPatient) => {
    setDropdown((prevState) => ({
      ...prevState,
      [ewsPatient]: !prevState[ewsPatient],
    }));
  };

  const ubahPerawatan = async (slug, jenisPerawatanBaru) => {
    if (typeof window !== 'undefined') {
      axios
        .put(`https://flowbeat.web.id/api/profile/${slug}`, {
          perawatan: jenisPerawatanBaru,
        })
        .then(() => {
          const updatePerawatan = pasien.map((item) => {
            if (item.slug === slug) {
              return {
                ...item,
                perawatan: jenisPerawatanBaru,
              };
            }
            return item;
          });
          setPasien(updatePerawatan);
          toast({
            title: 'Ubah Perawatan',
            description: 'Jenis perawatan berhasil diubah',
          });
        })
        .catch(() => {
          toast({
            variant: 'destructive',
            title: 'Ubah Perawatan',
            description: 'Jenis perawatan yang sama tidak dapat diubah',
            action: <ToastAction altText="Coba lagi">Coba lagi</ToastAction>,
          });
        });
    }
  };

  const DropdownPerawatan = ({ item }) => {
    return (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{item.perawatan}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup value={item.perawatan} onValueChange={(val) => ubahPerawatan(item.slug, val)}>
              <DropdownMenuRadioItem value="Rawat inap">Rawat inap</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Rawat jalan">Rawat jalan</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  const handleSortPerawatan = () => {
    if (!sortPerawatan) {
      const sortedPasienAsc = [...pasien].sort((a, b) => {
        if (a.perawatan < b.perawatan) return -1;
        if (a.perawatan > b.perawatan) return 1;
        return 0;
      });
      setPasien(sortedPasienAsc);
      setSortPerawatan(true);
    } else {
      // Lakukan sorting secara descending
      const sortedPasienDesc = [...pasien].sort((a, b) => {
        if (a.perawatan > b.perawatan) return -1;
        if (a.perawatan < b.perawatan) return 1;
        return 0;
      });
      setPasien(sortedPasienDesc);
      setSortPerawatan(false);
    }
  };

  const handleSortEWS = () => {
    if (!sortTotalEws) {
      const sortedPasien = pasien.slice().sort((a, b) => {
        const calcEwsA = Number(a.heartrate?.score || 0) + Number(a.oxygen_saturation?.score || 0) + Number(a.nibp?.score || 0);
        const calcEwsB = Number(b.heartrate?.score || 0) + Number(b.oxygen_saturation?.score || 0) + Number(b.nibp?.score || 0);
        return calcEwsB - calcEwsA;
      });
      setPasien(sortedPasien);
      setSortTotalEws(true);
    } else {
      const sortedPasien = pasien.slice().sort((b, a) => {
        const calcEwsA = Number(a.heartrate?.score || 0) + Number(a.oxygen_saturation?.score || 0) + Number(a.nibp?.score || 0);
        const calcEwsB = Number(b.heartrate?.score || 0) + Number(b.oxygen_saturation?.score || 0) + Number(b.nibp?.score || 0);
        return calcEwsB - calcEwsA;
      });
      setPasien(sortedPasien);
      setSortTotalEws(false);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="ml-14 mt-10 text-3xl font-bold">Daftar Pasien</h1>
      <div className="border-[1px] p-10 border-slate-200 dark:border-slate-800 rounded-lg mt-5 mx-20">
        <SearchInput onSearch={handleSearch} />
        <Table className="w-max flex flex-col gap-5">
          <TableHeader className="w-max flex gap-12">
            <TableRow>
              <TableHead className="w-[70px] text-center">MRN</TableHead>
              <TableHead className="text-center w-[200px]">Nama Pasien</TableHead>
              <TableHead className="text-center">
                <Button variant="ghost" onClick={handleSortPerawatan}>
                  <ArrowUpDown size={18} /> Perawatan
                </Button>
              </TableHead>
              <TableHead className="text-center">EWS</TableHead>
              <TableHead className="text-center">
                <Button variant="ghost" onClick={handleSortEWS}>
                  <ArrowUpDown size={18} /> Total EWS
                </Button>
              </TableHead>
              <TableHead className="text-center">Detail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell>{skeleton} </TableCell>
                <TableCell>{skeleton}</TableCell>
                <TableCell>{skeleton}</TableCell>
                <TableCell>{skeleton}</TableCell>
                <TableCell>{skeleton}</TableCell>
                <TableCell>{skeleton}</TableCell>
              </TableRow>
            ) : filteredPasien.length > 0 ? (
              filteredPasien.map((item, i) => {
                const calcEws = Number(item.heartrate?.score || 0) + Number(item.oxygen_saturation?.score || 0) + Number(item.nibp?.score || 0);
                let cellColor = codeBlue;
                if (calcEws >= 1 && calcEws <= 4) {
                  cellColor = yellowColor;
                } else if (calcEws >= 5 && calcEws <= 6) {
                  cellColor = orangeColor;
                } else if (calcEws >= 7 && calcEws <= 8) {
                  cellColor = redColor;
                } else {
                  cellColor;
                }
                return (
                  <TableRow className="text-center flex gap-8" key={i}>
                    <TableCell className="text-center w-[37px]">{i + 1}</TableCell>
                    <TableCell className="text-center w-[200px]">{item.nama_lengkap}</TableCell>
                    <TableCell className="-ml-5 text-center w-[100px]">
                      <DropdownPerawatan item={item} />
                    </TableCell>
                    <TableCell className="text-center w-[100px]" onClick={() => handleDropdown(item.id)}>
                      {dropdown[item.id] ? (
                        <>
                          <Dropdown patient={item} />
                        </>
                      ) : (
                        <Button variant="ghost">
                          HR: {item.heartrate?.heart_beats} <ArrowDown size={14} />
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className={`text-center px-7  ${cellColor} w-[10px]`}>{calcEws}</TableCell>
                    <TableCell>
                      <button onClick={() => router.push(`/detail/${item.slug}`)} className="w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-100">
                        <ChevronRightIcon className="h-4 w-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              pasien.map((item, i) => {
                const calcEws = Number(item.heartrate?.score || 0) + Number(item.oxygen_saturation?.score || 0) + Number(item.nibp?.score || 0);
                let cellColor = codeBlue;
                if (calcEws >= 1 && calcEws <= 4) {
                  cellColor = yellowColor;
                } else if (calcEws >= 5 && calcEws <= 6) {
                  cellColor = orangeColor;
                } else if (calcEws >= 7 && calcEws <= 8) {
                  cellColor = redColor;
                } else {
                  cellColor;
                }
                return (
                  <TableRow className="text-center flex gap-8" key={i}>
                    <TableCell className="text-center w-[37px]">{i + 1}</TableCell>
                    <TableCell className="text-center w-[200px]">{item.nama_lengkap}</TableCell>
                    <TableCell className="-ml-5 text-center w-[100px]">
                      <DropdownPerawatan item={item} />
                    </TableCell>
                    <TableCell className="text-center w-[100px]" onClick={() => handleDropdown(item.id)}>
                      {dropdown[item.id] ? (
                        <>
                          <Dropdown patient={item} />
                        </>
                      ) : (
                        <Button variant="ghost">
                          HR: {item.heartrate?.heart_beats} <ArrowDown size={14} />
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className={`text-center px-10 ${cellColor} w-[10px]`}>
                      <p className="text-center">{calcEws}</p>
                    </TableCell>
                    <TableCell>
                      <button onClick={() => router.push(`/detail/${item.slug}`)} className="w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-100">
                        <ChevronRightIcon className="h-4 w-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default Pasien;
