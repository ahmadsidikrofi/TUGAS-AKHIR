'use client';

import ChartJantung from '../Components/ChartJantung';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Dropdown from '../Components/Dropdown';
import Link from 'next/link';
import { useToast } from "@/components/ui/use-toast"
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


const Pasien = () => {
  const [pasien, setPasien] = useState([]);
  const [dropdown, setDropdown] = useState({
    pasien: false,
  });
  const { toast } = useToast()
  const fetchData = async () => {
    axios
      .get('https://6c1e-180-246-74-21.ngrok-free.app/TUGAS-AKHIR/backend_laravel/public/api/patients')
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
    if (typeof window !== "undefined") {
      axios.put(`https://6c1e-180-246-74-21.ngrok-free.app/TUGAS-AKHIR/backend_laravel/public/api/profile-update/${slug}`, {
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

  return (
    <div className="flex flex-col">
      <h1 className="ml-10 mt-10 text-3xl font-bold">Daftar Pasien</h1>
      <div className='border-[1px] p-10 border-slate-200 dark:border-slate-800 rounded-lg mt-5 mx-10'>
        <Table className="w-max">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>Nama Lengkap</TableHead>
              <TableHead>Perawatan</TableHead>
              <TableHead>EWS</TableHead>
              <TableHead>Detail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pasien.map((item, i) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>{item.nama_lengkap}</TableCell>
                <TableCell>
                  <DropdownPerawatan item={item}/>
                </TableCell>
                <TableCell className="text-right" onClick={() => handleDropdown(item.id)}>
                  {dropdown[item.id] ? (
                    <>
                      <Dropdown patient={item} />
                    </>
                  ) : (
                    <p>Selengkapnya...</p>
                  )}
                </TableCell>
                <TableCell>
                  <Link href={`/detail/${item.slug}`}>Detail Pasien</Link>
                </TableCell>
              </TableRow>
            ))}
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
