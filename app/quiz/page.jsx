"use client";
import { useState } from "react";
import { quiz } from "../data";
import Title from "../components/Title";
import "./quiz.css";
const Quiz = () => {
  // توسط این استیت مشخص میکنی که کدوم سوال رو باید نشون بدی و همچنین از دیتا پاسخ ها رو خارج میکنی
  const [activeQuestion, setActiveQuestion] = useState(0);

  // store active answer 
  const [selectAnswer, setSelectAnswer] = useState("");

  // vaqti false btn badi or payan disable v dar sorat true shodan btn active mishe
  const [checked, setChecked] = useState(false);

  // selected answer Index
  const [selectAnswerIndex, setSelectAnswerIndex] = useState(null);

  // zamani k true shod bia div result neshon bde dar ghyr in sorat div soalat
  const [showResult, setShowResult] = useState(false);

  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const { questions } = quiz;
  const { answers, correctAnswer, question } = questions[activeQuestion];

  // ba in Fanction javab select shode save mishe v style migire
  const selectedClickHandler = (answer, index) => {
    setSelectAnswer(answer);
    setSelectAnswerIndex(index);
  };
  return (
    <section className="quiz-container flex flex-col justify-between  ">
      <div style={{ margin: "0 1rem 0 1rem" }}>
        <Title title="صفحه آزمون" />
      </div>
      {!showResult ? (
        <>
          <div className="main-wrapper">
            <div className="q-wrapper">
              <h3>{question} ؟</h3>
            </div>

            <div className="a-wrapper">
              <ul>
                {answers.map((a, index) => (
                  <li
                    onClick={() => selectedClickHandler(a, index)}
                    className={
                      index !== selectAnswerIndex ? "notPicked" : "picked"
                    }
                  >
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="btn-wrapper w-full">
            {checked ? (
              <button className="text-white ">
                {activeQuestion !== questions.length - 1 ? "بعدی" : "پایان"}
              </button>
            ) : (
              <button className="text-white  " disabled>
                {activeQuestion !== questions.length - 1 ? "بعدی" : "پایان"}
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="quiz-container">
          <h3>نتایج</h3>
          <h3>به طور کلی {(result.score / 25) * 100}% سوالات جواب داده شده</h3>
          <p>کل سوالات : {questions.length}</p>
          <p>کل امتیاز : {result.score}</p>
          <p>سوالات درست : {result.correctAnswers}</p>
          <p>سوالات غلط : {result.wrongAnswers}</p>

          <button onClick={() => window.location.reload()}>
            شروع مجدد آزمون
          </button>
        </div>
      )}
    </section>
  );
};

export default Quiz;
