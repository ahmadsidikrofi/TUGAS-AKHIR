const ManyPasien = ({ totPasien, title, is_Login, not_login }) => {
  return (
    <div className="text-center shadow-lg text-lg flex flex-col justify-center rounded-lg w-72 h-32 border-l-4 border-[#5d87ff] p-3">
      <h1 className="font-bold text-xl text-[#5d87ff]">{title}</h1>
      <h1 className="text-4xl font-bold mt-5 dark:text-slate-800">{totPasien}</h1>
      <p className="text-4xl font-bold -mt-1 dark:text-slate-800">{is_Login}</p>
      <p className="text-4xl font-bold dark:text-slate-800">{not_login}</p>
    </div>
  );
};
export default ManyPasien;
