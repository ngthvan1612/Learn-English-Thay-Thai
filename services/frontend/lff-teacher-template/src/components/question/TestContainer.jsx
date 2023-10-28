import { Affix, Button, Card, Col, Row, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { createRef } from 'react';
import ListQuestionContainer from './ListQuestionContainer';
import QuestionView from './QuestionView';
import { Empty } from 'antd';
import { checkAnswer, TEST_MODE_EXAM, TEST_MODE_RESULT, TEST_MODE_REVIEW } from './type';

function TestContainer(props) {
  const listQuestionAndAnswer = props.listQuestionAndAnswer || [];
  const numberOfQuestionMarkIconsPerRow = props.numberOfQuestionMarkIconsPerRow || 4;
  const mode = props?.mode || TEST_MODE_EXAM;

  const [elRefs, setElRefs] = React.useState([]);
  const [answerSheet, setAnswerSheet] = React.useState([]);

  useEffect(() => {
    setElRefs((elRefs) =>
      Array(listQuestionAndAnswer?.length != null ? listQuestionAndAnswer?.length : 0)
        .fill()
        .map((_, i) => elRefs[i] || createRef()),
    );
    setAnswerSheet(listQuestionAndAnswer.map(value => {
      return value.selected;
    }));
  }, [listQuestionAndAnswer?.length]);

  return (
    <>
      {listQuestionAndAnswer.length > 0 ?
        <>
          <Row>
            <Col flex='auto'>
              <ListQuestionContainer>
                {
                  listQuestionAndAnswer.map((item, index) =>
                    <QuestionView
                      mode={props.mode}
                      innerRef={elRefs[index]}
                      key={index}
                      question={item.question}
                      selected={item.selected}
                      onSelectionChanged={(question, selectedItem) => {
                        const tempAnswerSheet = [...answerSheet];
                        tempAnswerSheet[index] = selectedItem;
                        setAnswerSheet(tempAnswerSheet);
                        if (typeof (props.onAnswerChanged) == 'function') {
                          props.onAnswerChanged(question, selectedItem);
                        }
                      }}
                      onInitCardRef={(cardRef) => {
                        elRefs[index] = cardRef;
                      }}
                    />
                  )
                }
              </ListQuestionContainer>
              <div
                style={{
                  textAlign: 'center'
                }}
              >
                {
                  [TEST_MODE_EXAM].includes(mode) ?
                    <Button
                      style={{
                        marginTop: 10
                      }}
                      type='primary'
                      size='middle'
                      onClick={props.onSubmit}
                    >
                      Nộp bài
                    </Button> : <></>
                }
              </div>
            </Col>
            <Col style={{ paddingLeft: 10 }}>
              <Affix offsetTop={10}>
                <Card style={{ marginLeft: 'auto', marginRight: 'auto', borderWidth: '5px', padding: 0 }}>
                  <div style={{ width: `calc(2rem * ${numberOfQuestionMarkIconsPerRow} + 0.25rem * 2 * ${numberOfQuestionMarkIconsPerRow - 1})`, marginLeft: 'auto', marginRight: 'auto' }}>
                    {
                      listQuestionAndAnswer.map((item, index) => {
                        return (
                          <Button
                            key={index}
                            style={{
                              borderRadius: '1rem',
                              color: [TEST_MODE_RESULT].includes(mode) ? 'white' : 'black',
                              backgroundColor: [TEST_MODE_RESULT].includes(mode) ? (checkAnswer(item.question, answerSheet[index]) ? 'green' : '#FF5555') : (['A', 'B', 'C', 'D', 'E'].includes(answerSheet[index]) ? 'lightgray' : ''),
                              width: '2rem',
                              marginLeft: index % numberOfQuestionMarkIconsPerRow == 0 ? '0rem' : '0.25rem',
                              marginRight: (index + 1) % numberOfQuestionMarkIconsPerRow == 0 ? '0rem' : '0.25rem',
                              marginTop: index < numberOfQuestionMarkIconsPerRow ? '0rem' : '0.25rem',
                              marginBottom: index < (listQuestionAndAnswer.length - listQuestionAndAnswer.length % numberOfQuestionMarkIconsPerRow) ? '0.25rem' : '0rem',
                              textAlign: 'center',
                              padding: 0
                            }}
                            onClick={() => {
                              const ref = elRefs[index];
                              ref.scrollIntoView({
                                behavior: 'smooth'
                              });
                            }}
                          >{index + 1}</Button>
                        )
                      })
                    }
                  </div>
                  <div
                    style={{
                      textAlign: 'center'
                    }}
                  >
                    {
                      [TEST_MODE_EXAM].includes(mode) ? 
                      <Button
                        onClick={props.onSubmit}
                        style={{
                          marginTop: 10
                        }}
                        type='primary'
                        size='middle'
                      >
                        Nộp bài
                      </Button> : <></>
                    }
                  </div>
                </Card>
              </Affix>
            </Col>
          </Row>
        </>
        : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<a>Không có dữ liệu</a>} />
      }
    </>
  );
};
export default TestContainer;