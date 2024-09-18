import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { checkTokenExpiration } from '../../common/checkTokenExpiration';
import Loader from '../../common/Loader';

const ProfileSekolah = () => {
  const [profil, setProfil] = useState('');
  const [visi, setVisi] = useState('');
  const [misi, setMisi] = useState('');
  const [npsn, setNpsn] = useState('');
  const [sambutan, setSambutan] = useState('');
  const [alamat, setAlamat] = useState('');
  const [telepon, setTelepon] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState<any>(null);
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
          setNpsn(data.data.npsn);
          setAlamat(data.data.alamat);
          setEmail(data.data.email);
          setTelepon(data.data.telepon);
          setImage(data.data.image);
          setSambutan(data.data.sambutan);
          setId(data.data.id);
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
    formData.append('profil', profil);
    formData.append('visi', visi);
    formData.append('misi', misi);
    formData.append('sambutan', sambutan);
    formData.append('alamat', alamat);
    formData.append('telepon', telepon);
    formData.append('email', email);
    formData.append('npsn', npsn);

    if (image instanceof File) {
      formData.append('image', image);
    }

    fetch(`${import.meta.env.VITE_BASE_URL}/api/information/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then(checkTokenExpiration)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          alert('Profil sekolah berhasil diperbarui!');
        } else {
          alert('Terjadi kesalahan saat memperbarui profil sekolah.');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error updating data:', error.message);
        alert('Terjadi kesalahan saat memperbarui profil sekolah.');
        setLoading(false);
      });
  };

  if (loading) return <Loader />;

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
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Profile</label>
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
            <label className="block text-black dark:text-white mb-2 font-semibold">Email</label>
            <CKEditor
              editor={ClassicEditor}
              data={email}
              config={{
                toolbar: [
                  'heading', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'undo', 'redo'
                ],
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setEmail(data);
              }}
            />

          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Telepon Sekolah</label>
            <CKEditor
              editor={ClassicEditor}
              data={telepon}
              config={{
                toolbar: [
                  'heading', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'undo', 'redo'
                ],
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setTelepon(data);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">NPSN</label>
            <CKEditor
              editor={ClassicEditor}
              data={npsn}
              config={{
                toolbar: [
                  'heading', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'undo', 'redo'
                ],
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setNpsn(data);
              }}
            />

          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Alamat</label>
            <CKEditor
              editor={ClassicEditor}
              data={alamat}
              config={{
                toolbar: [
                  'heading', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'undo', 'redo'
                ],
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setAlamat(data);
              }}
            />

          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Gambar Utama</label>
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
                    <img src={image} alt="Sejarah Image" className="mb-4 max-h-40" />
                  ) : (
                    <img src={URL.createObjectURL(image)} alt="Sejarah Image" className="mb-4 max-h-40" />
                  )
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
            Update Profil Sekolah
          </button>
        </form>
        {/* <div dangerouslySetInnerHTML={{ __html: profil }} /> */}
      </div>
    </section>
  );
};

export default ProfileSekolah;
