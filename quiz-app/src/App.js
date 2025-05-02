
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const questions = [
    {
      questionText: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswer: 'Paris',
    },
    {
      questionText: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 'Mars',
    },
    {
      questionText: 'What is the largest ocean on Earth?',
      options: ['Atlantic', 'Indian', 'Southern', 'Pacific'],
      correctAnswer: 'Pacific',
    },
    {
      questionText: 'Who wrote "Romeo and Juliet"?',
      options: ['Shakespeare', 'Dickens', 'Austen', 'Hemingway'],
      correctAnswer: 'Shakespeare',
    },
    {
      questionText: 'What is the chemical symbol for gold?',
      options: ['Ag', 'Au', 'Pb', 'Fe'],
      correctAnswer: 'Au',
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);

  const handleAnswerClick = (answer) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answer);
      if (answer === questions[currentQuestionIndex].correctAnswer) {
        setCorrectAnswersCount(correctAnswersCount + 1);
        setIsIncorrect(false);
      } else {
        setIsIncorrect(true);
      }
    }
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setIsIncorrect(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const calculateProgress = () => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  };

  const passingScore = 60; // Passing score (in percentage)
  const scorePercentage = (correctAnswersCount / questions.length) * 100;
  const passed = scorePercentage >= passingScore;

  return (
    <div className="quiz-container">
      <h1>Quiz App</h1>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div
          className="progress-bar-filled"
          style={{
            width: `${calculateProgress()}%`,
            backgroundColor: isIncorrect ? '#e74c3c' : '#2ecc71',
          }}
        ></div>
      </div>

      {!quizCompleted ? (
        <div className="question-container">
          <h2>{questions[currentQuestionIndex].questionText}</h2>
          <div className="options">
            {questions[currentQuestionIndex].options.map((option) => {
              const isCorrect = option === questions[currentQuestionIndex].correctAnswer;
              const isSelected = option === selectedAnswer;
              return (
                <div
                  key={option}
                  className={`option 
                    ${isSelected ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                  onClick={() => handleAnswerClick(option)}
                >
                  {option}
                </div>
              );
            })}
          </div>
          <button
            className={`next-btn ${selectedAnswer ? 'active' : ''}`}
            onClick={handleNextClick}
            disabled={!selectedAnswer}
          >
            Next
          </button>
        </div>
      ) : (
        <div className="result">
          <h2>Quiz Completed</h2>
          <div className="score-box">
            <p>Your score:</p>
            <p>
              {correctAnswersCount} / {questions.length}
            </p>
            <p>{scorePercentage.toFixed(2)}%</p>
            <p>{passed ? 'You passed the quiz!' : 'You failed the quiz.'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
