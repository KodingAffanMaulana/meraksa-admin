import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { checkTokenExpiration } from '../../common/checkTokenExpiration';
import Loader from '../../common/Loader';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const KomiteSekolah = () => {
  const [image, setImage] = useState<any>(null);
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/komite-sekolah`, {
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

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Session expired. Please log in again.');
      window.location.href = '/login';
      return;
    }

    const formData = new FormData();
    if (image instanceof File) {
      formData.append('image', image);
    }
    formData.append('description', description);

    fetch(`${import.meta.env.VITE_BASE_URL}/api/komite-sekolah/${id}`, {
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
          alert('Data Komite Sekolah berhasil diperbarui!');
        } else {
          alert('Terjadi kesalahan saat memperbarui data Komite Sekolah.');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error updating data:', error.message);
        alert('Terjadi kesalahan saat memperbarui data Komite Sekolah.');
        setLoading(false);
      });
  };

  if (loading) return <Loader />;

  return (
    <section className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5  max-w-7xl mx-auto">
      <Breadcrumb pageName="Komite Sekolah" />
      <div >
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
                    <img src={image} alt="Komite Image" className="mb-4 max-h-40" />
                  ) : (
                    <img src={URL.createObjectURL(image)} alt="Komite Image" className="mb-4 max-h-40" />
                  )
                )}
                <p>
                  <span className="text-primary">Click to upload</span> or update image
                </p>
                <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
              </div>
            </div>
          </div>
          <div className="mb-4 reset-tw">
            <label className="block text-black dark:text-white mb-2 font-semibold">Deskripsi</label>
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
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full mr-2"></div>
                Updating...
              </div>
            ) : (
              'Update Komite Sekolah'
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default KomiteSekolah;
