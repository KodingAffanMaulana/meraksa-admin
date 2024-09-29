import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LogoDark from '../../images/287111727_35017111-0211-4f6e-b225-1a3b2407cd01.jpg';
import Logo from '../../images/287111727_35017111-0211-4f6e-b225-1a3b2407cd01.jpg';

const SignIn: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('data', JSON.stringify(data?.data?.user));
        navigate('/');
      } else {
        const message = await response.json();
        setError(message.error || 'Login failed');
      }

      window.location.reload();
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <>
      {/* <Breadcrumb pageName="Sign In" /> */}
      <div className="inset-0 min-h-[90vh] flex flex-col justify-center">
        <div className="justify-center flex flex-wrap items-center rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-10 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img className="hidden dark:block" src={Logo} alt="Logo" />
                <img className="dark:hidden" src={LogoDark} alt="Logo" />
              </Link>

              <p className="2xl:px-20">
                Dashboard Admin Website SMAN 1 Meraksa Aji
              </p>

              <span className="mt-15 inline-block">
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <div className='flex items-center justify-center gap-3 lg:gap-5 mb-7 lg:mb-9'>
                <img className="w-10 md:w-15" src="/images/logo.png" alt="Logo" />
                <h2 className="text-[18px] text-nowrap xl:text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Admin SMAN 1 Merkasa Aji
                </h2>
              </div>

              <form onSubmit={handleLogin}>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white text-sm md:text-[18px]">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Masukkan username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="text-sm md:text-[18px] w-full rounded-lg border border-stroke bg-transparent py-2 md:py-4 pl-4 md:pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white text-sm md:text-[18px]">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="text-sm md:text-[18px] w-full rounded-lg border border-stroke bg-transparent py-2 md:py-4 pl-4 md:pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <input
                    type="submit"
                    value="Masuk"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-2 lg:p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>

                {/* <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                  <span>
                  </span>
                  Sign in with Google
                </button> */}

                {/* <div className="mt-6 text-center">
                  <p>
                    Don’t have any account?{' '}
                    <Link to="/auth/signup" className="text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
