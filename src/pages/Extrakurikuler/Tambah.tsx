import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { checkTokenExpiration } from '../../common/checkTokenExpiration';

const TambahEkstrakurikuler = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Session expired. Please log in again.');
      window.location.href = '/login';
      return;
    }

    const formData = new FormData();
    if (image) {
      formData.append('image', image);
    }
    formData.append('title', title);
    formData.append('description', description);

    fetch(`${import.meta.env.VITE_BASE_URL}/api/ekstrakurikuler`, {
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
          alert('Ekstrakurikuler berhasil ditambahkan!');
          navigate('/ekstrakurikuler');
        } else {
          alert('Terjadi kesalahan saat menambahkan Ekstrakurikuler.');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
        alert('Terjadi kesalahan saat menambahkan Ekstrakurikuler.');
        setLoading(false);
      });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Breadcrumb pageName="Tambah Ekstrakurikuler" />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2 font-semibold">Nama Ekstrakurikuler</label>
          <input
            type="text"
            className="w-full p-3 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder='Masukkan data'
          />
        </div>
        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2 font-semibold">Tambahkan Gambar</label>
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
                typeof image === 'string' ? (
                  <img src={image} alt="Sarana Prasarana Image" className="mb-4 max-h-40" />
                ) : (
                  <img src={URL.createObjectURL(image)} alt="Sarana Prasarana Image" className="mb-4 max-h-40" />
                )
              )}
              <p>
                <span className="text-primary">Click to upload</span> or update image
              </p>
              <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2 font-semibold">Deskripsi Ekstrakurikuler</label>
          <CKEditor
            editor={ClassicEditor}
            data={description}
            config={{
              ckfinder: {
                uploadUrl: `${import.meta.env.VITE_BASE_URL}/api/upload-image`,
              },
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDescription(data);
            }}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 rounded bg-primary text-white hover:bg-opacity-90 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Menambahkan...' : 'Tambah Ekstrakurikuler'}
        </button>
      </form>
    </div>
  );
};

export default TambahEkstrakurikuler;
