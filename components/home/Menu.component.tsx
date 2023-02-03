import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import {
  deleteAccessTokenFromLocal,
  getAccessTokenFromLocal,
} from '@/localStorage/accessToken.storage';
import { useRouter } from 'next/router';
import { Button, Dropdown, Space } from 'antd';
import type { RootState } from '../../src/store';
import { useSelector, useDispatch } from 'react-redux';
import { assignUserFirstName } from '../../src/slicers/firstName.slice';
import { deleteUser } from '@/src/slicers/user.slice';

type menuPropsType = {
  items: MenuProps['items'];
  onClick: MenuProps['onClick'];
};

function MenuComponent() {
  const router = useRouter();
  const firstName = useSelector((state: RootState) => state.firstName.value);
  const dispatch = useDispatch();

  const handleMenuClickWithAccessToken: MenuProps['onClick'] = (e) => {
    if (e.key == '1') {
      router.push('/profile');
    } else if (e.key == '2') {
      logoutFunction();
    }
  };

  const handleMenuClickWithoutAccessToken: MenuProps['onClick'] = (e) => {
    if (e.key == '1') {
      router.push('/register');
    } else if (e.key == '2') {
      router.push('/login');
    }
  };

  const logoutFunction = async () => {
    await deleteAccessTokenFromLocal();
    await dispatch(assignUserFirstName(''));
    await dispatch(deleteUser());

    router.push('/authentication');
  };

  const itemsWithoutAccessToken: MenuProps['items'] = [
    {
      label: 'Register',
      key: '1',
      icon: <LoginOutlined />,
    },
    {
      label: 'Login',
      key: '2',
      icon: <LoginOutlined />,
    },
  ];

  const itemsWithAccessToken: MenuProps['items'] = [
    {
      label: 'Profile',
      key: '1',
      icon: <UserOutlined />,
    },
    {
      label: 'Log out',
      key: '2',
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const [menuProps, setMenuProps] = useState<menuPropsType>({
    items: [],
    onClick: () => {},
  });

  useEffect(() => {
    router.prefetch('/');
    router.prefetch('/authentication');
    router.prefetch('/register');
    router.prefetch('/login');
    router.prefetch('/profile');

    const a = async () => {
      const accessToken = await getAccessTokenFromLocal()[0];

      if (accessToken) {
        setMenuProps((prev: menuPropsType) => ({
          ...prev,
          items: itemsWithAccessToken,
          onClick: handleMenuClickWithAccessToken,
        }));
      } else {
        setMenuProps((prev: menuPropsType) => ({
          ...prev,
          items: itemsWithoutAccessToken,
          onClick: handleMenuClickWithoutAccessToken,
        }));
        console.log(accessToken);
      }
    };
    a();
  }, [router]);

  return (
    <div className="w-full text-center mt-5">
      <Dropdown menu={menuProps} placement="bottom">
        <Button
          type="primary"
          className="bg-blue-500 text-gray-100 font-semibold hover:!bg-blue-600 hover:!text-gray-50 !shadow-lg hover:scale-105 transition-all duration-200"
        >
          <Space>{firstName}</Space>
        </Button>
      </Dropdown>
    </div>
  );
}

export default MenuComponent;
