import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(res => res.json())
      .then(data => setQuestions(data))
  }, [])

  function handleDelete(id) {
    const newQuestions = questions.filter((eachQuestion) => eachQuestion.id !== id)

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => setQuestions(newQuestions))
  }

  function handleChangeAnswer(questionId, newIndex) {
    const updateAnswer = questions.map((eachQuestion) => {
      if (eachQuestion.id === questionId) {
        eachQuestion.correctIndex = parseInt(newIndex)
        return eachQuestion
      } else {
        return eachQuestion
      }
    })
    setQuestions(updateAnswer)

    let patchAnswer = {"correctIndex": parseInt(newIndex)}

    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patchAnswer)
    })
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm questions={questions} setQuestions={setQuestions} /> : <QuestionList questions={questions} handleDelete={handleDelete} handleChangeAnswer={handleChangeAnswer}/>}
    </main>
  );
}

export default App;
