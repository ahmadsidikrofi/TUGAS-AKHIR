'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Note } from '@phosphor-icons/react';
import Link from 'next/link';
const Notes = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const skeleton = <Skeleton className="w-[50px] h-[20px] rounded-full dark:bg-slate-200" />;
  const dataUser = async () => {
    await axios
      .get(`https://flowbeat.web.id/api/patients`)
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          setUser(response.data);
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    dataUser();
  });
  return (
    <div className="flex flex-col px-5 ">
      <h1 className="ml-10 mt-10 text-3xl font-bold">Notes Pasien</h1>
      <div className="py-10 my-10 rounded-lg mx-10 pl-20 items-center w-full border items-center">
        <Table className="w-max flex flex-col  gap-2">
          <TableHeader className="w-max flex gap-12">
            <TableRow className="w-max flex">
              <TableHead className="text-center w=[50px]">MRN</TableHead>
              <TableHead className="mx-32 text-center w-full">Nama Pasien</TableHead>
              <TableHead className="text-center ml-44 mr-10">Notes</TableHead>
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
              user.map((item, index) => (
                <TableRow className="w-full text-center flex gap-2" key={index}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="text-center w-full">{item.nama_lengkap}</TableCell>
                  <TableCell className="text-center ml-40 mr-10">
                    <Link href={`/notes/${item.slug}`}>
                      <Note size={32} />
                    </Link>
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

export default Notes;
