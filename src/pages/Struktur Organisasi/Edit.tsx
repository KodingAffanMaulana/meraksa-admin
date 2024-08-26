import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const EditStrukturOrganisasi = () => {
  const [nama, setNama] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [NIP, setNIP] = useState('');
  const [NUPTK, setNUPTK] = useState('');
  const [kelamin, setKelamin] = useState('');
  const [tempatTanggalLahir, setTempatTanggalLahir] = useState('');
  const [pelajaran, setPelajaran] = useState('');
  const [pangkatGol, setPangkatGol] = useState('');
  const [tugasTambahan, setTugasTambahan] = useState('');
  const [email, setEmail] = useState('');
  const [alamatRumah, setAlamatRumah] = useState('');
  const [webBlogPribadi, setWebBlogPribadi] = useState('');
  const [profilPrestasi, setProfilPrestasi] = useState('');
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/detail-struktur-organisasi/${id}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setNama(data.data.nama);
          setJabatan(data.data.jabatan);
          setNIP(data.data.NIP || '');
          setNUPTK(data.data.NUPTK || '');
          setKelamin(data.data.kelamin);
          setTempatTanggalLahir(data.data.tempatTanggalLahir);
          setPelajaran(data.data.pelajaran);
          setPangkatGol(data.data.pangkatGol);
          setTugasTambahan(data.data.tugasTambahan || '');
          setEmail(data.data.email);
          setAlamatRumah(data.data.alamatRumah);
          setWebBlogPribadi(data.data.webBlogPribadi || '');
          setProfilPrestasi(data.data.profilPrestasi || '');
          setImage(data.data.image);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [id]);

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
    formData.append('NIP', NIP);
    formData.append('NUPTK', NUPTK);
    formData.append('kelamin', kelamin);
    formData.append('tempatTanggalLahir', tempatTanggalLahir);
    formData.append('pelajaran', pelajaran);
    formData.append('pangkatGol', pangkatGol);
    formData.append('tugasTambahan', tugasTambahan);
    formData.append('email', email);
    formData.append('alamatRumah', alamatRumah);
    formData.append('webBlogPribadi', webBlogPribadi);
    formData.append('profilPrestasi', profilPrestasi);
    if (image instanceof File) {
      formData.append('image', image);
    }

    fetch(`${import.meta.env.VITE_BASE_URL}/api/detail-struktur-organisasi/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          alert('Struktur Organisasi berhasil diperbarui!');
        } else {
          alert('Terjadi kesalahan saat memperbarui Struktur Organisasi');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error updating data:', error.message);
        alert('Terjadi kesalahan saat memperbarui Struktur Organisasi.');
        setLoading(false);
      });
  };

  if (loading) return <div>Loading...</div>;
  return (
    <section className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 mx-auto">
      <div className='justify-between flex items-center pb-5'>
        <div className='flex justify-center text-2xl font-bold'>Edit Data Struktur
        </div>
        <Link to="/struktur" className='rounded-lg border text-white py-2 px-5 bg-blue-500'>Kembali</Link>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Gambar</label>
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
                    <img src={image} alt="Struktur Organisasi Image" className="mb-4 max-h-40" />
                  ) : (
                    <img src={URL.createObjectURL(image)} alt="Struktur Organisasi Image" className="mb-4 max-h-40" />
                  )
                )}
                <p>
                  <span className="text-primary">Click to upload</span> or update image <span className='text-danger text-sm'>* Wajib Diisi</span>
                </p>
                <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Nama <span className='text-danger text-sm'>* Wajib Diisi</span></label>
            <input
              type="text"
              required
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Masukkan Nama"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Jabatan <span className='text-danger text-sm'>* Wajib Diisi</span></label>
            <input
              required
              type="text"
              value={jabatan}
              onChange={(e) => setJabatan(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Masukkan Jabatan"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Mata Pelajaran yang Diampuh <span className='text-danger text-sm'>* Wajib Diisi</span></label>
            <input
              required
              type="text"
              value={pelajaran}
              onChange={(e) => setPelajaran(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Masukkan Mata Pelajaran"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">NIP <span className='text-warning text-sm'>Tidak Wajib Diisi (Optional)</span></label>
            <input
              type="text"
              value={NIP}
              onChange={(e) => setNIP(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Masukkan NIP"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">NUPTK <span className='text-warning text-sm'>Tidak Wajib Diisi (Optional)</span></label>
            <input
              type="text"
              value={NUPTK}
              onChange={(e) => setNUPTK(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Masukkan NUPTK"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">
              Jenis Kelamin <span className='text-warning text-sm'>Tidak Wajib Diisi (Optional)</span>
            </label>
            <select
              value={kelamin}
              onChange={(e) => setKelamin(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Tempat, Tanggal Lahir <span className='text-warning text-sm'>Tidak Wajib Diisi (Optional)</span></label>
            <input
              type="text"
              value={tempatTanggalLahir}
              onChange={(e) => setTempatTanggalLahir(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Masukkan Tempat, Tanggal Lahir"
            />
          </div>

          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Pangkat/Golongan <span className='text-warning text-sm'>Tidak Wajib Diisi (Optional)</span></label>
            <input
              type="text"
              value={pangkatGol}
              onChange={(e) => setPangkatGol(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Masukkan Pangkat/Golongan"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Tugas Tambahan <span className='text-warning text-sm'>Tidak Wajib Diisi (Optional)</span></label>
            <input
              type="text"
              value={tugasTambahan}
              onChange={(e) => setTugasTambahan(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Masukkan Tugas Tambahan"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Email <span className='text-warning text-sm'>Tidak Wajib Diisi (Optional)</span></label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Masukkan Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Alamat Rumah <span className='text-warning text-sm'>Tidak Wajib Diisi (Optional)</span></label>
            <input
              type="text"
              value={alamatRumah}
              onChange={(e) => setAlamatRumah(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Masukkan Alamat Rumah"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Web/Blog Pribadi <span className='text-warning text-sm'>Tidak Wajib Diisi (Optional)</span></label>
            <input
              type="text"
              value={webBlogPribadi}
              onChange={(e) => setWebBlogPribadi(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Masukkan Web/Blog Pribadi"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Profil Prestasi <span className='text-warning text-sm'>Tidak Wajib Diisi (Optional)</span></label>
            <textarea
              value={profilPrestasi}
              onChange={(e) => setProfilPrestasi(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Masukkan Profil Prestasi"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 rounded bg-primary text-white hover:bg-opacity-90 transition duration-300"
          >
            Update Struktur Organisasi
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditStrukturOrganisasi;
