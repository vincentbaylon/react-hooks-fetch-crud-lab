import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, handleDelete, handleChangeAnswer }) {

  const displayQuestions = questions.map((eachQuestion) => {
    return <QuestionItem key={eachQuestion.id} question={eachQuestion} handleDelete={handleDelete} handleChangeAnswer={handleChangeAnswer}/>
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{displayQuestions}</ul>
    </section>
  );
}

export default QuestionList;
