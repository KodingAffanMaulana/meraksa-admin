import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { checkTokenExpiration } from '../../common/checkTokenExpiration';

const CreatePrestasi = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<any>(null);
  const [jenisPrestasi, setJenisPrestasi] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    formData.append('jenisPrestasi', jenisPrestasi);
    formData.append('deskripsi', deskripsi);
    if (image instanceof File) {
      formData.append('image', image);
    }

    fetch(`${import.meta.env.VITE_BASE_URL}/api/prestasi`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then(checkTokenExpiration)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          alert('Prestasi berhasil ditambahkan!');
          navigate('/prestasi');
        } else {
          alert('Terjadi kesalahan saat menambahkan prestasi.');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error posting data:', error.message);
        alert('Terjadi kesalahan saat menambahkan prestasi.');
        setLoading(false);
      });
  };

  return (
    <section className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 mx-auto">
      <div className='justify-between flex items-center pb-5'>
        <div className='flex justify-center text-2xl font-bold'>Tambah Prestasi
        </div>
        <Link to="/prestasi" className='rounded-lg border text-white py-2 px-5 bg-blue-500'>Kembali</Link>
      </div>
      <div className="reset-tw">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Judul Prestasi</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Masukkan Judul Prestasi"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Jenis Prestasi</label>
            <input
              type="text"
              required
              value={jenisPrestasi}
              onChange={(e) => setJenisPrestasi(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Masukkan Jenis Prestasi"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Deskripsi</label>
            <CKEditor
              editor={ClassicEditor}
              data={deskripsi}
              config={{
                toolbar: [
                  'heading', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'undo', 'redo',
                ],
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDeskripsi(data);
              }}
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
                    <img src={image} alt="Alumni Image" className="mb-4 max-h-40" />
                  ) : (
                    <img src={URL.createObjectURL(image)} alt="Alumni Image" className="mb-4 max-h-40" />
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
            {loading ? 'Loading...' : 'Tambah Prestasi'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePrestasi;
