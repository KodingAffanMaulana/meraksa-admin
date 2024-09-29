import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
// import ChartOne from '../../components/Charts/ChartOne';
// import ChartThree from '../../components/Charts/ChartThree';
// import ChartTwo from '../../components/Charts/ChartTwo';
// import ChatCard from '../../components/Chat/ChatCard';
// import MapOne from '../../components/Maps/MapOne';
// import TableOne from '../../components/Tables/TableOne';

const DashboardAdmin: React.FC = () => {
  const [dataCounts, setDataCounts] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/data-counts`);
        const result = await response.json();
        console.log(result.data); // Cek data yang dikembalikan

        // Set data counts dari API
        setDataCounts(result.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Jangan lupa menambahkan array kosong agar useEffect hanya dipanggil sekali

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        {/* Menampilkan data yang diterima dari API */}
        <CardDataStats
          title="Total Kepala Sekolah"
          total={dataCounts.totalKepalaSekolah || 0}
          link={'/kepala-sekolah'}
        >
          <img src="/images/grade.svg" alt="icon" className="w-10 h-10" />
        </CardDataStats>

        <CardDataStats
          title="Total Sarana Prasarana"
          total={dataCounts.totalSaranaPrasaranao || 0}
          link={'/sarana-prasarana'}
        >
          <img src="/images/sarana.svg" alt="icon" className="w-10 h-10" />
        </CardDataStats>

        <CardDataStats
          title="Total Prestasi Siswa"
          total={dataCounts.totalPrestasiSiswa || 0}
          link={'/prestasi'}
        >
          <img src="/images/prestasi.svg" alt="icon" className="w-10 h-10" />
        </CardDataStats>

        <CardDataStats
          title="Daftar Guru"
          total={dataCounts.totalStrukturOrganisasi || 0}
          link={'/struktur'}
        >
          <img src="/images/teacher.svg" alt="icon" className="w-10 h-10" />
        </CardDataStats>

        <CardDataStats
          title="Total News"
          total={dataCounts.totalNews || 0}
          link={'/news'}
        >
          <img src="/images/news.svg" alt="icon" className="w-10 h-10" />
        </CardDataStats>

        <CardDataStats
          title="Total Program Kerja"
          total={dataCounts.totalProgramKerja || 0}
          link={'/progja'}
        >
          <img src="/images/progja.svg" alt="icon" className="w-10 h-10" />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <MapOne /> */}
        {/* <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div> */}
        {/* <ChatCard /> */}
      </div>
    </>
  );
};

export default DashboardAdmin;
