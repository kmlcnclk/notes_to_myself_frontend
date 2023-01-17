import React from 'react';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { NextRouter } from 'next/router';
import {
  addAccessTokenToLocal,
  deleteAccessTokenFromLocal,
} from '@/localStorage/accessToken.storage';

type RegisterFormValuesType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type RegisterProps = {
  router: NextRouter;
};

const RegisterComponent: React.FC<RegisterProps> = ({
  router,
}: RegisterProps) => {
  const onFinish = (values: RegisterFormValuesType) => {
    axios
      .post('http://localhost:5000/user/register', values)
      .then(function (response: any) {
        if (response.data.success) {
          toast.success('Register successful', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            rtl: false,
            pauseOnHover: false,
          });
          router.push('/');
          deleteAccessTokenFromLocal();
          addAccessTokenToLocal(response.data.access_token);
        }
      })
      .catch(function (error: any) {
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
        name="registerForm"
        onFinish={onFinish}
        autoComplete="on"
      >
        <Form.Item>
          <h1 className="text-center text-2xl mb-0 font-semibold">Register</h1>
        </Form.Item>
        <div className="space-y-6 w-72 my-8">
          <Form.Item
            name="firstName"
            rules={[
              {
                type: 'string',
                required: true,
                message: 'Please input your First Name!',
              },
            ]}
          >
            <Input alt="First Name" placeholder="John" className="shadow-sm" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[
              {
                type: 'string',
              },
            ]}
          >
            <Input
              alt="Last Name"
              placeholder="Doe"
              className="shadow-sm !w-full"
            />
          </Form.Item>
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
              className="shadow-sm !w-full"
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
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterComponent;
