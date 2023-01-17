import React from 'react';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { NextRouter } from 'next/router';
import { addAccessTokenToLocal, deleteAccessTokenFromLocal } from '@/localStorage/accessToken.storage';

type LoginFormValuesType = {
  email: string;
  password: string;
};

type LoginProps = {
  router: NextRouter;
};

const LoginComponent: React.FC<LoginProps> = ({ router }: LoginProps) => {
  const onFinish = (values: LoginFormValuesType) => {
    axios
      .post('http://localhost:5000/user/login', values)
      .then(function (response: any) {
        if (response.data.success) {
          toast.success('Login successful', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            rtl: false,
            pauseOnHover: false,
          });
          router.push('/');
          deleteAccessTokenFromLocal()
          addAccessTokenToLocal(response.data.access_token);
        }
      })
      .catch(function (error: any) {
        console.log(error);

        toast.error(error.response.data.message, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          rtl: false,
          pauseOnHover: false,
        });
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <ToastContainer />
      <Form
        className="bg-gray-200 w-auto h-auto p-8 rounded-2xl shadow-xl"
        name="loginForm"
        onFinish={onFinish}
        autoComplete="on"
      >
        <Form.Item>
          <h1 className="text-center text-2xl mb-0 font-semibold">Login</h1>
        </Form.Item>
        <div className="space-y-6 w-72 my-8">
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input
              alt="Email"
              placeholder="user@gmail.com"
              className="shadow-sm"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                type: 'string',
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password
              alt="password"
              placeholder="******"
              className="shadow-sm"
              minLength={6}
            />
          </Form.Item>
        </div>
        <Form.Item>
          <Button
            type="primary"
            className="bg-blue-500 w-full shadow-xl"
            htmlType="submit"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginComponent;
