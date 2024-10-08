import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { checkTokenExpiration } from '../../common/checkTokenExpiration';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EditPengumuman = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  // const [kategoriblog, setKategoriblog] = useState('pengumuman');
  const [tag, setTag] = useState('');
  const [altImage, setAltImage] = useState('');
  const [publishAt, setPublishAt] = useState('');
  const [penulis, setPenulis] = useState('');
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewsData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/news/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (result.status === 200) {
          const news = result.data;
          setTitle(news.title);
          setExcerpt(news.excerpt);
          setBody(news.body);
          // setKategoriblog(news.kategoriblog);
          setTag(news.tag);
          setAltImage(news.altImage);
          setPublishAt(news.publishAt);
          setPenulis(news.penulis);
          setImage(news.image);
        } else {
          alert('Gagal mengambil data pengumuman.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchNewsData();
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
    formData.append('excerpt', excerpt);
    formData.append('body', body);
    // formData.append('kategoriblog', kategoriblog);
    formData.append('tag', tag);
    formData.append('altImage', altImage);
    formData.append('publishAt', publishAt);
    formData.append('penulis', penulis);
    if (image && image instanceof File) {
      formData.append('image', image);
    }

    fetch(`${import.meta.env.VITE_BASE_URL}/api/news/${id}`, {
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
          alert('Pengumuman berhasil diperbarui!');
          navigate('/pengumuman');
        } else {
          alert('Terjadi kesalahan saat memperbarui pengumuman.');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error updating data:', error.message);
        alert('Terjadi kesalahan saat memperbarui pengumuman.');
        setLoading(false);
      });
  };

  return (
    <section className="max-w-6xl mx-auto">
      <div className='justify-between flex items-center pb-10'>
        <div className='flex justify-center text-2xl font-bold'>Edit Pengumuman
        </div>
        <Link to="/pengumuman" className='rounded-lg border text-white py-2 px-5 bg-blue-500'>Kembali</Link>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">
              Judul <span className='text-danger text-sm'>* Wajib Diisi</span>
            </label>
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Judul"
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">
              Kategori Pengumuman <span className='text-danger text-sm'>* Wajib Diisi</span>
            </label>
            <select
              required
              value={kategoriblog}
              onChange={(e) => setKategoriblog(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Pilih Kategori</option>
              <option value="Pengumuman">Pengumuman <span className='text-warning'>(akan ditampilkan pada halaman utama)</span></option>
              <option value="Pengumuman">Pengumuman</option>
              <option value="Lain-lain">Lain-lain</option>
            </select>
          </div> */}
          {/* <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">
              Tag <span className='text-danger text-sm'>* Wajib Diisi</span>
            </label>
            <input
              required
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Tag"
            />
          </div> */}
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">
              Penulis <span className='text-danger text-sm'>* Wajib Diisi</span>
            </label>
            <input
              required
              type="text"
              value={penulis}
              onChange={(e) => setPenulis(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Penulis"
            />
          </div>
          <div className="mb-4 reset-tw">
            <label className="block text-black dark:text-white mb-2 font-semibold">
              Detail Pengumuman <span className='text-danger text-sm'>* Wajib Diisi</span>
            </label>
            <CKEditor
              editor={ClassicEditor}
              data={body}
              onChange={(event, editor) => {
                const data = editor.getData();
                setBody(data);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">
              Upload Gambar
            </label>
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
                    <img src={image} alt="News Image" className="mb-4 max-h-40" />
                  ) : (
                    <img src={URL.createObjectURL(image)} alt="News Image" className="mb-4 max-h-40" />
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
            {loading ? 'Submitting...' : 'Perbarui Pengumuman'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditPengumuman;
