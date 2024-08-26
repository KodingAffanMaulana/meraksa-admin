import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { checkTokenExpiration } from '../../common/checkTokenExpiration';

const VideoTable = () => {
  const [videos, setVideos] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Items per page
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, [currentPage, sortOrder]);

  const fetchVideos = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/videos`);
      const result = await response.json();
      if (result.status === 200) {
        const sortedVideos: any = [...result.data].sort((a, b) => {
          return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        });
        setVideos(sortedVideos);
      } else {
        console.error('Failed to fetch videos');
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleSort = (order: any) => {
    setSortOrder(order);
  };

  const handleEdit = (id: any) => {
    navigate(`/galeri-video/edit/${id}`);
  };

  const token = localStorage.getItem('token');
  const handleDelete = (id: any) => {
    const confirmDelete = window.confirm('Apakah kamu yakin ingin menghapus video ini ?');
    if (confirmDelete) {
      fetch(`${import.meta.env.VITE_BASE_URL}/api/videos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(checkTokenExpiration) // Cek apakah token kedaluwarsa
        .then((response) => {
          if (response.ok) {
            fetchVideos();
            console.log('Video deleted successfully');
          } else {
            console.error('Failed to delete video');
          }
        })
        .catch((error) => {
          console.error('Error deleting video:', error);
        });
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = videos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(videos.length / itemsPerPage);

  const handleClick = (event: any) => {
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = () => {
    return [...Array(totalPages)].map((_: any, i: any) => (
      <button
        key={i + 1}
        id={i + 1}
        onClick={handleClick}
        className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        {i + 1}
      </button>
    ));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 ">
      <Breadcrumb pageName="Galeri Video" />
      <div className='flex items-center justify-end gap-2'>
        <Link to="/galeri-video/tambah" className='rounded-lg border text-white py-2 px-3 bg-green-400 hover:bg-green-500'>
          Tambahkan Video Baru
        </Link>

        <div className="flex justify-end">
          <button onClick={() => handleSort('asc')} className="mr-2 bg-blue-500 text-white py-2 px-4 rounded">
            Sort Ascending
          </button>
          <button onClick={() => handleSort('desc')} className="bg-blue-500 text-white py-2 px-4 rounded">
            Sort Descending
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto pt-5">
        <table className="w-full table-auto text-center">
          <thead>
            <tr className="bg-gray-2 dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                No
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Title
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Video
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Kategori
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item: any, i: number) => (
              <tr key={item.id}>
                <td className="border-b border-[#b9b9b9] dark:border-strokedark">
                  {(currentPage - 1) * itemsPerPage + i + 1}
                </td>
                <td className="border-b border-[#b9b9b9] max-w-[100px] dark:border-strokedark text-lg">
                  {item.title}
                </td>
                <td className="border-b border-[#b9b9b9] max-w-[200px] py-5 px-4 dark:border-strokedark">
                  {item.video && item.video.includes('youtu.be') ? (
                    <iframe
                      width="200"
                      height="150"
                      src={`https://www.youtube.com/embed/${item.video.split('youtu.be/')[1].split('?')[0]}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="mx-auto"
                    ></iframe>
                  ) : item.video && item.video.includes('drive.google.com') ? (
                    <iframe
                      width="200"
                      height="150"
                      src={`https://drive.google.com/file/d/${item.video.split('/d/')[1].split('/')[0]}/preview`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="mx-auto"
                    ></iframe>
                  ) : (
                    <video controls width="200" className="mx-auto">
                      <source src={item.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </td>

                <td className="border-b border-[#b9b9b9] max-w-[100px] py-5 px-4 dark:border-strokedark">
                  {item.category}
                </td>
                <td className="border-b border-[#b9b9b9] py-5 px-4 dark:border-strokedark">
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

export default VideoTable;
