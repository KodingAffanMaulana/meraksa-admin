import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const ITEMS_PER_PAGE = 10; // Batas item per halaman

const Pengumuman: React.FC = () => {
  const [allData, setAllData] = useState<any[]>([]); // Menyimpan semua data
  const [data, setData] = useState<any[]>([]); // Data yang akan ditampilkan pada halaman
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const navigate = useNavigate();

  // Mengambil data dari API
  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/news/category/pengumuman`);
      const result = await response.json();
      if (result.status === 200) {
        setAllData(result.data); // Simpan semua data
        setTotalPages(Math.ceil(result.data.length / ITEMS_PER_PAGE)); // Hitung total halaman
        setData(result.data.slice(0, ITEMS_PER_PAGE)); // Ambil data untuk halaman pertama
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Filter dan paginasi berdasarkan query pencarian dan halaman saat ini
  useEffect(() => {
    let filteredData = allData;

    // Filter data berdasarkan pencarian
    if (searchQuery) {
      filteredData = allData.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Hitung ulang total halaman setelah pencarian
    setTotalPages(Math.ceil(filteredData.length / ITEMS_PER_PAGE));

    // Ambil data berdasarkan halaman saat ini
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    setData(paginatedData);
  }, [currentPage, searchQuery, allData]);

  // Handle perubahan halaman
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle pencarian
  const handleSearch = () => {
    setSearchQuery(searchInput);
    setCurrentPage(1); // Reset ke halaman pertama saat melakukan pencarian
  };

  const handleReset = () => {
    setSearchInput('');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleEdit = (id: any) => {
    navigate(`/pengumuman/${id}`);
  };

  const token = localStorage.getItem('token');
  const handleDelete = async (id: any) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data ini?');
    if (confirmDelete) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/news/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          console.log('Data berhasil dihapus');
          fetchData();
        } else {
          console.error('Failed to delete data');
        }
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <Breadcrumb pageName="Direktori Pengumuman" />

      <div className="flex flex-col-reverse items-end md:flex-row gap-2 justify-between md:items-center my-4">
        <Link to="/pengumuman/tambah" className='rounded-lg border text-white py-2 px-3 bg-green-400 hover:bg-green-500'>Tambah Pengumuman</Link>
        <div className='flex justify-end w-full md:w-8/12'>
          <input
            type="text"
            placeholder="Cari Judul Pengumuman..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="border px-4 py-2 rounded-lg w-full"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2 hover:bg-blue-600"
          >
            Cari
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-400 text-white rounded-lg ml-2 hover:bg-gray-600 text-nowrap"
          >
            Reset Pencarian
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto py-5">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 text-center font-medium text-black dark:text-white">
                No
              </th>
              <th className="text-center py-4 px-4 font-medium text-black dark:text-white">
                Judul
              </th>
              <th className="text-center py-4 px-4 font-medium text-black dark:text-white">
                Gambar
              </th>
              <th className="text-center py-4 px-4 font-medium text-black dark:text-white">
                Penulis
              </th>
              <th className="text-center py-4 px-4 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={item.id}>
                <td className="border-b border-[#eee] text-center py-4 px-4 dark:border-strokedark">
                  {i + 1 + (currentPage - 1) * ITEMS_PER_PAGE}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                  {item.title}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover mx-auto" />
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                  {item.penulis}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className='flex space-x-3 justify-center'>
                    <button
                      className="hover:text-primary flex items-center gap-1"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="hover:opacity-50 text-red-600 flex items-center gap-1"
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
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-graydark text-gray-2 rounded disabled:opacity-50"
          >
            Sebelumnya
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-graydark text-gray-2 rounded disabled:opacity-50"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pengumuman;
