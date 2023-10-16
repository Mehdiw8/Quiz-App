"use client";
import { useState, useEffect } from "react";
import { quiz } from "../data";
import Title from "../components/Title";
import "./quiz.css";
import Skeleton from "react-loading-skeleton";
import Loading from "./loading";
const Quiz = () => {
  // moshakhas kon kodum soal namayesh bdi v soal active ro bekesh biron
  const [activeQuestion, setActiveQuestion] = useState(0);

  // store active answer
  const [selectAnswer, setSelectAnswer] = useState();

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

  //
  const [currentAnswers, setCurrentAnswers] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState("");
  //

  const { questions } = quiz;
  const { answers, correctAnswer, question } = questions[activeQuestion];

  // ba in Fanction javab select shode save mishe v style migire
  const selectedClickHandler = (answer, index) => {
    setChecked(true);
    setSelectAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectAnswer(true);
    } else {
      setSelectAnswer(false);
    }
  };

  // namayesh soal badi va zakhire kon javab ro
  const resultHandler = () => {
    setCurrentQuestion("");
    setCurrentAnswers(null);
    setSelectAnswerIndex(null);
    if (activeQuestion !== questions.length - 1) {
      setChecked(false);
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setResult((prev) =>
      selectAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
  };

  // useEffect

  useEffect(() => {
    setTimeout(() => {
      setCurrentAnswers(answers);
      setCurrentQuestion(question);
      console.log(currentAnswers);
    }, 1000);
  }, [result]);

  return (
    <>
      <section className="quiz-container text-white  flex flex-col justify-between  ">
        <div style={{ margin: "0 1rem 0 1rem" }}>
          <Title title="صفحه آزمون" />
          {!showResult && (
            <div className="text-xl mt-[42px] mb-[20px]">
              سوال : {activeQuestion + 1} از {questions.length}
            </div>
          )}
        </div>
        {!showResult ? (
          <>
            <div className="main-wrapper">
              <div className="q-wrapper">
                <h3>
                  {currentQuestion ? (
                    currentQuestion
                  ) : (
                    <Loading width={"93%"} />
                  )}
                </h3>
              </div>

              <div className="a-wrapper">
                <ul>
                  {!currentAnswers ? (
                    <Loading count={4} width={"95%"} />
                  ) : (
                    currentAnswers.map((a, index) => (
                      <li
                        key={index}
                        onClick={() => selectedClickHandler(a, index)}
                        className={
                          index !== selectAnswerIndex ? "notPicked" : "picked"
                        }
                      >
                        <span>{a}</span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
            <div className="btn-wrapper w-full">
              {checked ? (
                <button onClick={resultHandler}>
                  {activeQuestion !== questions.length - 1 ? "بعدی" : "پایان"}
                </button>
              ) : (
                <button className="btn-disabled  " disabled>
                  {activeQuestion !== questions.length - 1 ? "بعدی" : "پایان"}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="resultContainer">
            <div className="full-w text-center ">
              <Title title="نتایج " />
            </div>

            <div className="flex flex-wrap justify-around my-12 leading-8">
              <p>کل سوالات : {questions.length}</p>
              <p>کل امتیاز : {result.score}</p>
              <p>سوالات درست : {result.correctAnswers}</p>
              <p>سوالات غلط : {result.wrongAnswers}</p>
            </div>
            <div className="btn-wrapper w-full">
              <button onClick={() => window.location.reload()}>
                شروع مجدد آزمون
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Quiz;
