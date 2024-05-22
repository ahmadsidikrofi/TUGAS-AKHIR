'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Pencil, Eye, ArrowCircleLeft, PlusCircle } from '@phosphor-icons/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DelNotes from '../Components/DelNotes';
import NotesDetail from '@/app/Components/NotesDetail';
const DetailNotes = ({ params: { slug } }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const skeleton = <Skeleton className="w-[50px] h-[20px] rounded-full dark:bg-slate-200" />;
  const fetchData = async () => {
    await axios.get(`https://flowbeat.web.id/api/notes/${slug}`).then((response) => {
      console.log(response.data);
      for (let i = 0; i < response.data.length; i++) {
        setData(response.data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 ml-2 mt-10 text-3xl font-bold">
        <button onClick={() => router.back()}>
          <ArrowCircleLeft size={40} />
        </button>
        <h1 className="text-[#5d87ff]">Notes Pasien</h1>
      </div>

      <div className="mt-10 ml-10 w-full items-center">
        <Link href={`/notes/create/${slug}`} className="mb-5 bg-rose-500 w-32 h-10 flex gap-2 items-center text-center justify-center rounded-lg p-1 text-white">
          <PlusCircle size={22} />
          <p className="font-bold">Create</p>
        </Link>
        <Table className="w-max flex flex-col p-10 border rounded-lg gap-2">
          <TableHeader className="w-max flex gap-12">
            <TableRow className="w-max justify-center  items-center flex">
              <TableHead className="text-center">MRN</TableHead>
              <TableHead className="mx-40 text-center w-full">Nama Title</TableHead>
              <TableHead className="text-center ml-12 mr-10">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow className="w-full text-center flex gap-2">
                <TableCell className="text-center">{skeleton}</TableCell>
                <TableCell className="text-center ml-36 w-full">{skeleton}</TableCell>
                <TableCell className="text-center ml-40 mr-10">{skeleton}</TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => (
                <TableRow className="w-90 text-center justify-center items-center flex gap-10" key={index}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className=" mx-32 text-center w-36">{item.title}</TableCell>
                  <TableCell className="text-center w-full">{item.created_at}</TableCell>
                  <TableCell className=" flex gap-2 items-center  text-center">
                    <NotesDetail title={item.title} description={item.description} />
                    <Link className="bg-[#5d87ff] h-8 rounded-lg p-1" href={`/notes/${item.slug}`}>
                      <Pencil size={22} />
                    </Link>
                    <DelNotes id={item.id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DetailNotes;
