import { Form } from './types';

const data: Form = {
  questions: [
    {
      type: 'input',
      id: 'name',
      label: '姓名',
    },
    {
      type: 'radio',
      id: 'gender',
      label: '性别',
      options: [
        {
          id: 0,
          label: '男',
          children: [
            {
              type: 'checkboxGroup',
              id: 'z',
              label: '兴趣爱好z',
              options: [
                {
                  id: 0,
                  label: '唱歌',
                },
                {
                  id: 1,
                  label: '跳舞',
                },
                {
                  id: 2,
                  label: '打排球',
                },
              ],
            },
          ],
        },
        {
          id: 1,
          label: '女',
        },
      ],
    },
    {
      type: 'checkboxGroup',
      id: 'interest',
      label: '兴趣爱好',
      options: [
        {
          id: 0,
          label: '唱歌',
        },
        {
          id: 1,
          label: '跳舞',
        },
        {
          id: 2,
          label: '打排球',
        },
      ],
    },
  ],
};
export default data;
