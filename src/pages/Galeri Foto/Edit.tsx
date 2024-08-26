import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loader from '../../common/Loader';
import { checkTokenExpiration } from '../../common/checkTokenExpiration';

const EditPhoto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [newImages, setNewImages] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPhotoDetails();
  }, [id]);

  const fetchPhotoDetails = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/photos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        setPhoto(data.data);
        setTitle(data.data.title);
        setDate(data.data.date);
        setCategory(data.data.category);
      } else {
        console.error('Failed to retrieve photo details');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching photo details:', error);
      setLoading(false);
    }
  };

  const handleFileChange = (e: any) => {
    setNewImages([...e.target.files]);
  };

  const handleDeleteImage = (imageId: any) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this image?');
    if (confirmDelete) {
      fetch(`${import.meta.env.VITE_BASE_URL}/api/photos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          removeImageIds: [imageId],
        }),
      })
        .then(checkTokenExpiration) // Cek apakah token kedaluwarsa
        .then((response) => {
          if (response.ok) {
            setPhoto((prevPhoto: any) => ({
              ...prevPhoto,
              image: prevPhoto.image.filter((img: any) => img.id !== imageId),
            }));
            console.log('Image deleted successfully');
          } else {
            console.error('Failed to delete image');
          }
        })
        .catch((error) => {
          console.error('Error deleting image:', error.message);
        });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('category', category);

    newImages.forEach((image: any) => {
      formData.append('image', image);
    });

    fetch(`${import.meta.env.VITE_BASE_URL}/api/photos/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then(checkTokenExpiration) // Cek apakah token kedaluwarsa
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log('Photo updated successfully');
          navigate(`/galeri-foto/`);
        } else {
          console.error('Failed to update photo');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error updating photo:', error.message);
        setLoading(false);
      });
  };


  if (loading) return <Loader />;

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className='justify-between flex items-center pb-10'>
        <div className='flex justify-center text-2xl font-bold'>Edit Galeri Foto
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
          <label className="block text-black dark:text-white mb-2 font-semibold">Gambar Sebelumnya</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photo.image.map((img: any) => (
              <div key={img.id} className="relative">
                <img
                  src={img.url}
                  alt="Photo"
                  className="w-full h-32 object-contain rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(img.id)}
                  className="absolute top-0 right-0 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                >
                  Hapus Foto
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2 font-semibold">Tambahkan Gambar Baru</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-md dark:bg-meta-4 dark:border-strokedark"
          />
          {newImages.length > 0 && (
            <div className="mt-4">
              <h4 className="text-black dark:text-white mb-2 font-semibold">Preview Gambar</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {newImages.map((file: any, idx: number) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(file)}
                    alt="New Photo"
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
            Update Photo
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPhoto;

