'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Trash } from '@phosphor-icons/react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const DelNotes = ({ id, slug }) => {
  const router = useRouter();
  const hapusData = async () => {
    await axios
      .delete(`https://flowbeat.web.id/api/notes/${id}`)
      .then((response) => {
        if (response.data.success === true) {
          router.push(`/notes`);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="bg-rose-500 h-8 items-center text-center justify-center rounded-lg p-1">
          <Trash size={22} />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>Data yang di hapus tidak dapat dikembalikan.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={hapusData}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default DelNotes;

// <button onClick={hapusData} className="bg-rose-500 h-8 items-center text-center justify-center rounded-lg p-1">
//   <Trash size={22} />
// </button>
