import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Loader from '../../common/Loader';
import { checkTokenExpiration } from '../../common/checkTokenExpiration';

const EditSilabus = () => {
  const [tahun, setTahun] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/silabus/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.status === 200) {
          setTahun(data.data.tahun);
          setTitle(data.data.title);
          setFile(data.data.file);
        } else {
          console.error('Failed to fetch silabus data');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching silabus data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('tahun', tahun);
    formData.append('title', title);
    if (file instanceof File) {
      formData.append('file', file);
    }

    fetch(`${import.meta.env.VITE_BASE_URL}/api/silabus/${id}`, {
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
          alert('Silabus berhasil diperbarui!');
          navigate('/silabus');
        } else {
          alert('Terjadi kesalahan saat memperbarui silabus');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error updating silabus:', error);
        alert('Terjadi kesalahan saat memperbarui silabus');
        setLoading(false);
      });
  };

  if (loading) return <Loader />;

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <Breadcrumb pageName="Edit Silabus" />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2 font-semibold">Tahun</label>
          <input
            type="text"
            value={tahun}
            onChange={(e) => setTahun(e.target.value)}
            className="w-full px-4 py-2 border rounded-md dark:bg-meta-4 dark:border-strokedark"
            placeholder="Masukkan tahun"
            required
          />
        </div>
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
          <label className="block text-black dark:text-white mb-2 font-semibold">Upload File</label>
          {file && (
            typeof file === 'string' ? (
              <a href={file} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                Download File Saat Ini
              </a>
            ) : (
              <p className="mb-4 text-sm text-gray-700">{file.name}</p>
            )
          )}
          <div
            id="FileUpload"
            className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
          >

            <input
              type="file"
              accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center justify-center space-y-3">

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
          Update Silabus
        </button>
      </form>
    </div>
  );
};

export default EditSilabus;
