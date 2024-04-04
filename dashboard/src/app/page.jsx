import ManyPasien from './Components/ManyPasien';
import PieChart from './Components/PieChart';
import ListMiniPasien from './Components/ListMiniPasien';

const Home = () => {
  return (
    <div>
      <h1 className="ml-10 mt-10 text-3xl font-bold">Dashboard</h1>
      <div className="p-5 pt-10 pl-10 flex flex-col justify-between">
        <div className="flex gap-10">
          <ManyPasien />
          <ManyPasien />
        </div>
        <div className="flex mt-14 gap-5">
          <ListMiniPasien />
          <PieChart />
        </div>
      </div>
    </div>
  );
};
export default Home;
