import Header from '@/components/Header.component';
import Layout from '@/components/Layout';
import AddNoteComponent from '../components/home/AddNote.component';
import NoteListComponent from '@/components/home/NoteList.component';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAccessTokenFromLocal } from '../localStorage/accessToken.storage';
import MenuComponent from '@/components/home/Menu.component';

function Home() {
  const router = useRouter();
  const [isAccess, setIsAccess] = useState(false);

  useEffect(() => {
    router.prefetch('/auth');

    const accessToken = getAccessTokenFromLocal()[0];
    if (!accessToken) {
      router.push('/auth');
    } else {
      setIsAccess(true);
    }
  }, []);

  return (
    <Layout>
      {isAccess && (
        <>
          <Header />
          <main>
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
