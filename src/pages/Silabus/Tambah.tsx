import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Loader from '../../common/Loader';
import { checkTokenExpiration } from '../../common/checkTokenExpiration';

const CreateSilabus = () => {
  const [tahun, setTahun] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('tahun', tahun);
    formData.append('title', title);
    if (file) {
      formData.append('file', file);
    }

    fetch(`${import.meta.env.VITE_BASE_URL}/api/silabus`, {
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
          alert('Silabus berhasil ditambahkan!');
          navigate('/silabus');
        } else {
          alert('Terjadi kesalahan saat menambahkan silabus');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error creating silabus:', error);
        alert('Terjadi kesalahan saat menambahkan silabus');
        setLoading(false);
      });
  };

  if (loading) return <Loader />;

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <Breadcrumb pageName="Tambah Silabus" />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
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
          <label className="block text-black dark:text-white mb-2 font-semibold">Tahun</label>
          <input
            type="text"
            value={tahun}
            onChange={(e) => setTahun(e.target.value)}
            className="w-full px-4 py-2 border rounded-md dark:bg-meta-4 dark:border-strokedark"
            placeholder="Masukkan tahun contoh: 2024"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2 font-semibold">Upload File</label>
          <div
            id="FileUpload"
            className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
          >
            <input
              type="file"
              accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
              onChange={handleFileChange}
              required
            />
            <div className="flex flex-col items-center justify-center space-y-3">
              {file && (
                <p className="mb-4 text-sm text-gray-700">{file.name}</p>
              )}
              <p>
                <span className="text-primary">Click to upload</span> or update file
              </p>
              <p className="mt-1.5">PDF, DOC, DOCX</p>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 rounded bg-primary text-white hover:bg-opacity-90 transition duration-300"
        >
          Tambah Silabus
        </button>
      </form>
    </div>
  );
};

export default CreateSilabus;
