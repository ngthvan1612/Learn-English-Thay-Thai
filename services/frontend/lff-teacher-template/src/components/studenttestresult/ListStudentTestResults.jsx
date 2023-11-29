import moment from 'moment'
import { Table, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'

function ListStudentTestResults(props) {

  const fixedStudentTestResults = props.studenttestresults.map((studenttestresult, index) => {
    const temp = {...studenttestresult};
    temp.order = index + 1;
    temp.StudentTestId = temp.studentTest.id;
    temp.QuestionContent = temp.question.content;
    return temp;
  });

  const columns = [
    {
      title: 'STT',
      dataIndex: 'order',
      key: 'order',
      sorter: (a, b) => a.order - b.order,
      width: '100px',
      align: 'center',
    },
    {
      title: 'Kết quả [const]',
      dataIndex: 'result',
      key: 'result'
    },
    {
      title: 'Bài làm học viên',
      dataIndex: 'StudentTestId',
      key: 'StudentTestId'
    },
    {
      title: 'Câu hỏi',
      dataIndex: 'QuestionContent',
      key: 'QuestionContent'
    },
    {
      title: '',
      width: '100px',
      key: 'action',
      fixed: 'right',
      render: (row) => (
        <Space size="middle">
          <a onClick={() => props.onEdit(row)}>Sửa</a>
          <a onClick={() => props.onDelete(row)}>Xóa</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table rowKey="name" dataSource={fixedStudentTestResults} columns={columns}/>
    </>
  )
}

export default ListStudentTestResults
