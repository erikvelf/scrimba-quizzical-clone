import { nanoid } from "nanoid";
import React from "react";

export default function Question({
    questionData,
    updateAnswers,
    checkAnswers,
    colors
}) {    
    const { answers, correct_answer, order, question, id, selectedAnswer} = questionData

    // TODO: rewrite the component
    function selectAnswer(value){
        if (!checkAnswers) {
            updateAnswers(prevAnswersData => 
                prevAnswersData.map(prevAnswerData => 
                    prevAnswerData.id === id? {...questionData, selectedAnswer: value} : prevAnswerData
                )
            )
        }
        
    }

    const selectClickedAnswer = (value) => () => selectAnswer(value)



    let options = answers.map((answer, answerIndex) => {
        let quesitonId = `${questionData.id}-${answerIndex}`
        
        let colorOfTheAnswerBackground = ""

        if (checkAnswers) {
            if (answer === correct_answer) {
                if (selectedAnswer === correct_answer) {
                    colorOfTheAnswerBackground = colors.right
                } else {
                    colorOfTheAnswerBackground = "#CFF6D7"
                }
            } else {
                if (answer === selectedAnswer) {
                    colorOfTheAnswerBackground = colors.wrong
                }
            }
        }

        let answerStyle = {
            outline: answer === selectedAnswer ? "none" : "",
            backgroundColor: !checkAnswers && (answer === selectedAnswer)? colors.selected : colorOfTheAnswerBackground
        }

        return (
            <label htmlFor={quesitonId} className="answer" style={answerStyle} key={nanoid()}>
                <input
                    id={quesitonId}
                    type="radio"
                    value={answer}
                    checked={selectedAnswer === answer}
                    onChange={selectClickedAnswer(answer)}
            />
                {answer}
            </label>)    
    })


    return (
        <fieldset role="radiogroup" className="quiz">
            <legend>{question}</legend>
            <div className="answers-container">
                {options}
            </div>
        </fieldset>
    )
}