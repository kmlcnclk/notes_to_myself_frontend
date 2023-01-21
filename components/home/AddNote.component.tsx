import React, { useRef, useState } from 'react';
import { Caveat } from '@next/font/google';
import { Drawer, Space, Button, Form, Input, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getAccessTokenFromLocal } from '@/localStorage/accessToken.storage';

export type AddNoteFormValuesType = {
  title: string;
  content: string;
};

const caveat = Caveat({
  weight: '700',
});

function AddNoteComponent() {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const addNote = useRef<any>();

  const showDrawer = () => {
    setOpen(true);
  };

  const onChange = (e: CheckboxChangeEvent) => {
    setIsCompleted(e.target.checked);
  };

  const onClose = () => {
    setOpen(false);
    setTitle('');
    setContent('');
    setIsCompleted(false);
  };

  const onFinish = (values: AddNoteFormValuesType) => {
    axios
      .post(
        'http://localhost:5000/note/create',
        { title, content, isCompleted },
        {
          headers: {
            Authorization: `Bearer ${getAccessTokenFromLocal()[0]}`,
          },
        }
      )
      .then(async function (response: any) {
        if (response.data.success) {
          await toast.success('Note created', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            rtl: false,
            pauseOnHover: false,
          });
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
    <div
      className="flex items-center justify-center my-5"
      id="addNote"
      ref={addNote}
    >
      <div
        className="w-48 h-8 bg-red-500 flex items-center justify-center rounded-3xl shadow-xl p-5 cursor-pointer hover:scale-105 duration-200"
        onClick={showDrawer}
      >
        <h3 className={`mb-0 text-white text-lg ${caveat.className}`}>
          Add Notes
        </h3>
      </div>
      <Drawer
        getContainer={() => addNote.current}
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
        <Form name="addNoteForm" onFinish={onFinish} autoComplete="on">
          <Form.Item
            label="Title"
            rules={[
              {
                type: 'string',
                required: true,
                message: "Please input note's Title!",
              },
            ]}
          >
            <Input
              alt="Title"
              placeholder="Note Title"
              className="shadow-sm"
              value={title}
              onChange={(e: any) => setTitle(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Content"
            rules={[
              {
                type: 'string',
                required: true,
                message: "Please input note's Content!",
              },
            ]}
          >
            <Input.TextArea
              placeholder="Write note content here..."
              rows={4}
              maxLength={500}
              className="shadow-sm"
              value={content}
              onChange={(e: any) => setContent(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                type: 'boolean',
              },
            ]}
          >
            <Checkbox onChange={onChange}>Completed</Checkbox>
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
}

export default AddNoteComponent;
