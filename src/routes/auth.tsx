import SignIn from "../pages/Authentication/SignIn";
import SignUp from "../pages/Authentication/SignUp";

const authRoutes = [
  {
    path: '/auth/signin',
    title: 'Sign In',
    component: SignIn,
  },
  {
    path: '/auth/signup',
    title: 'Sign Up',
    component: SignUp,
  },
];

export default authRoutes;