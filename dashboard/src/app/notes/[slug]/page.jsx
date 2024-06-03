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
import { useFlowbeatApi } from '@/context/ApiProvider';
const DetailNotes = ({ params: { slug } }) => {
  const { axios } = useFlowbeatApi();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const skeleton = <Skeleton className="w-[50px] h-[20px] rounded-full dark:bg-slate-200" />;
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`/notes/${slug}`).then((response) => {
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          setData(response.data);
          setLoading(false);
        }
      });
    };
    fetchData();
  }, [slug, axios]);
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 ml-2 mt-10 text-3xl font-bold">
        <button onClick={() => router.push(`/notes`)}>
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
          <TableHeader className="w-max flex">
            <TableRow className="justify-center items-center flex">
              <TableHead className="text-center xl:w-[80px]">MRN</TableHead>
              <TableHead className="text-center xl:w-[300px]">Nama Title</TableHead>
              <TableHead className="text-center xl:w-[190px]">Created</TableHead>
              <TableHead className="text-center xl:w-[190px]">Update</TableHead>
              <TableHead className="text-center xl:w-[125px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow className="w-full text-center flex gap-2">
                <TableCell className="text-center">{}</TableCell>
                <TableCell className="text-center ml-36 w-skeletonfull">{skeleton}</TableCell>
                <TableCell className="text-center ml-40 mr-10">{skeleton}</TableCell>
              </TableRow>
            ) : data.length > 0 ? (
              data.map((item, index) => (
                <TableRow className="w-90 flex" key={index}>
                  <TableCell className="text-center xl:w-[80px]">{index + 1}</TableCell>
                  <TableCell className="text-center xl:w-[300px]">{item.title}</TableCell>
                  <TableCell className="flex xl:w-[190px] text-center">
                    {new Date(item.created_at).toLocaleTimeString()},{new Date(item.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="flex xl:w-[190px] text-center">
                    {new Date(item.updated_at).toLocaleTimeString()},{new Date(item.updated_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="flex gap-2 items-center text-center">
                    <NotesDetail title={item.title} description={item.description} />
                    <Link className="bg-[#5d87ff] h-8 rounded-lg p-1" href={`/notes/${slug}/update/${item.id}`}>
                      <Pencil size={22} />
                    </Link>
                    <DelNotes id={item.id} slug={slug} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="w-full text-center flex gap-2">
                <TableCell className="text-center w-full" colSpan={5}>
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DetailNotes;
