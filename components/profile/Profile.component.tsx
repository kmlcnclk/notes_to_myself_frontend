import { RootState } from '@/src/store';
import React from 'react';
import { useSelector } from 'react-redux';

function ProfileComponent() {
  const user = useSelector((state: RootState) => state.user.value);
  console.log(user);

  return (
    <div className="my-5">
      <div className="flex justify-center items-center">
        <div className="text-center">
          <p>{user.email}</p>
          <p>{user.firstName}</p>
          <p>{user.lastName}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;
