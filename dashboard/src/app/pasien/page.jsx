'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Dropdown from '../Components/Dropdown';
import Link from 'next/link';
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronRightIcon } from "@radix-ui/react-icons"
import { ArrowDown, ArrowUpDown } from "lucide-react"
import { ArrowBigDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from '@/components/ui/input';


const Pasien = () => {
  const [pasien, setPasien] = useState([]);
  const [loading, setLoading] = useState(true)
  const skeleton = <Skeleton className="w-[100px] h-[20px] rounded-full" />
  const [sortPerawatan, setSortPerawatan] = useState(false)
  const [dropdown, setDropdown] = useState({
    pasien: false,
  });
  
  let redColor = 'bg-red-500'
  let yellowColor = "bg-yellow-400"
  let orangeColor = 'bg-orange-500'
  let codeBlue = 'bg-sky-500'

  const { toast } = useToast()
  const fetchData = async () => {
    axios
      // .get('http://192.168.18.8:8080/TUGAS-AKHIR/backend_laravel/public/api/patients')
      .get('https://dashboard-backend.000webhostapp.com/api/patients')
      .then((response) => {
        setPasien(response.data)
        setLoading(false)
      })
      .catch((error) => console.log(error))
  };
  useEffect(() => {
    fetchData()
  }, [])

  const handleDropdown = (ewsPatient) => {
    setDropdown((prevState) => ({
      ...prevState,
      [ewsPatient]: !prevState[ewsPatient],
    }));
  }

  const ubahPerawatan = async (slug, jenisPerawatanBaru) => {
    if (typeof window !== "undefined") {
      axios.put(`http://192.168.18.8:8080/TUGAS-AKHIR/backend_laravel/public/api/profile/${slug}`, {
        perawatan: jenisPerawatanBaru
      }).then(() => {
        const updatePerawatan = pasien.map((item) => {
          if (item.slug === slug) {
            return {
              ...item,
              perawatan: jenisPerawatanBaru
            }
          }
          return item
        })
        setPasien(updatePerawatan)
        toast({
          title: "Ubah Perawatan",
          description: "Jenis perawatan berhasil diubah"
        })
      }).catch(() => {
        toast({
          variant: "destructive",
          title: "Ubah Perawatan",
          description: "Jenis perawatan yang sama tidak dapat diubah",
          action: <ToastAction altText="Coba lagi">Coba lagi</ToastAction>,
        })
      })
    }
  }

  const DropdownPerawatan = ({item}) => {
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
    )
  }

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
  }

  return (
    <div className="flex flex-col">
      <h1 className="ml-10 mt-10 text-3xl font-bold">Daftar Pasien</h1>
      <div className='border-[1px] p-10 border-slate-200 dark:border-slate-800 rounded-lg mt-5 mx-10'>
        <Input placeholder="Filter nama pasien..." className="w-[50%] mb-4" />
        <Table className="w-max">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[70px] text-center">MRN</TableHead>
              <TableHead className="text-center">Nama Pasien</TableHead>
              <TableHead className="text-center"><Button variant="ghost" onClick={handleSortPerawatan}><ArrowUpDown size={18}/> Perawatan</Button></TableHead>
              <TableHead className="text-center">EWS</TableHead>
              <TableHead className="text-center">Total EWS</TableHead>
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
            ) : (
              pasien.map((item, i) => {
                const calcEws = item.heartrate.score + item.oxygen_saturation.score + item.nibp.score
                let cellColor = codeBlue
                if (calcEws >= 1 && calcEws <= 4) {
                  cellColor = yellowColor
                } else if (calcEws >= 5 && calcEws <= 6) {
                  cellColor = orangeColor
                } else if (calcEws >= 7 && calcEws <= 8) {
                  cellColor = redColor
                } else {
                  cellColor
                }
                return (
                  <TableRow key={i}>
                    <TableCell className="text-center">{i + 1}</TableCell>
                    <TableCell>{item.nama_lengkap}</TableCell>
                    <TableCell><DropdownPerawatan item={item} /></TableCell>
                    <TableCell onClick={() => handleDropdown(item.id)}>
                      {dropdown[item.id] ? (
                        <>
                          <Dropdown patient={item} />
                        </>
                      ) : (
                        <Button variant="ghost">HR: {item.heartrate.heart_beats} <ArrowDown size={14} /> </Button>
                      )}
                    </TableCell>
                    <TableCell className={`text-center ${cellColor} w-[10px]`}>{calcEws}</TableCell>
                    <TableCell>
                      <Link href={`/detail/${item.slug}`}>
                        <Button variant="link">
                          <Button variant="outline" className="ml-2">
                            <ChevronRightIcon className="h-4 w-4" />
                          </Button>
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
{/* <table className="border-2 border-black mt-5 mx-10 w-max">
<thead className="border-2 border-black ">
  <tr className="border-2 border-black">
    <th className="border-2 border-black p-3 text-lg">No</th>
    <th className="border-2 border-black p-8 text-lg">Nama Lengkap</th>
    <th className="border-2 border-black p-8 px-18 text-lg">Perawatan</th>
    <th className="border-2 border-black p-8 text-lg">EWS</th>
    <th className="border-2 border-black p-8 text-lg">Detail</th>
  </tr>
</thead>
<tbody>
  {pasien.map((item, i) => (
    <tr key={item.id}>
      <td className="border-2 py-4 border-black text-center">{i + 1}</td>
      <td className={`border-2 border-black text-center bg-${item.heartrate ? item.heartrate.colors : ''}`}>{item.nama_lengkap}</td>
      <td className={`border-2 border-black text-center bg-${item.heartrate ? item.heartrate.colors : ''}`}>
        <DropdownPerawatan item={item}/>
      </td>
      <td className={`cursor-pointer mt-1 hover:text-[#f52f57] border-2 px-5 border-black text-center bg-${item.heartrate ? item.heartrate.colors : ''}`} onClick={() => handleDropdown(item.id)}>
        {dropdown[item.id] ? (
          <>
            <Dropdown patient={item} />
          </>
        ) : (
          <p>Selengkapnya...</p>
        )}
      </td>
      <td className={`border-2 border-black text-center bg-${item.heartrate ? item.heartrate.colors : ''}`}>
        <Link href={`/detail/${item.slug}`}>Detail Pasien</Link>
      </td>
    </tr>
  ))}
</tbody>
</table> */}
export default Pasien;
