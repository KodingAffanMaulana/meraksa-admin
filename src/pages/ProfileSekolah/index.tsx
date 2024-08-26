import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { checkTokenExpiration } from '../../common/checkTokenExpiration';

const ProfileSekolah = () => {
  const [profil, setProfil] = useState('');
  const [visi, setVisi] = useState('');
  const [misi, setMisi] = useState('');
  const [sambutan, setSambutan] = useState('');
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
          setSambutan(data.data.sambutan);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e: any) => {
    setLoading(true)
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Session expired. Please log in again.');
      window.location.href = '/login';
      return;
    }

    const requestBody = {
      profil: profil,
      visi: visi,
      misi: misi,
      sambutan: sambutan,
    };

    fetch(`${import.meta.env.VITE_BASE_URL}/api/information/${id}`, {
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
          alert('Profil sekolah berhasil diperbarui!');
          setLoading(false);
        } else {
          alert('Terjadi kesalahan saat memperbarui profil sekolah.');
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error updating data:', error.message);
        alert('Terjadi kesalahan saat memperbarui profil sekolah.');
        setLoading(false);
      });
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 mx-auto">
      <Breadcrumb pageName="Profil Sekolah" />
      <div className="reset-tw">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Informasi Sekolah</label>
            <CKEditor
              editor={ClassicEditor}
              data={profil}
              config={{
                toolbar: [
                  'heading', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'undo', 'redo'
                ],
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setProfil(data);
              }}
            />

          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Visi Sekolah</label>
            <CKEditor
              editor={ClassicEditor}
              data={visi}
              config={{
                toolbar: [
                  'heading', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'undo', 'redo'
                ],
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setVisi(data);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Misi Sekolah</label>
            <CKEditor
              editor={ClassicEditor}
              data={misi}
              config={{
                toolbar: [
                  'heading', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'undo', 'redo'
                ],
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setMisi(data);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Sambutan Kepala Sekolah</label>
            <CKEditor
              editor={ClassicEditor}
              data={sambutan}
              config={{
                toolbar: [
                  'heading', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'undo', 'redo'
                ],
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setSambutan(data);
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 rounded bg-primary text-white hover:bg-opacity-90 transition duration-300"
          >
            Update Profil Sekolah
          </button>
        </form>
        {/* <div dangerouslySetInnerHTML={{ __html: profil }} /> */}
      </div>
    </section>
  );
};

export default ProfileSekolah;
