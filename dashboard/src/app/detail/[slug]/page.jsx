import axios from 'axios';
import ChartJantung from '@/app/Components/chart/ChartJantung';
import ChartOxygen from '@/app/Components/chart/ChartOxygen';

const Detail = async ({ params: { slug } }) => {
  const response = await axios.get(`http://192.168.18.8:8080/TUGAS-AKHIR/backend_laravel/public/api/patients/${slug}`);
  // console.log(response.data);
  return (
    <div className="py-16 px-10">
      <h2 className="dark:text-white text-slate-600 font-bold text-3xl">{response.data.nama_lengkap}</h2>
      <h2 className="text-slate-600 font-bold text-3xl">{response.data.alamat}</h2>
      <h2 className="text-slate-600 font-bold text-3xl">{response.data.no_hp}</h2>
      <h2 className="text-slate-600 font-bold text-3xl">{response.data.tgl_lahir}</h2>
      <h2 className="text-slate-600 font-bold text-3xl">{response.data.jenis_kelamin}</h2>
      <div className='lg:flex max-sm:block items-center lg:gap-5'>
        <ChartJantung slug={response.data.slug} />
        <ChartOxygen slug={response.data.slug} />
      </div>
    </div>
  );
};
export default Detail;
