import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../common/Loader';
import { checkTokenExpiration } from '../../common/checkTokenExpiration';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EditPrestasiGuru = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<any>(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/prestasi-guru/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.status === 200) {
          setTitle(data.data.title);
          setImage(data.data.image);
          setDescription(data.data.description);
        } else {
          console.error('Failed to fetch prestasi guru data');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching prestasi guru data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  const handleFileChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    if (image instanceof File) {
      formData.append('image', image);
    }
    formData.append('description', description);

    fetch(`${import.meta.env.VITE_BASE_URL}/api/prestasi-guru/${id}`, {
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
          alert('Prestasi Guru berhasil diperbarui!');
          navigate('/prestasi-guru');
        } else {
          alert('Terjadi kesalahan saat memperbarui prestasi guru');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error updating prestasi guru:', error);
        alert('Terjadi kesalahan saat memperbarui prestasi guru');
        setLoading(false);
      });
  };

  if (loading) return <Loader />;

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className='justify-between flex items-center'>
        <div className='flex justify-center text-2xl font-bold'>Edit Prestasi Guru
        </div>
        <Link to="/prestasi-guru" className='rounded-lg border text-white py-2 px-5 bg-blue-500'>Kembali</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <label className="block text-black dark:text-white mb-2 font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md dark:bg-meta-4 dark:border-strokedark"
            placeholder="Masukkan judul"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2 font-semibold">Upload Gambar</label>
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
                  <div className='flex flex-col justify-center items-center'>
                    <img src={image} alt="Sarana Prasarana Image" className="mb-4 max-h-40" />
                  </div>
                ) : (
                  <div className='flex flex-col justify-center items-center'>
                    <img src={URL.createObjectURL(image)} alt="Sarana Prasarana Image" className="mb-4 max-h-40" />
                    <p className="mb-4 text-sm text-gray-700 text-nowrap">{image.name}</p>
                  </div>
                )
              )}
              <p>
                <span className="text-primary">Click to upload</span> or update image
              </p>
              <p className="mt-1.5">SVG, PNG, JPG, or GIF</p>
            </div>
          </div>
        </div>
        <div className="mb-4 reset-tw">
          <label className="block text-black dark:text-white mb-2 font-semibold">Description</label>
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
        >
          Update Prestasi Guru
        </button>
      </form>
    </div>
  );
};

export default EditPrestasiGuru;
