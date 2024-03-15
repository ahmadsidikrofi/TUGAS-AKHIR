import ManyPasien from './Components/ManyPasien';
import PieChart from './Components/PieChart';
import ListMiniPasien from './Components/ListMiniPasien';

const Home = () => {
  return (
    <div className="p-10 pl-5 flex gap-10 justify-between">
      <div className="flex flex-col pl-10 gap-20">
        <ManyPasien />
        <ListMiniPasien />
      </div>
      <PieChart />
    </div>
  );
};
export default Home;
