import { Card, Spin } from "antd";
import React, { useEffect, useState } from "react"
import MultiChoiceQuestion from "./MultiChoiceQuestion";
import { TEST_MODE_EXAM } from "./type";

export default function QuestionView(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [questionElement, setQuestionElement] = useState(<span style={{ color: 'red', fontSize: 20 }}>Lỗi định dạng</span>);
  const { question } = props;
  const mode = props?.mode || TEST_MODE_EXAM;

  function loadQuestionContent() {
    setIsLoading(true);
    const questionType = question?.meta?.type;
    if (questionType == "MULTIPLE-CHOICE")
      setQuestionElement(<MultiChoiceQuestion question={question} selected={props.selected} />);
    setIsLoading(false);
  }

  useEffect(() => {
    loadQuestionContent();
  }, []);

  const [cardRef, setCardRef] = useState(null);

  useEffect(() => {
    if (typeof (props.onInitCardRef) == 'function') {
      props.onInitCardRef(cardRef);
    }
  }, [cardRef]);

  return (
    <>
      {
        isLoading === false ?
          <>
            <Card
              ref={setCardRef}
              style={{ ...props?.style, borderRadius: '20px', borderWidth: 5 }}
              title={`Câu hỏi ${question?.order != null ? question.order : '<Unknown>'}`}
            >
              {React.cloneElement(questionElement, {
                ...props,
                mode: props.mode
              })}
            </Card>
          </>
          :
          <>
            <Spin size='large' />
          </>
      }
    </>
  );
}
