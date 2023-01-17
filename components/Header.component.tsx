import { Button, Dropdown, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import { Caveat } from '@next/font/google';
import {
  deleteAccessTokenFromLocal,
  getAccessTokenFromLocal,
} from '@/localStorage/accessToken.storage';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const caveat = Caveat({
  weight: '700',
});

type menuPropsType = {
  items: MenuProps['items'];
  onClick: MenuProps['onClick'];
};

function Header() {
  const router = useRouter();

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
    router.reload();
    router.push('/');
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
  }, []);

  return (
    <header className="relative">
      <div className="w-full text-center absolute top-4">
        <h1 className={`text-center text-2xl ${caveat.className} mb-0 z-10`}>
          Notes to Myself
        </h1>
      </div>
      <div className="flex items-center justify-between bg-gray-100 h-[70px] py-5 px-10 shadow-lg">
        <div></div>
        <Dropdown menu={menuProps} placement="bottomRight">
          <Button
            type="primary"
            className="bg-white text-gray-800 hover:!bg-white hover:!text-gray-800 !shadow-lg hover:scale-105 transition-all duration-200"
          >
            <Space>
              {/* buraya kullanıcının adı gelecek */}
              Button
            </Space>
          </Button>
        </Dropdown>
      </div>
    </header>
  );
}

export default Header;
