import { Badge, Radio, Space } from "antd"
import React, { useEffect, useState } from "react"
import { checkAnswer, TEST_MODE_EXAM, TEST_MODE_RESULT, TEST_MODE_REVIEW } from "./type";

export default function MultiChoiceQuestion(props) {
  const [currentChoice, setCurrentChoice] = useState(0);
  const [questionTitle, setQuestionTitle] = useState('Unknown');
  const [choices, setChoices] = useState([]);
  const { question } = props;
  const mode = props?.mode || TEST_MODE_EXAM;

  const onChange = (e) => {
    setCurrentChoice(e.target.value);
    if (props?.onSelectionChanged) {
      props.onSelectionChanged(question, e.target.value);
    }
  };

  useEffect(() => {
    setQuestionTitle(question?.question?.raw);
    if (question?.choices) {
      setChoices(question?.choices);
    }
    if (props?.selected) {
      setCurrentChoice(props?.selected);
    }
  }, []);

  return (
    <>
      <h1 style={{ marginBottom: '1rem' }}>{questionTitle}</h1>
      <Space direction='vertical'>
        <Radio.Group
          onChange={onChange}
          value={currentChoice}
        >
          <Space direction='vertical'>
            {
              choices.map((choice, id) => {
                return (
                  <Radio disabled={[TEST_MODE_RESULT].includes(mode)} key={id} value={choice.code}>{choice.code}. {choice.raw}</Radio>
                )
              })
            }
          </Space>
        </Radio.Group>
        {
          [TEST_MODE_RESULT].includes(mode) ?
            <>
              {
                checkAnswer(question, currentChoice) ? (
                  <>
                    <p style={{ color: 'green', fontSize: 15, fontWeight: 'bold', marginBottom: 0 }}>Đúng</p>
                  </>
                ) : (
                  <>
                    <p style={{ color: 'red', fontSize: 15, fontWeight: 'bold', marginBottom: 0 }}>Sai</p>
                  </>
                )
              }
              {
                question?.solution?.map(value => {
                  return (
                    <Badge status="default" text={value} />
                  )
                })
              }
            </>
            : <></>
        }
      </Space>
    </>
  )
}
