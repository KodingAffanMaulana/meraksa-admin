// import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const ProfileSekolah = () => {
  const [profil, setProfil] = useState('');
  const [visi, setVisi] = useState('');
  const [misi, setMisi] = useState('');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${import.meta.env.VITE_BASE_URL}/api/information`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setProfil(data.data.profil);
          setVisi(data.data.visi);
          setMisi(data.data.misi);
          setId(data.data.id);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const requestBody = {
      profil: profil,
      visi: visi,
      misi: misi
    };

    fetch(`${import.meta.env.VITE_BASE_URL}/api/information/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          alert('Profil sekolah berhasil diperbarui!');
        } else {
          alert('Terjadi kesalahan saat memperbarui profil sekolah.');
        }
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        alert('Terjadi kesalahan saat memperbarui profil sekolah.');
      });
  };


  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Breadcrumb pageName="Profil Sekolah" />
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2">Profil Sekolah</label>
            <input
              type="text"
              value={profil}
              onChange={(e) => setProfil(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2">Visi Sekolah</label>
            <input
              type="text"
              value={visi}
              onChange={(e) => setVisi(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2">Misi Sekolah</label>
            <textarea
              value={misi}
              onChange={(e) => setMisi(e.target.value)}
              rows={4}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 rounded bg-primary text-white hover:bg-opacity-90 transition duration-300"
          >
            Update Profil Sekolah
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfileSekolah;
