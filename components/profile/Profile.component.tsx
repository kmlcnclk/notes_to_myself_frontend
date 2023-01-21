import { RootState } from '@/src/store';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Caveat } from '@next/font/google';
import { EditFilled } from '@ant-design/icons';
import { deleteAccessTokenFromLocal } from '@/localStorage/accessToken.storage';
import { assignUserFirstName } from '@/src/slicers/firstName.slice';
import { deleteUser } from '@/src/slicers/user.slice';
import { useRouter } from 'next/router';
import UpdateUserComponent from './UpdateUser.component';

const caveat = Caveat({
  weight: '700',
});

function ProfileComponent() {
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  const logoutFunction = async () => {
    await deleteAccessTokenFromLocal();
    await dispatch(assignUserFirstName(''));
    await dispatch(deleteUser());

    router.push('/auth');
  };

  useEffect(() => {
    router.prefetch('/auth');
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  return (
    <div>
      <div className="my-5 flex items-center justify-center">
        <div className="bg-red-500 p-10 rounded-lg shadow-lg">
          <div className="text-center">
            <div className="flex space-x-2">
              <p
                className={`text-xl ${caveat.className} p-2 bg-slate-50 rounded-2xl w-full`}
              >
                Email:
              </p>
              <span className="flex justify-between w-full">
                <p className={`p-3 text-slate-50 font-semibold text-sm`}>
                  {user.email}
                </p>
                <span className="py-2 text-slate-50 font-semibold text-sm">
                  <EditFilled
                    className="cursor-pointer hover:scale-125 duration-200 transition-all"
                    onClick={showDrawer}
                  />
                </span>
              </span>
            </div>
            <div className="flex space-x-2">
              <p
                className={`text-xl ${caveat.className} p-2 bg-slate-50 rounded-2xl w-full`}
              >
                First Name:
              </p>
              <span className="flex justify-between w-full">
                <p className={`p-3 text-slate-50 font-semibold text-sm`}>
                  {user.firstName}
                </p>
                <span className="py-2 text-slate-50 font-semibold text-sm">
                  <EditFilled
                    className="cursor-pointer hover:scale-125 duration-200 transition-all"
                    onClick={showDrawer}
                  />
                </span>
              </span>
            </div>
            <div className="flex space-x-2">
              <p
                className={`text-xl ${caveat.className} p-2 bg-slate-50 rounded-2xl w-full`}
              >
                Last Name:
              </p>
              <span className="flex justify-between w-full">
                <p className={`p-3 text-slate-50 font-semibold text-sm`}>
                  {user.lastName}
                </p>
                <span className="py-2 text-slate-50 font-semibold text-sm">
                  <EditFilled
                    className="cursor-pointer hover:scale-125 duration-200 transition-all"
                    onClick={showDrawer}
                  />
                </span>
              </span>
            </div>
            <div
              className="flex items-center justify-center mt-7 cursor-pointer hover:scale-105 duration-200 transition-all"
              onClick={showDrawer}
            >
              <p
                className={`text-xl ${caveat.className} mb-0 py-2 px-4 bg-black rounded-2xl text-slate-50`}
              >
                Change Your Password
              </p>
            </div>
            <div
              className="flex items-center justify-center mt-7 cursor-pointer hover:scale-105 duration-200 transition-all"
              onClick={logoutFunction}
            >
              <p
                className={`text-xl ${caveat.className} mb-0 py-2 px-4 bg-blue-500 rounded-2xl text-slate-800`}
              >
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>
      <UpdateUserComponent {...{ open, setOpen, user }} />
    </div>
  );
}

export default ProfileComponent;
