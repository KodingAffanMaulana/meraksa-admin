import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { checkTokenExpiration } from '../../common/checkTokenExpiration';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditProgramKerja = () => {
  const [timeline, setTimeline] = useState('');
  const [kegiatan, setKegiatan] = useState('');
  const [tujuan, setTujuan] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/program-kerja/${id}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setTimeline(data.data.timeline);
          setKegiatan(data.data.kegiatan);
          setTujuan(data.data.tujuan);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Session expired. Please log in again.');
      window.location.href = '/login';
      return;
    }

    const requestBody = {
      timeline: timeline,
      kegiatan: kegiatan,
      tujuan: tujuan,
    };

    fetch(`${import.meta.env.VITE_BASE_URL}/api/program-kerja/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then(checkTokenExpiration)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          alert('Program Kerja berhasil diperbarui!');
          setLoading(false);
          navigate('/progja')
        } else {
          alert('Terjadi kesalahan saat memperbarui Program Kerja.');
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error updating data:', error.message);
        alert('Terjadi kesalahan saat memperbarui Program Kerja.');
        setLoading(false);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div>
        <Link to="/progja" className='rounded-lg border text-white py-2 px-3 bg-blue-500'>Kembali</Link>
        <div className='flex justify-center text-2xl font-bold'>Edit Data Program Kerja</div>
      </div>
      <div className="max-w-6xl mx-auto reset-tw">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Timeline</label>
            <input
              type="text"
              required
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Masukkan Timeline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Nama Program Kerja</label>
            <input
              type="text"
              required
              value={kegiatan}
              onChange={(e) => setKegiatan(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Masukkan Nama Program Kerja"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Tujuan atau Isi Program Kerja</label>
            <CKEditor
              editor={ClassicEditor}
              data={tujuan}
              config={{
                toolbar: [
                  'heading', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'undo', 'redo'
                ],
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setTujuan(data);
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 rounded bg-primary text-white hover:bg-opacity-90 transition duration-300"
          >
            Update Program Kerja
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProgramKerja;
