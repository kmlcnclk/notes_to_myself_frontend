import React, { useEffect, useState } from 'react';
import NoteComponent from './Note.component';
import axios from 'axios';
import { getAccessTokenFromLocal } from '@/localStorage/accessToken.storage';
import { useRouter } from 'next/router';
import { Caveat } from '@next/font/google';

const caveat = Caveat({
  weight: '700',
});

function NoteListComponent() {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/authentication');
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/note/getAllNotesByUser`, {
        headers: {
          Authorization: `Bearer ${getAccessTokenFromLocal()[0]}`,
        },
      })
      .then(function (response) {
        setData(response.data.notes);
      })
      .catch(function (error) {
        console.log(error);
        router.push('/authentication');
      });
  }, [router]);

  return (
    <div className="pb-10">
      {data[0] ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 2xl:gap-8 mx-6">
          <div className="grid grid-cols-1 gap-6">
            {data?.map((d: any, i: number) => {
              if (i % 3 == 0) {
                return <NoteComponent key={d?._id} d={d} />;
              }
            })}
          </div>
          <div className="grid grid-cols-1 gap-6">
            {data?.map((d: any, i: number) => {
              if (i % 3 == 1) {
                return <NoteComponent key={d?._id} d={d} />;
              }
            })}
          </div>
          <div className="grid grid-cols-1 gap-6">
            {data?.map((d: any, i: number) => {
              if (i % 3 == 2) {
                return <NoteComponent key={d?._id} d={d} />;
              }
            })}
          </div>
        </div>
      ) : (
        <div
          className={`text-center text-gray-600 max-md:mt-2 max-md:text-md mt-10 md:text-2xl ${caveat.className}`}
        >
          You don&apos;t have any note...
        </div>
      )}
    </div>
  );
}

export default NoteListComponent;
