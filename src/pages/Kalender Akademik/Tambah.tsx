import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Loader from '../../common/Loader';

const CreateKalenderAkademik = () => {
  const [tahun, setTahun] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleFileChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const checkTokenExpiration = (response: any) => {
    if (response.status === 401) {
      // Token expired or unauthorized
      localStorage.removeItem('token');
      navigate('/login');
    }
    return response;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('tahun', tahun);
    if (image) {
      formData.append('image', image);
    }

    fetch(`${import.meta.env.VITE_BASE_URL}/api/kalender-akademik`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then(checkTokenExpiration)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          setLoading(false);
          navigate('/kalender');
        } else {
          setLoading(false);
          alert('Failed to create data');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error creating data:', error);
      });
  };

  if (loading) return <Loader />;
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <Breadcrumb pageName="Tambah Kalender Akademik" />

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2 font-semibold">Tahun</label>
          <input
            type="text"
            value={tahun}
            onChange={(e) => setTahun(e.target.value)}
            className="w-full px-4 py-2 border rounded-md dark:bg-meta-4 dark:border-strokedark"
            placeholder="Masukkan tahun contoh '2021/2022'"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2 font-semibold">
            Upload Gambar
          </label>
          <div
            id="FileUpload"
            className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
          >
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center justify-center space-y-3">
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Kalender Akademik"
                  className="mb-4 max-h-40"
                />
              )}
              <p>
                <span className="text-primary">Click to upload</span> or update image
              </p>
              <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-5 rounded hover:bg-blue-600"
        >
          Tambah Kalender
        </button>
      </form>
    </div>
  );
};

export default CreateKalenderAkademik;
