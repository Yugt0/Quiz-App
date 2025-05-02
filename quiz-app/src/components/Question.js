import React from "react";

const Question = ({
    question,
    selectedAnswer,
    handleAnswerSelection,
    correct,
    answered,
}) => {
    return (
        <div className={`question-container ${answered ? "visible" : ""}`}>
            <h2>{question.questionText}</h2>
            <div className="options">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerSelection(option)}
                        className={`option ${selectedAnswer === option
                            ? correct
                                ? "selected"
                                : "incorrect"
                            : ""
                            }`}
                        disabled={answered}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Question;
