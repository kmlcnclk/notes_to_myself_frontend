import Header from '@/components/Header.component';
import Layout from '@/components/Layout';
import AddNoteComponent from '../components/home/AddNote.component';
import NoteListComponent from '@/components/home/NoteList.component';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAccessTokenFromLocal } from '../localStorage/accessToken.storage';
import MenuComponent from '@/components/home/Menu.component';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { assignUser } from '@/src/slicers/user.slice';
import { toast, ToastContainer } from 'react-toastify';
import { assignUserFirstName } from '@/src/slicers/firstName.slice';

function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isAccess, setIsAccess] = useState(false);

  useEffect(() => {
    router.prefetch('/auth');

    const accessToken = getAccessTokenFromLocal()[0];
    if (!accessToken) {
      router.push('/auth');
    } else {
      axios
        .get('http://localhost:5000/user/profile', {
          headers: {
            Authorization: `Bearer ${getAccessTokenFromLocal()[0]}`,
          },
        })
        .then(async (response: any) => {
          await dispatch(assignUser(response.data.user));
          await dispatch(assignUserFirstName(response.data.user.firstName));
          setIsAccess(true);
        })
        .catch(async (err: any) => {
          await toast.error(err.response.data.message, {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            rtl: false,
            pauseOnHover: false,
          });
        });
    }
  }, []);

  return (
    <Layout>
      {isAccess && (
        <>
          <Header />
          <main>
            <ToastContainer />
            <MenuComponent />
            <AddNoteComponent />
            <div className="mb-6">
              <NoteListComponent />
            </div>
          </main>
        </>
      )}
    </Layout>
  );
}

export default Home;
