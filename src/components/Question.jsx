import { nanoid } from "nanoid";
import React from "react";
import { decode } from "he";
import { Colors } from "../../shared/tokens";

export default function Question({
    questionData,
    updateAnswers,
    checkAnswers,
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
            if (answer === correct_answer && selectedAnswer === answer) {
                colorOfTheAnswerBackground = Colors.green
            } else if (answer === correct_answer && answer != selectedAnswer) {
                colorOfTheAnswerBackground = Colors.greenLight
            }

            if (selectedAnswer === answer && answer != correct_answer) {
                colorOfTheAnswerBackground = Colors.redLight
            }
        }

        const styles = {
            answerStyle: {
            margin: "12px 16px",
            width: "fit-content",
            height: "fit-content",
            padding: "12px 16px",
            borderRadius: 16*2,

            outline: answer != selectedAnswer ? `2px solid ${Colors.secondary}` : "none",
            backgroundColor: (!checkAnswers && answer === selectedAnswer) ? Colors.primarySelected : colorOfTheAnswerBackground
            }

        }
        return (
            <label htmlFor={quesitonId} className="answer" style={styles.answerStyle} key={nanoid()}>
                <input
                    id={quesitonId}
                    type="radio"
                    value={answer}
                    checked={selectedAnswer === answer}
                    onChange={selectClickedAnswer(answer)}
            />
                {decode(answer)}
            </label>)    
    })


    return (
        <fieldset role="radiogroup" className="quiz">
            <legend>{decode(question)}</legend>
            <div className="answers-container">
                {options}
            </div>
        </fieldset>
    )
}