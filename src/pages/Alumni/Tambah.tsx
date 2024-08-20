import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link, useNavigate } from 'react-router-dom';
import { checkTokenExpiration } from '../../common/checkTokenExpiration';

const PostAlumni = () => {
  const [nama, setNama] = useState('');
  const [angkatan, setAngkatan] = useState<number | ''>('');
  const [email, setEmail] = useState('' || 'mail@mail.co');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleFileChange = (e: any) => {
    setImage(e.target.files[0]);
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
    formData.append('nama', nama);
    formData.append('angkatan', angkatan.toString());
    formData.append('email', email);
    formData.append('desc', desc);
    if (image instanceof File) {
      formData.append('image', image);
    }

    fetch(`${import.meta.env.VITE_BASE_URL}/api/alumni`, {
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
          alert('Alumni berhasil ditambahkan!');
          navigate('/alumni')
        } else {
          alert('Terjadi kesalahan saat menambahkan Alumni');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error posting data:', error.message);
        alert('Terjadi kesalahan saat menambahkan Alumni.');
        setLoading(false);
      });
  };

  return (
    <>
      <Link to="/alumni" className='rounded-lg border text-white py-2 px-3 bg-blue-500'>Kembali</Link>
      <div className="max-w-6xl mx-auto pt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Tambah Alumni</label>
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
                    <img src={image} alt="Alumni Image" className="mb-4 max-h-40" />
                  ) : (
                    <img src={URL.createObjectURL(image)} alt="Alumni Image" className="mb-4 max-h-40" />
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
            <label className="block text-black dark:text-white mb-2 font-semibold">Nama</label>
            <input
              required
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Nama"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Angkatan</label>
            <input
              type="number"
              value={angkatan}
              onChange={(e) => setAngkatan(parseInt(e.target.value, 10))}
              className="w-full p-2 border rounded"
              placeholder="Angkatan"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Deskripsi</label>
            <textarea value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Deskripsi" />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 rounded bg-primary text-white hover:bg-opacity-90 transition duration-300"
          >
            Tambah Alumni
          </button>
        </form>
      </div>
    </>
  );
};

export default PostAlumni;
