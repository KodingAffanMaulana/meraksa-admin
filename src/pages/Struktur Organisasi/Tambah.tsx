import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateStrukturOrganisasi = () => {
  const [nama, setNama] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [pelajaran, setPelajaran] = useState('');
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
    formData.append('jabatan', jabatan);
    formData.append('pelajaran', pelajaran);
    if (image instanceof File) {
      formData.append('image', image);
    }

    fetch(`${import.meta.env.VITE_BASE_URL}/api/struktur-organisasi`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200 || data.status === 201) {
          alert('Struktur Organisasi berhasil dibuat!');
          navigate('/struktur')
        } else {
          alert('Terjadi kesalahan saat membuat Struktur Organisasi');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error creating data:', error.message);
        alert('Terjadi kesalahan saat membuat Struktur Organisasi.');
        setLoading(false);
      });
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <div>
        <Link to="/struktur" className='rounded-lg border text-white py-2 px-3 bg-blue-500'>Kembali</Link>
        <div className='flex justify-center text-2xl font-bold'>Tambahkan Data Struktur Organisasi</div>
      </div>
      <form className="max-w-6xl mx-auto pt-5" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2 font-semibold">Nama</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Nama"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2 font-semibold">Jabatan</label>
          <input
            type="text"
            value={jabatan}
            onChange={(e) => setJabatan(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Jabatan"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2 font-semibold">Pelajaran</label>
          <input
            type="text"
            value={pelajaran}
            onChange={(e) => setPelajaran(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Pelajaran"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2 font-semibold">Gambar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <label className="block dark:text-white mb-2 font-semibold text-warning">Detail Informasi Tambahan Bisa Diinput pada Halaman Edit</label>
        <button
          type="submit"
          className="w-full py-3 px-6 rounded bg-primary text-white hover:bg-opacity-90 transition duration-300"
        >
          Buat Struktur Organisasi
        </button>
      </form>
    </div>
  );
};

export default CreateStrukturOrganisasi;
