import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../common/Loader';
import { checkTokenExpiration } from '../../common/checkTokenExpiration';

const PostGallery = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleFileChange = (e: any) => {
    setImages([...e.target.files]);
  };

  useEffect(() => {
    const currentDate = new Date().toISOString();
    setDate(currentDate);
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('category', category);

    images.forEach((image: any) => {
      formData.append('image', image);
    });

    fetch(`${import.meta.env.VITE_BASE_URL}/api/photos`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then(checkTokenExpiration) // Cek apakah token kedaluwarsa
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          console.log('Photo gallery entry created successfully');
          navigate('/galeri-foto');
        } else {
          console.error('Failed to create photo gallery entry');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error creating photo gallery entry:', error.message);
        setLoading(false);
      });
  };


  if (loading) return <Loader />;

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className='justify-between flex items-center pb-10'>
        <div className='flex justify-center text-2xl font-bold'>Tambahkan Galeri Foto Baru
        </div>
        <Link to="/galeri-foto" className='rounded-lg border text-white py-2 px-5 bg-blue-500'>Kembali</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2 font-semibold">Nama Galeri</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md dark:bg-meta-4 dark:border-strokedark"
            placeholder="Enter title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2 font-semibold">Kategori</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-md dark:bg-meta-4 dark:border-strokedark"
            placeholder="Enter category"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2 font-semibold">Gambar <span className='text-success'>(Bisa lebih dari 1 gambar)</span></label>
          <div
            id="FileUpload"
            className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
          >
            <input
              type="file"
              accept="image/*"
              multiple
              className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center justify-center space-y-3">
              <p>
                <span className="text-primary">Click to upload</span>
              </p>
              <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
            </div>
          </div>
          {images.length > 0 && (
            <div className="mt-4">
              <h4 className="text-black dark:text-white mb-2 font-semibold">Images Preview</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((file: any, idx: number) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded Image ${idx + 1}`}
                    className="w-full h-32 object-contain rounded-md"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Tambahkan
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostGallery;
