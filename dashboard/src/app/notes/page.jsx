'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { CaretRight } from '@phosphor-icons/react';
import Link from 'next/link';
import { useFlowbeatApi } from '@/context/ApiProvider';
import { Button } from '@/components/ui/button';
const Notes = () => {
  const { axios } = useFlowbeatApi();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const skeleton = <Skeleton className="w-[50px] h-[20px] rounded-full dark:bg-slate-200" />;

  useEffect(() => {
    const dataUser = async () => {
      await axios
        .get(`/patients`)
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            setUser(response.data);
            setLoading(false);
          }
        })
        .catch((error) => console.log(error));
    };
    dataUser();
  }, [axios]);
  return (
    <div className="flex flex-col ">
      <h1 className="ml-2 mt-10 text-3xl text-[#5d87ff] dark:text-white font-bold">Notes Pasien</h1>
      <div className="py-10 rounded-lg my-10 mx-6 pl-20 items-center w-full border">
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
                    <Button variant="outline">
                      <Link className="text-[#5d87ff] dark:text-white" href={`/notes/${item.slug}`}>
                        <CaretRight size={25} />
                      </Link>
                    </Button>
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
