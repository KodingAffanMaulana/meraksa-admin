import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { checkTokenExpiration } from '../../common/checkTokenExpiration';
import Loader from '../../common/Loader';

const KondisiSiswa = () => {
  const [image, setImage] = useState<any>(null);
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/kondisi-siswa`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setImage(data.data.image);
          setDescription(data.data.description);
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
    setLoading(true);
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Session expired. Please log in again.');
      window.location.href = '/login';
      return;
    }

    const formData = new FormData();
    formData.append('description', description);
    if (image instanceof File) {
      formData.append('image', image);
    }

    fetch(`${import.meta.env.VITE_BASE_URL}/api/kondisi-siswa/${id}`, {
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
          alert('Kondisi Siswa berhasil diperbarui!');
          setLoading(false);
        } else {
          alert('Terjadi kesalahan saat memperbarui kondisi siswa');
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error updating data:', error.message);
        alert('Terjadi kesalahan saat memperbarui kondisi siswa');
        setLoading(false);
      });
  };

  const handleFileChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  if (loading) return <Loader />;

  return (
    <>
      <Breadcrumb pageName="Manage Kondisi Siswa" />
      <div className="max-w-6xl mx-auto reset-tw">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Gambar <span className='text-warning'>(Atur jika diperlukan)</span></label>
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
                    <img src={image} alt="Kepala Sekolah Image" className="mb-4 max-h-40" />
                  ) : (
                    <img src={URL.createObjectURL(image)} alt="Kepala Sekolah Image" className="mb-4 max-h-40" />
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
            <label className="block text-black dark:text-white mb-2 font-semibold">Deskripsi Kondisi Siswa</label>
            <CKEditor
              editor={ClassicEditor}
              data={description}
              config={{
                toolbar: [
                  'heading', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'undo', 'redo'
                ],
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
          >
            Update Kondisi Siswa
          </button>
        </form>
        {/* <div dangerouslySetInnerHTML={{ __html: profil }} /> */}
      </div>
    </>
  );
};

export default KondisiSiswa;
