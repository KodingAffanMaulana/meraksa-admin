import { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { checkTokenExpiration } from '../../common/checkTokenExpiration';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditProgramKerja = () => {
  const [timeline, setTimeline] = useState('');
  const [kegiatan, setKegiatan] = useState('');
  const [tujuan, setTujuan] = useState('');
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/program-kerja/${id}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setTimeline(data.data.timeline);
          setKegiatan(data.data.kegiatan);
          setTujuan(data.data.tujuan);
          setImage(data.data.image); // Mengambil data gambar dari respons
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [id]);

  const handleFileChange = (e: any) => {
    setImage(e.target.files[0]); // Set file gambar yang diupload
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
    formData.append('timeline', timeline);
    formData.append('kegiatan', kegiatan);
    formData.append('tujuan', tujuan);
    if (image instanceof File) {
      formData.append('image', image); // Jika ada gambar yang diupload, tambahkan ke FormData
    }

    fetch(`${import.meta.env.VITE_BASE_URL}/api/program-kerja/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // Mengirim FormData
    })
      .then(checkTokenExpiration)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          alert('Program Kerja berhasil diperbarui!');
          setLoading(false);
          navigate('/progja');
        } else {
          alert('Terjadi kesalahan saat memperbarui Program Kerja.');
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error updating data:', error.message);
        alert('Terjadi kesalahan saat memperbarui Program Kerja.');
        setLoading(false);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 mx-auto">
      <div className='justify-between flex items-center pb-5'>
        <div className='flex justify-center text-2xl font-bold'>Edit Data Program Kerja
        </div>
        <Link to="/progja" className='rounded-lg border text-white py-2 px-5 bg-blue-500'>Kembali</Link>
      </div>
      <div className="reset-tw">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Timeline</label>
            <input
              type="text"
              required
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Masukkan Timeline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Nama Program Kerja</label>
            <input
              type="text"
              required
              value={kegiatan}
              onChange={(e) => setKegiatan(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Masukkan Nama Program Kerja"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white mb-2 font-semibold">Tujuan atau Isi Program Kerja</label>
            <CKEditor
              editor={ClassicEditor}
              data={tujuan}
              config={{
                toolbar: [
                  'heading', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'undo', 'redo'
                ],
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setTujuan(data);
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
                    <img src={image} alt="Program Image" className="mb-4 max-h-40" />
                  ) : (
                    <img src={URL.createObjectURL(image)} alt="Program Image" className="mb-4 max-h-40" />
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
            Update Program Kerja
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditProgramKerja;
