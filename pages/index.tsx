import Header from '@/components/Header.component';
import Layout from '@/components/Layout';
import AddNoteComponent from '../components/home/AddNote.component';
import NoteListComponent from '@/components/home/NoteList.component';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAccessTokenFromLocal } from '../localStorage/accessToken.storage';

function Home() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/auth');

    const accessToken = getAccessTokenFromLocal()[0];
    if (!accessToken) {
      router.push('/auth');
    }
  }, []);

  return (
    <Layout>
      <Header />
      <main>
        <AddNoteComponent />
        <div className="mb-6">
          <NoteListComponent />
        </div>
      </main>
    </Layout>
  );
}

export default Home;
