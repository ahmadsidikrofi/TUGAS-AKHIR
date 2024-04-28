'use client'
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

const ListMiniPasien = ({ pasien, loading }) => {
  const skeleton = <Skeleton className="w-[50px] h-[20px] rounded-full dark:bg-slate-200" />

  return (
    <div className="dark:bg-slate-800 bg-slate-200 w-1/2 rounded-lg shadow-lg p-10 text-center">
      <h1 className="font-bold text-xl text-[#f52f57]">Early Warning Score Condition</h1>
      <Table className="w-max mt-8 overflow-x-scroll">
        <TableHeader>
          <TableRow>
            <TableHead>Nama pasien</TableHead>
            <TableHead>Perawatan</TableHead>
            <TableHead>HR</TableHead>
            <TableHead>SpO2</TableHead>
            <TableHead>NIBP</TableHead>
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
            </TableRow>
          ) : (
            pasien.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.nama_lengkap}</TableCell>
                <TableCell>{item.perawatan}</TableCell>
                <TableCell>{item.heartrate.heart_beats}</TableCell>
                <TableCell>{item.oxygen_saturation.blood_oxygen}</TableCell>
                <TableCell>{item.nibp.systolic}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
export default ListMiniPasien;

// <div className="overflow-x-auto shadow-md sm:rounded-lg">
// <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//   <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
//     <tr>
//       <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
//         Nama
//       </th>
//       <th scope="col" className="text-center px-10 py-5 bg-gray-50 dark:bg-white-800">
//         Tanggal
//       </th>
//       <th scope="col" className="text-center px-1 py-1 bg-gray-50 dark:bg-gray-800">
//         Umur
//       </th>
//       <th scope="col" className="text-center px-1 py-1 bg-gray-50 dark:bg-white-800">
//         Gender
//       </th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr className="border-b border-gray-200 dark:border-gray-700">
//       <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
//         Agus Suherman
//       </th>
//       <td className="px-6 py-4">12/10/2022</td>
//       <td className="px-6 py-4 text-center bg-gray-50 dark:bg-gray-800">31</td>
//       <td className="px-6 py-4">Male</td>
//     </tr>
//     <tr className="border-b border-gray-200 dark:border-gray-700">
//       <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
//         Agus Suherman
//       </th>
//       <td className="px-6 py-4">12/10/2022</td>
//       <td className="px-6 py-4 text-center bg-gray-50 dark:bg-gray-800">31</td>
//       <td className="px-6 py-4">Male</td>
//     </tr>
//     <tr className="border-b border-gray-200 dark:border-gray-700">
//       <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
//         Agus Suherman
//       </th>
//       <td className="px-6 py-4">12/10/2022</td>
//       <td className="px-6 py-4 text-center bg-gray-50 dark:bg-gray-800">31</td>
//       <td className="px-6 py-4">Male</td>
//     </tr>
//     <tr className="border-b border-gray-200 dark:border-gray-700">
//       <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
//         Agus Suherman
//       </th>
//       <td className="px-6 py-4">12/10/2022</td>
//       <td className="px-6 py-4 text-center bg-gray-50 dark:bg-gray-800">31</td>
//       <td className="px-6 py-4">Male</td>
//     </tr>
//   </tbody>
// </table>
// </div>