const ListMiniPasien = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg w-[80vh] h-[75vh] p-7">
      <h1 className="font-bold text-xl text-[#f52f57]">List Pasien</h1>
      <div className="mt-8">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  Nama
                </th>
                <th scope="col" className="text-center px-10 py-5 bg-gray-50 dark:bg-white-800">
                  Tanggal
                </th>
                <th scope="col" className="text-center px-1 py-1 bg-gray-50 dark:bg-gray-800">
                  Umur
                </th>
                <th scope="col" className="text-center px-1 py-1 bg-gray-50 dark:bg-white-800">
                  Gender
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                  Agus Suherman
                </th>
                <td className="px-6 py-4">12/10/2022</td>
                <td className="px-6 py-4 text-center bg-gray-50 dark:bg-gray-800">31</td>
                <td className="px-6 py-4">Male</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                  Agus Suherman
                </th>
                <td className="px-6 py-4">12/10/2022</td>
                <td className="px-6 py-4 text-center bg-gray-50 dark:bg-gray-800">31</td>
                <td className="px-6 py-4">Male</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                  Agus Suherman
                </th>
                <td className="px-6 py-4">12/10/2022</td>
                <td className="px-6 py-4 text-center bg-gray-50 dark:bg-gray-800">31</td>
                <td className="px-6 py-4">Male</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                  Agus Suherman
                </th>
                <td className="px-6 py-4">12/10/2022</td>
                <td className="px-6 py-4 text-center bg-gray-50 dark:bg-gray-800">31</td>
                <td className="px-6 py-4">Male</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ListMiniPasien;
