import Profile from '../pages/Profile';
import FormElements from '../pages/Form/FormElements';
import FormLayout from '../pages/Form/FormLayout';
import Tables from '../pages/Tables';
import Settings from '../pages/Settings';
import Chart from '../pages/Chart';
import Alerts from '../pages/UiElements/Alerts';
import Buttons from '../pages/UiElements/Buttons';
import ProfileSekolah from '../pages/ProfileSekolah';
import DashboardAdmin from '../pages/Dashboard';
import Sejarah from '../pages/Sejarah';
import SaranaPrasarana from '../pages/Sarana dan Prasarana';
import EditSaranaPrasarana from '../pages/Sarana dan Prasarana/Edit';
import Alumni from '../pages/Alumni';
import EditAlumni from '../pages/Alumni/Edit';
import PostSaranaPrasarana from '../pages/Sarana dan Prasarana/Tambah';
import PostAlumni from '../pages/Alumni/Tambah';
import StrukturOrganisasi from '../pages/Struktur Organisasi';
import EditStrukturOrganisasi from '../pages/Struktur Organisasi/Edit';
import CreateStrukturOrganisasi from '../pages/Struktur Organisasi/Tambah';
import ProgramKerjaTable from '../pages/Program Kerja';
import EditProgramKerja from '../pages/Program Kerja/Edit';
import CreateProgramKerja from '../pages/Program Kerja/Tambah';
import Prestasi from '../pages/Prestasi';
import EditPrestasi from '../pages/Prestasi/Edit';
import KepalaSekolah from '../pages/Kepala Sekolah';
import CreateKepalaSekolah from '../pages/Kepala Sekolah/Tambah';
import EditKepalaSekolah from '../pages/Kepala Sekolah/Edit';
import KomiteSekolah from '../pages/Komite Sekolah';
import EkstrakurikulerTable from '../pages/Extrakurikuler';
import TambahEkstrakurikuler from '../pages/Extrakurikuler/Tambah';
import EditEkstrakurikuler from '../pages/Extrakurikuler/Edit';
import SiswaTable from '../pages/Direktori Siswa';
import PostSiswa from '../pages/Direktori Siswa/Tambah';
import EditSiswa from '../pages/Direktori Siswa/Edit';
import NewsTable from '../pages/Berita';
import EditNews from '../pages/Berita/Edit';
import PostNews from '../pages/Berita/Tambah';
import KalenderAkademikTable from '../pages/Kalender Akademik';
import CreateKalenderAkademik from '../pages/Kalender Akademik/Tambah';
import EditKalenderAkademik from '../pages/Kalender Akademik/Edit';
import KondisiSiswa from '../pages/Kondisi Siswa';
import SilabusTable from '../pages/Silabus';
import CreateSilabus from '../pages/Silabus/Tambah';
import EditSilabus from '../pages/Silabus/Edit';
import PrestasiGuruTable from '../pages/Prestasi Guru';
import CreatePrestasiGuru from '../pages/Prestasi Guru/Tambah';
import EditPrestasiGuru from '../pages/Prestasi Guru/Edit';
import AdminGallery from '../pages/Galeri Foto';
import EditPhoto from '../pages/Galeri Foto/Edit';
import PostGallery from '../pages/Galeri Foto/Tambah';
import VideoTable from '../pages/Galeri Video';
import CreateVideo from '../pages/Galeri Video/Tambah';
import EditVideo from '../pages/Galeri Video/Edit';
import CreatePrestasi from '../pages/Prestasi/Tambah';
// const SignIn = lazy(() => import('./pages/Authentication/SignIn'));
// const SignUp = lazy(() => import('./pages/Authentication/SignUp'));
// const Calendar = lazy(() => import('./pages/Calendar'));
// const Chart = lazy(() => import('./pages/Chart'));
// const ECommerce = lazy(() => import('./pages/Dashboard/ECommerce'));
// const FormElements = lazy(() => import('./pages/Form/FormElements'));
// const FormLayout = lazy(() => import('./pages/Form/FormLayout'));
// const Profile = lazy(() => import('./pages/Profile'));
// const Settings = lazy(() => import('./pages/Settings'));
// const Tables = lazy(() => import('./pages/Tables'));
// const Alerts = lazy(() => import('./pages/UiElements/Alerts'));
// const Buttons = lazy(() => import('./pages/UiElements/Buttons'));

const coreRoutes = [
  {
    path: '/',
    title: 'Meraksa Aji Admin',
    component: DashboardAdmin,
  },
  {
    path: '/profile-sekolah',
    title: 'Profile Sekolah',
    component: ProfileSekolah,
  },
  {
    path: '/sejarah',
    title: 'Sejarah',
    component: Sejarah,
  },
  {
    path: '/sarana-prasarana',
    title: 'Sarana Prasarana',
    component: SaranaPrasarana,
  },
  {
    path: '/edit-sarana/:id',
    title: 'Sarana Prasarana',
    component: EditSaranaPrasarana,
  },
  {
    path: '/sarana-prasarana/tambah',
    title: 'Tambah Sarana Prasarana',
    component: PostSaranaPrasarana,
  },
  {
    path: '/alumni',
    title: 'Alumni',
    component: Alumni,
  },
  {
    path: '/alumni/:id',
    title: 'Alumni',
    component: EditAlumni,
  },
  {
    path: '/alumni/tambah',
    title: 'Alumni',
    component: PostAlumni,
  }, {
    path: '/struktur',
    title: 'Struktur Organisasi',
    component: StrukturOrganisasi,
  },
  {
    path: '/struktur/:id',
    title: 'Struktur Organisasi',
    component: EditStrukturOrganisasi,
  }, {
    path: '/struktur/tambah',
    title: 'Struktur Organisasi',
    component: CreateStrukturOrganisasi,
  },
  {
    path: '/progja',
    title: 'Program Kerja',
    component: ProgramKerjaTable,
  },
  {
    path: '/progja/:id',
    title: 'Program Kerja',
    component: EditProgramKerja,
  },
  {
    path: '/progja/tambah',
    title: 'Program Kerja',
    component: CreateProgramKerja,
  },
  {
    path: '/prestasi',
    title: 'Prestasi',
    component: Prestasi,
  },
  {
    path: '/prestasi/:id',
    title: 'Prestasi',
    component: EditPrestasi,
  },
  {
    path: '/prestasi/tambah',
    title: 'Prestasi',
    component: CreatePrestasi,
  },
  {
    path: '/kepala-sekolah',
    title: 'Kepala Sekolah',
    component: KepalaSekolah,
  },
  {
    path: '/kepala-sekolah/:id',
    title: 'Kepala Sekolah',
    component: EditKepalaSekolah,
  },
  {
    path: '/kepala-sekolah/tambah',
    title: 'Kepala Sekolah',
    component: CreateKepalaSekolah,
  },
  {
    path: '/komite-sekolah',
    name: 'Komite Sekolah',
    component: KomiteSekolah,
  },
  {
    path: '/ekstrakurikuler',
    title: 'Ekstrakurikuler',
    component: EkstrakurikulerTable,
  },
  {
    path: '/ekstrakurikuler/:id',
    title: 'Ekstrakurikuler',
    component: EditEkstrakurikuler,
  },
  {
    path: '/ekstrakurikuler/tambah',
    title: 'Ekstrakurikuler',
    component: TambahEkstrakurikuler,
  },
  {
    path: '/siswa',
    title: 'Direktori Siswa',
    component: SiswaTable,
  },
  {
    path: '/siswa/:id',
    title: 'Direktori Siswa',
    component: EditSiswa,
  },
  {
    path: '/siswa/tambah',
    title: 'Direktori Siswa',
    component: PostSiswa,
  },
  {
    path: '/news',
    title: 'Berita dan Artikel',
    component: NewsTable,
  },
  {
    path: '/news/:id',
    title: 'Berita dan Artikel',
    component: EditNews,
  },
  {
    path: '/news/tambah',
    title: 'Berita dan Artikel',
    component: PostNews,
  },
  {
    path: '/kalender',
    title: 'Kalender Akademik',
    component: KalenderAkademikTable,
  }, {
    path: '/kalender/:id',
    title: 'Kalender Akademik',
    component: EditKalenderAkademik,
  }, {
    path: '/kalender/tambah',
    title: 'Kalender Akademik',
    component: CreateKalenderAkademik,
  },
  {
    path: '/silabus',
    title: 'Silabus dan Materi Ajar',
    component: SilabusTable,
  }, {
    path: '/silabus/:id',
    title: 'Silabus dan Materi Ajar',
    component: EditSilabus,
  }, {
    path: '/silabus/tambah',
    title: 'Silabus dan Materi Ajar',
    component: CreateSilabus,
  },
  {
    path: '/prestasi-guru',
    title: 'Prestasi Guru',
    component: PrestasiGuruTable,
  }, {
    path: '/prestasi-guru/:id',
    title: 'Prestasi Guru',
    component: EditPrestasiGuru,
  }, {
    path: '/prestasi-guru/tambah',
    title: 'Prestasi Guru',
    component: CreatePrestasiGuru,
  },
  {
    path: '/galeri-foto',
    title: 'Galeri Foto',
    component: AdminGallery,
  },
  {
    path: '/galeri-foto/edit/:id',
    title: 'Galeri Foto',
    component: EditPhoto,
  },

  {
    path: '/galeri-foto/tambah',
    title: 'Galeri Foto',
    component: PostGallery,
  },
  {
    path: '/galeri-video',
    title: 'Galeri Video',
    component: VideoTable,
  },
  {
    path: '/galeri-video/edit/:id',
    title: 'Galeri Video',
    component: EditVideo,
  },

  {
    path: '/galeri-video/tambah',
    title: 'Galeri Video',
    component: CreateVideo,
  },

  {
    path: '/kondisi-siswa',
    title: 'Kondisi Siswa',
    component: KondisiSiswa,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Form Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layout',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const privateRoutes = [...coreRoutes];
export default privateRoutes;
