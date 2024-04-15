const ManyPasien = ({ totPasien, title }) => {
  return (
    <div className="text-center shadow-lg text-lg flex flex-col justify-center rounded-lg w-1/2 bg-slate-200 p-3">
      <h1 className="font-bold text-xl text-[#f52f57]">{title}</h1>
      <h1 className="text-4xl font-bold mt-5 dark:text-slate-800">{totPasien}</h1>
    </div>
  );
};
export default ManyPasien;
