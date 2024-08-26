import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../common/Loader';
import { checkTokenExpiration } from '../../common/checkTokenExpiration';

const CreateVideo = () => {
  const [video, setVideo] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const videoData = {
      video,
      title,
      date,
      category,
    };

    fetch(`${import.meta.env.VITE_BASE_URL}/api/videos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(videoData),
    })
      .then(checkTokenExpiration)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          alert('Video berhasil ditambahkan!');
          navigate('/galeri-video');
        } else {
          alert('Terjadi kesalahan saat menambahkan video');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error creating video:', error);
        alert('Terjadi kesalahan saat menambahkan video');
        setLoading(false);
      });
  };

  if (loading) return <Loader />;

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className='justify-between flex items-center pb-5'>
        <div className='flex justify-center text-2xl font-bold'>Tambahkan Galeri Video
        </div>
        <Link to="/galeri-video" className='rounded-lg border text-white py-2 px-5 bg-blue-500'>Kembali</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <label className="block text-black dark:text-white mb-2 font-semibold">Video URL</label>
          <input
            type="text"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
            className="w-full px-4 py-2 border rounded-md dark:bg-meta-4 dark:border-strokedark"
            placeholder="Masukkan URL Video"
            required
          />
        </div>
        <div className="my-4">
          <label className="block text-black dark:text-white mb-2 font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md dark:bg-meta-4 dark:border-strokedark"
            placeholder="Masukkan judul"
            required
          />
        </div>
        <div className="my-4">
          <label className="block text-black dark:text-white mb-2 font-semibold">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-md dark:bg-meta-4 dark:border-strokedark"
            placeholder="Masukkan kategori"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 rounded bg-primary text-white hover:bg-opacity-90 transition duration-300"
        >
          Tambah Video
        </button>
      </form>
    </div>
  );
};

export default CreateVideo;
