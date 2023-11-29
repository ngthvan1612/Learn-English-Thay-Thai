import Card from "antd/lib/card/Card";
import QuestionManagement from "../components/question/QuestionManagement";

const QuestionManagementPage = (props) => {
  return (
    <Card title="Quản lý câu hỏi">
      <QuestionManagement />
    </Card>
  );
};

export default QuestionManagementPage;
