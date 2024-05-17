'use client';
import axios from 'axios';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

const ListMiniPasien = ({ pasien, loading }) => {
  const skeleton = <Skeleton className="w-[50px] h-[20px] rounded-full dark:bg-slate-200" />;
  let redColor = 'bg-red-500';
  let yellowColor = 'bg-yellow-400';
  let orangeColor = 'bg-orange-500';
  let greenColor = 'bg-green-500';
  let codeBlue = 'bg-sky-500';
  return (
    <div className="flex flex-col gap-8 ">
      <h1 className="font-bold text-xl text-[#f52f57]">Early Warning Score Condition</h1>
      <div className="max-sm:w-[80%] ">
        <Table className="mt-8">
          <TableHeader>
            <TableRow>
              <TableHead className="w-36">Nama pasien</TableHead>
              <TableHead>Perawatan</TableHead>
              <TableHead>HR</TableHead>
              <TableHead>SpO2</TableHead>
              <TableHead>Temp</TableHead>
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
                <TableCell>{skeleton}</TableCell>
              </TableRow>
            ) : (
              pasien.slice(0, 10).map((item, index) => {
                let colorcellHR = '';
                let colorcellSpO2 = '';
                let colorcellTemp = '';
                let colorcellNIBP = '';
                // Heart rate
                if (item.heartrate?.heart_beats <= 40 || item.heartrate?.heart_beats >= 130) {
                  colorcellHR = redColor;
                } else if (item.heartrate?.heart_beats >= 111 && item.heartrate?.heart_beats <= 130) {
                  colorcellHR = orangeColor;
                } else if (item.heartrate?.heart_beats >= 51 && item.heartrate?.heart_beats <= 90) {
                  colorcellHR = greenColor;
                } else if (item.heartrate?.heart_beats >= 41 && item.heartrate?.heart_beats <= 50) {
                  colorcellHR = yellowColor;
                } else if (item.heartrate?.heart_beats >= 91 && item.heartrate?.heart_beats <= 110) {
                  colorcellHR = yellowColor;
                } else {
                  colorcellHR = codeBlue; // Nilai tidak valid
                }

                // Oxygen saturation
                if (item.oxygen_saturation?.blood_oxygen <= 91) {
                  colorcellSpO2 = redColor;
                } else if (item.oxygen_saturation?.blood_oxygen <= 92 && item.oxygen_saturation?.blood_oxygen <= 93) {
                  colorcellSpO2 = orangeColor;
                } else if (item.oxygen_saturation?.blood_oxygen >= 96) {
                  colorcellSpO2 = greenColor;
                } else if (item.oxygen_saturation?.blood_oxygen >= 94 && item.oxygen_saturation?.blood_oxygen <= 95) {
                  colorcellSpO2 = yellowColor;
                }
                // Temperature
                if (item.temperature?.patient_temp <= 35) {
                  colorcellTemp = redColor;
                } else if (item.temperature?.patient_temp <= 39) {
                  colorcellTemp = orangeColor;
                } else if (item.temperature?.patient_temp <= 36.1 && item.temperature?.patient_temp >= 38) {
                  colorcellTemp = greenColor;
                } else if (item.temperature?.patient_temp >= 35.1 && item.temperature?.patient_temp <= 36) {
                  colorcellTemp = yellowColor;
                } else if (item.temperature?.patient_temp >= 38.1 && item.temperature?.patient_temp < 39) {
                  colorcellTemp = yellowColor;
                } else {
                  colorcellTemp = codeBlue; // Nilai tidak valid
                }

                return (
                  <TableRow key={index}>
                    <TableCell>{item.nama_lengkap}</TableCell>
                    <TableCell>{item.perawatan}</TableCell>
                    <TableCell className={`${colorcellHR} w-[10px]`}>{item.heartrate?.heart_beats || 0}</TableCell>
                    <TableCell className={`${colorcellSpO2} w-[10px]`}>{item.oxygen_saturation?.blood_oxygen || 0}</TableCell>
                    <TableCell className={`${colorcellTemp} w-[10px]`}>{item.temperature?.patient_temp || 0}</TableCell>
                    <TableCell>{item.nibp?.systolic || 0}</TableCell>
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
export default ListMiniPasien;
