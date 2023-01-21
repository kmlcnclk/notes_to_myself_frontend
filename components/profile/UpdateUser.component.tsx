import React, { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Drawer, Space, Button, Form, Input } from 'antd';
import axios from 'axios';
import { getAccessTokenFromLocal } from '@/localStorage/accessToken.storage';
import { useDispatch } from 'react-redux';
import { UserType, assignSomeProperties } from '@/src/slicers/user.slice';

type UpdateUserType = {
  open: boolean;
  setOpen: Function;
  user: UserType;
};

const UpdateUserComponent: React.FC<UpdateUserType> = ({
  open,
  setOpen,
  user,
}: UpdateUserType) => {
  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [lastName, setLastName] = useState<string>(user.lastName);
  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();

  const updateUser = useRef<any>();

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = (values: any) => {
    axios
      .put(
        'http://localhost:5000/user/update',
        { firstName, lastName, email, password },
        {
          headers: {
            Authorization: `Bearer ${getAccessTokenFromLocal()[0]}`,
          },
        }
      )
      .then(async function (response: any) {
        if (response.data.success) {
          await toast.success('User updated', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            rtl: false,
            pauseOnHover: false,
          });

          dispatch(assignSomeProperties({ firstName, lastName, email }));

          onClose();
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
    <div>
      <ToastContainer />
      <Drawer
        getContainer={() => updateUser.current}
        title="Add Note"
        placement="left"
        width={320}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <Form name="updateUserForm" onFinish={onFinish} autoComplete="on">
          <Form.Item
            label="First Name"
            rules={[
              {
                type: 'string',
              },
            ]}
          >
            <Input
              alt="firstName"
              placeholder="First Name"
              className="shadow-sm"
              value={firstName}
              onChange={(e: any) => setFirstName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Last Name"
            rules={[
              {
                type: 'string',
              },
            ]}
          >
            <Input
              placeholder="Last Name"
              alt="firstName"
              className="shadow-sm"
              value={lastName}
              onChange={(e: any) => setLastName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            rules={[
              {
                type: 'email',
              },
            ]}
          >
            <Input
              placeholder="Email"
              alt="email"
              className="shadow-sm"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            rules={[
              {
                type: 'string',
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              alt="password"
              className="shadow-sm"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item className="mt-10">
            <Button
              type="primary"
              className="bg-blue-500 !w-full"
              htmlType="submit"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default UpdateUserComponent;
