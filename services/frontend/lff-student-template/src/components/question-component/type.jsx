const QUESTION_TYPE_MULTIPLE_CHOICE = "MULTIPLE-CHOICE";
const QUESTION_TYPE_FILL_IN_BLANK = "FILL-IN-BLANK";
const QUESTION_TYPE_LISTENING_MULTIPLE_CHOICE = "LISTENING-MC";
const QUESTION_TYPE_LISTENING_FILL_IN_BLANK = "LISTENING-FIB";

const TEST_MODE_EXAM = 'exam';
const TEST_MODE_REVIEW = 'review';
const TEST_MODE_RESULT = 'result';

function checkAnswer(question, answer) {
  if (question?.meta?.type == QUESTION_TYPE_MULTIPLE_CHOICE) {
    return question.answer == answer;
  }
  else {
    alert(`Unknown type ${question?.meta?.type}`);
  }
}

export {
  QUESTION_TYPE_MULTIPLE_CHOICE,
  QUESTION_TYPE_FILL_IN_BLANK,
  QUESTION_TYPE_LISTENING_FILL_IN_BLANK,
  QUESTION_TYPE_LISTENING_MULTIPLE_CHOICE,
  TEST_MODE_EXAM,
  TEST_MODE_REVIEW,
  TEST_MODE_RESULT,
  checkAnswer
}
