import Calendar from '../pages/Calendar';
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
    path: '/calendar',
    title: 'Calendar',
    component: Calendar,
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
