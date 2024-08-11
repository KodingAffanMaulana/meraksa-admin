export const checkTokenExpiration = async (response: any) => {
  if (response.status >= 400 && response.status < 500) {
    if (response.status === 400 || response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('data');
      alert('Session expired. Please log in again.');
      window.location.href = '/auth/signin'; // Redirect to login page
    } else if (response.status === 403) {
      alert('You do not have permission to access this resource.');
    } else {
      // Handle other 4xx errors
      alert('An error occurred. Please try again.');
    }
  }
  return response;
};
