import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { checkTokenExpiration } from '../../common/checkTokenExpiration';
import Loader from '../../common/Loader';

const EditKepalaSekolah = () => {
  const [title, setTitle] = useState('');
  const [tahunMemimpin, setTahunMemimpin] = useState('');
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/kepala-sekolah/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (result.status === 200) {
          setTitle(result.data.title);
          setTahunMemimpin(result.data.tahunMemimpin);
          setImage(result.data.image);
          setLoading(false);
        } else {
          console.error('Failed to fetch data');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
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
    formData.append('title', title);
    formData.append('tahunMemimpin', tahunMemimpin);
    if (image instanceof File) {
      formData.append('image', image);
    }

    fetch(`${import.meta.env.VITE_BASE_URL}/api/kepala-sekolah/${id}`, {
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
          alert('Kepala Sekolah berhasil diperbarui!');
          navigate('/kepala-sekolah');
        } else {
          alert('Terjadi kesalahan saat memperbarui Kepala Sekolah.');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error updating data:', error.message);
        alert('Terjadi kesalahan saat memperbarui Kepala Sekolah.');
        setLoading(false);
      });
  };

  if (loading) return <Loader />;

  return (
    <>
      <div>
        <Link to="/kepala-sekolah" className='rounded-lg border text-white py-2 px-3 bg-blue-500'>Kembali</Link>
        <div className='flex justify-center text-2xl font-bold'>Edit Data Kepala Sekolah</div>
      </div>
      <div className="max-w-6xl mx-auto reset-tw">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Nama Kepala Sekolah</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Masukkan Nama Kepala Sekolah"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Tahun Memimpin</label>
            <input
              type="text"
              required
              value={tahunMemimpin}
              onChange={(e) => setTahunMemimpin(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Masukkan Tahun Memimpin"
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
          <button
            type="submit"
            className="w-full py-3 px-6 rounded bg-primary text-white hover:bg-opacity-90 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Update Kepala Sekolah'}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditKepalaSekolah;