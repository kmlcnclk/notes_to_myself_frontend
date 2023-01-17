import React, { useEffect, useState } from 'react';
import NoteComponent from './Note.component';
import axios from 'axios';
import { getAccessTokenFromLocal } from '@/localStorage/accessToken.storage';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';

function NoteListComponent() {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/auth');
    axios
      .get('http://localhost:5000/note/getAllNotesByUser', {
        headers: {
          Authorization: `Bearer ${getAccessTokenFromLocal()[0]}`,
        },
      })
      .then(function (response) {
        setData(response.data.notes);
      })
      .catch(function (error) {
        console.log(error);
        router.push('/auth');
      });
  }, []);

  return (
    <div className="pb-10">
      <ToastContainer />
      <div className="grid grid-cols-3 gap-6 mx-6">
        {data?.map((d: any) => (
          <NoteComponent key={d?._id} d={d} />
        ))}
      </div>
    </div>
  );
}

export default NoteListComponent;