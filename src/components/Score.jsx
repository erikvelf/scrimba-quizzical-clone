import React from "react";
import { Colors } from "../../shared/tokens";

export function Score({score, numberOfQuestions}) {

    const styles = {
        score: {
            fontWeight: 600,
            fontSize: "24px",
            color: Colors.violetBlack,
        }
    }

    return (
        <p style={styles.score}>
            Your score is: {score}/{numberOfQuestions}
        </p>
    )
}