import React, { useRef, useState } from 'react';
import { EditFilled } from '@ant-design/icons';
import { Drawer, Space, Button, Form, Input, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { AddNoteFormValuesType } from './AddNote.component';
import { getAccessTokenFromLocal } from '@/localStorage/accessToken.storage';
import { toast } from 'react-toastify';
import axios from 'axios';

type NoteComponentProps = {
  d: NoteType;
};

export type NoteType = {
  _id: String;
  title: String;
  content: String;
  isCompleted: Boolean;
  userId: String;
};

const NoteComponent: React.FC<NoteComponentProps> = ({
  d,
}: NoteComponentProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<String>(d.title);
  const [content, setContent] = useState<String>(d.content);
  const [isCompleted, setIsCompleted] = useState<Boolean>(d.isCompleted);

  const addNote = useRef<any>();

  const showDrawer = () => {
    setOpen(true);
    setTitle(d.title);
    setContent(d.content);
    setIsCompleted(d.isCompleted);
  };

  const onChange = (e: CheckboxChangeEvent) => {
    setIsCompleted(e.target.checked);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = (values: AddNoteFormValuesType) => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/note/update/${d._id}`,
        { title, content, isCompleted },
        {
          headers: {
            Authorization: `Bearer ${getAccessTokenFromLocal()[0]}`,
          },
        }
      )
      .then(function (response: any) {
        if (response.data.success) {
          toast.success('Note updated', {
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
    <div>
      <div className="bg-gray-200 p-7 rounded-xl shadow-xl flex justify-between">
        <div className="pr-2">
          <h5 className="font-semibold break-all">{title}</h5>
          <div className="mt-6 break-all">
            <p>{content}</p>
          </div>
          <div className="bg-blue-500 w-min max-sm:text-xs max-sm:py-2 max-sm:px-3 py-3 px-5 rounded-2xl text-white shadow-lg">
            {isCompleted ? 'It is completed' : 'It is not completed'}
          </div>
        </div>
        <div>
          <EditFilled onClick={showDrawer} />
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
                  value={title.toString()}
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
                  value={content.toString()}
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
                <Checkbox onChange={onChange} checked={Boolean(isCompleted)}>
                  Completed
                </Checkbox>
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
      </div>
    </div>
  );
};

export default NoteComponent;
