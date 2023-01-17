export const addAccessTokenToLocal = (access_token: string) => {
  const getToken = getAccessTokenFromLocal();

  if (getToken.indexOf(access_token) === -1 && access_token !== '') {
    getToken.push(access_token);
  }

  window.localStorage.setItem('access_token', JSON.stringify(getToken));
};

export const getAccessTokenFromLocal = () => {
  let access_token;
  if (window.localStorage.getItem('access_token') === null) {
    access_token = [];
  } else {
    // @ts-ignore
    access_token = JSON.parse(window.localStorage.getItem('access_token'));
  }
  return access_token;
};

export const deleteAccessTokenFromLocal = () => {
  window.localStorage.removeItem('access_token');
};
