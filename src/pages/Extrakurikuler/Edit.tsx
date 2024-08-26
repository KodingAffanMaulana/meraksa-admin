import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { checkTokenExpiration } from '../../common/checkTokenExpiration';

const EditEkstrakurikuler = () => {
  const { id } = useParams();
  const [image, setImage] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`${import.meta.env.VITE_BASE_URL}/api/ekstrakurikuler/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(checkTokenExpiration)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setTitle(data.data.title);
          setDescription(data.data.description);
          setImage(data.data.image);
        } else {
          alert('Gagal memuat data.');
          navigate('/ekstrakurikuler');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        alert('Terjadi kesalahan saat memuat data.');
        navigate('/ekstrakurikuler');
      });
  }, [id, navigate]);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
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
    if (image instanceof File) {
      formData.append('image', image);
    }
    formData.append('title', title);
    formData.append('description', description);

    fetch(`${import.meta.env.VITE_BASE_URL}/api/ekstrakurikuler/${id}`, {
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
          alert('Ekstrakurikuler berhasil diperbarui!');
          navigate('/ekstrakurikuler');
        } else {
          alert('Terjadi kesalahan saat memperbarui Ekstrakurikuler.');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        alert('Terjadi kesalahan saat memperbarui Ekstrakurikuler.');
        setLoading(false);
      });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className='justify-between flex items-center pb-5'>
        <h1 className='flex justify-center text-2xl font-bold'>Edit Ekstrakurikuler
        </h1>
        <Link to="/ekstrakurikuler" className='rounded-lg border text-white py-2 px-5 bg-blue-500'>Kembali</Link>
      </div>
      {/* <Breadcrumb pageName="Edit Ekstrakurikuler" /> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2 font-semibold">Judul</label>
          <input
            type="text"
            className="w-full p-3 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
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
                  <img src={image} alt="Sarana Prasarana Image" className="mb-4 max-h-40" />
                ) : (
                  <img src={URL.createObjectURL(image)} alt="Sarana Prasarana Image" className="mb-4 max-h-40" />
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
          {loading ? 'Memperbarui...' : 'Perbarui Ekstrakurikuler'}
        </button>
      </form>
    </div>
  );
};

export default EditEkstrakurikuler;
