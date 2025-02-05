import React from "react";

export function Score({score, numberOfQuestions}) {

    return (
        <p id="score">
            Your score is: {score}/{numberOfQuestions}
        </p>
    )
}