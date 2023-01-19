import React, { useEffect, useState } from 'react';
import ProfileComponent from '@/components/profile/Profile.component';
import axios from 'axios';
import { getAccessTokenFromLocal } from '@/localStorage/accessToken.storage';
import { useDispatch } from 'react-redux';
import { assignUser } from '@/src/slicers/user.slice';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';

function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isUserAvailable, setIsUserAvailable] = useState(false);

  useEffect(() => {
    router.prefetch('/auth');
    axios
      .get('http://localhost:5000/user/profile', {
        headers: {
          Authorization: `Bearer ${getAccessTokenFromLocal()[0]}`,
        },
      })
      .then((response: any) => {
        dispatch(assignUser(response.data.user));
        setIsUserAvailable(true);
      })
      .catch(async (err) => {
        await toast.error(err.response.data.message, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          rtl: false,
          pauseOnHover: false,
        });
        router.push('/auth');
      });
  }, []);

  return (
    <div>
      <ToastContainer />
      {isUserAvailable && <ProfileComponent />}
    </div>
  );
}

export default Profile;
