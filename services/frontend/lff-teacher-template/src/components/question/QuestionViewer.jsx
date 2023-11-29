import { Card, Radio } from "antd"

function QuestionViewer(props) {
  const content = JSON.parse(props.question.content)
  console.log(content)

  return (
    <Card title={17 + '. ' + content.question.raw}>
      <Radio.Group>
        {
          content.choices.map(choice =>
            <>
              <Radio style={{ marginBottom: 10 }} value={choice.code}>{choice.code}. {choice.raw}</Radio><br/>
            </>
          )
        }
      </Radio.Group>
    </Card>
  )
}

export default QuestionViewer
