import AuthenticationError from './AuthenticationError';

const fetcher = async (url, options) => {
  const response = await fetch(url, options);

  if (!response.status.toString().startsWith('2')) {
    const { message } = await response.json();
    throw new Error(message);
  }

  return response.json();
};

const refreshAccessToken = async () => {
  localStorage.removeItem('accessToken');
  throw new AuthenticationError('Mohon login ulang.');
};

const fetchWithAuthentication = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  if (!response.status.toString().startsWith('2')) {
    if (response.status === 401) {
      await refreshAccessToken();
      return fetchWithAuthentication(url, options);
    }
    const { message } = await response.json();
    throw new Error(message);
  }

  return response.json();
};

export { fetchWithAuthentication };
export default fetcher;
