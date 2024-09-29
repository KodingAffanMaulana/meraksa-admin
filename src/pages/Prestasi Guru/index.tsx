import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const PrestasiGuruTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Jumlah item per halaman
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [currentPage, sortOrder]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/prestasi-guru`);
      const result = await response.json();
      if (result.status === 200) {
        const sortedData: any = [...result.data].sort((a, b) => {
          return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        });
        setData(sortedData);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSort = (order: any) => {
    setSortOrder(order);
  };

  const handleEdit = (id: any) => {
    navigate(`/prestasi-guru/${id}`);
  };

  const token = localStorage.getItem('token');
  const handleDelete = async (id: any) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data ini?');
    if (confirmDelete) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/prestasi-guru/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          fetchData(); // Refresh data after deletion
          console.log('Data berhasil dihapus');
        } else {
          console.error('Failed to delete data');
        }
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleClick = (event: any) => {
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = () => {
    return [...Array(totalPages)].map((_, i: any) => (
      <button
        key={i + 1}
        id={i + 1}
        onClick={handleClick}
        className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
      >
        {i + 1}
      </button>
    ));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 ">
      <Breadcrumb pageName="Prestasi Guru" />
      <div className='flex flex-col-reverse md:flex-row items-end md:items-center justify-end gap-2'>
        <Link to="/prestasi-guru/tambah" className='rounded-lg border text-white py-2 px-3 bg-green-400 hover:bg-green-500'>
          Tambah Prestasi Guru
        </Link>

        <div className="flex justify-end">
          <button onClick={() => handleSort('asc')} className="mr-2 bg-blue-500 text-white py-2 px-4 rounded">
            Sortir Ascending
          </button>
          <button onClick={() => handleSort('desc')} className="bg-blue-500 text-white py-2 px-4 rounded">
            Sortir Descending
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto pt-5">
        <table className="w-full table-auto text-center">
          <thead>
            <tr className="bg-gray-2 dark:bg-meta-4">
              <th className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                No
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Title
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Image
              </th>
              <th className="min-w-[250px] py-4 px-4 font-medium text-black dark:text-white">
                Description
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item: any, i: number) => (
              <tr key={item.id}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  {(currentPage - 1) * itemsPerPage + i + 1}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {item.title}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <img src={item.image} alt={`Prestasi ${item.title}`} className="w-32 mx-auto" />
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div
                    dangerouslySetInnerHTML={{ __html: item.description || 'N/A' }}
                  />
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className='flex justify-center'>
                    <button
                      className="text-primary flex items-center gap-1 hover:bg-primary hover:text-white rounded-md px-3 py-2"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-danger hover:bg-red-400 hover:text-white rounded-md px-3 py-2 flex items-center gap-1"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center space-x-2 mt-4">
          {renderPageNumbers()}
        </div>
      </div>
    </div>
  );
};

export default PrestasiGuruTable;
