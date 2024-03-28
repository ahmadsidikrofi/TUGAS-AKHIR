import axios from 'axios';
import ChartJantung from '@/app/Components/ChartJantung';

const Detail = async ({ params: { slug } }) => {
  const response = await axios.get(`http://192.168.18.8:8080/TUGAS-AKHIR/backend_laravel/public/api/patients/${slug}`);
  console.log(response.data);
  return (
    <div className="px-16 py-16">
      <h2 className="text-slate-600 font-bold text-3xl">{response.data.nama_lengkap}</h2>
      <ChartJantung />
    </div>
  );
};
export default Detail;
