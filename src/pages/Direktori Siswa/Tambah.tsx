import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkTokenExpiration } from '../../common/checkTokenExpiration';

const PostSiswa = () => {
  const [nis, setNis] = useState('');
  const [nama, setNama] = useState('');
  const [kelamin, setKelamin] = useState('');
  const [tmpLahir, setTmpLahir] = useState('');
  const [tglLahir, setTglLahir] = useState('');
  const [agama, setAgama] = useState('');
  const [kelas, setKelas] = useState('');
  const [orangTua, setOrangTua] = useState('');
  const [alamatRumah, setAlamatRumah] = useState('');
  const [telp, setTelp] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    formData.append('nis', nis);
    formData.append('nama', nama);
    if (image) formData.append('image', image);
    formData.append('kelamin', kelamin);
    formData.append('tmpLahir', tmpLahir);
    formData.append('tglLahir', tglLahir);
    formData.append('agama', agama);
    formData.append('kelas', kelas);
    formData.append('orangTua', orangTua);
    formData.append('alamatRumah', alamatRumah);
    formData.append('telp', telp);

    fetch(`${import.meta.env.VITE_BASE_URL}/api/siswa`, {
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
          alert('Siswa berhasil ditambahkan!');
          navigate('/siswa');
        } else {
          alert('Terjadi kesalahan saat menambahkan siswa.');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error posting data:', error.message);
        alert('Terjadi kesalahan saat menambahkan siswa.');
        setLoading(false);
      });
  };

  return (
    <>
      <Link to="/siswa" className='rounded-lg border text-white py-2 px-3 bg-blue-500'>Kembali</Link>
      <div className="max-w-6xl mx-auto pt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">
              NIS <span className='text-danger text-sm'>* Wajib Diisi</span>
            </label>
            <input
              required
              type="text"
              value={nis}
              onChange={(e) => setNis(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="NIS"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">
              Nama <span className='text-danger text-sm'>* Wajib Diisi</span>
            </label>
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
            <label className="block text-black dark:text-white mb-2 font-semibold">
              Jenis Kelamin <span className='text-warning text-sm'>Tidak Wajib Diisi (Optional)</span>
            </label>
            <input
              type="text"
              value={kelamin}
              onChange={(e) => setKelamin(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Jenis Kelamin"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">
              Tempat Lahir <span className='text-warning text-sm'>Tidak Wajib Diisi (Optional)</span>
            </label>
            <input
              type="text"
              value={tmpLahir}
              onChange={(e) => setTmpLahir(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Tempat Lahir"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">
              Tanggal Lahir <span className='text-warning text-sm'>Tidak Wajib Diisi (Optional)</span>
            </label>
            <input
              type="date"
              value={tglLahir}
              onChange={(e) => setTglLahir(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">
              Agama <span className='text-warning text-sm'>Tidak Wajib Diisi (Optional)</span>
            </label>
            <input
              type="text"
              value={agama}
              onChange={(e) => setAgama(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Agama"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">
              Kelas <span className='text-warning text-sm'>Tidak Wajib Diisi (Optional)</span>
            </label>
            <input
              type="text"
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Kelas"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">
              Orang Tua <span className='text-warning text-sm'>Tidak Wajib Diisi (Optional)</span>
            </label>
            <input
              type="text"
              value={orangTua}
              onChange={(e) => setOrangTua(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Orang Tua"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">
              Alamat Rumah <span className='text-warning text-sm'>Tidak Wajib Diisi (Optional)</span>
            </label>
            <textarea
              value={alamatRumah}
              onChange={(e) => setAlamatRumah(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Alamat Rumah"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">
              Telepon <span className='text-warning text-sm'>Tidak Wajib Diisi (Optional)</span>
            </label>
            <input
              type="text"
              value={telp}
              onChange={(e) => setTelp(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Telepon"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">
              Upload Gambar (Opsional)
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
                  <img src={URL.createObjectURL(image)} alt="Siswa Image" className="mb-4 max-h-40" />
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
            className="w-full py-3 px-6 rounded bg-primary text-white hover:bg-opacity-90 transition duration-300"
          >
            {loading ? 'Submitting...' : 'Tambah Siswa'}
          </button>
        </form>
      </div>
    </>
  );
};

export default PostSiswa;
